import { IServiceAreaRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceAreaRepository";
import { ServiceAreaEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { prisma } from "@packages/config/prisma";
import { randomUUID } from "crypto";

interface RawServiceArea {
  id: string;
  serviceProviderId: string;
  city: string;
  isPrimary: boolean;
  radiusKm: number;
  centerPointGeo: string; // JSON string from ST_AsGeoJSON
  createdAt: Date;
  updatedAt: Date;
}

export class PrismaServiceAreaRepository implements IServiceAreaRepository {
  async create(serviceArea: ServiceAreaEntity): Promise<ServiceAreaEntity> {
    const id = serviceArea.id || randomUUID();
    const [longitude, latitude] = serviceArea.centerPoint;

    const rows = await prisma.$queryRaw<RawServiceArea[]>`
      INSERT INTO bridge_service_area (
        "id", 
        "serviceProviderId", 
        "city", 
        "isPrimary", 
        "radiusKm", 
        "centerPoint", 
        "updatedAt"
      )
      VALUES (
        ${id}, 
        ${serviceArea.serviceProviderId}, 
        ${serviceArea.city}, 
        ${serviceArea.isPrimary}, 
        ${serviceArea.radiusKm}, 
        ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography, 
        NOW()
      )
      RETURNING *, ST_AsGeoJSON("centerPoint") as "centerPointGeo"
    `;

    if (!rows[0]) {
      throw new Error("Failed to create ServiceArea");
    }

    return this.mapToDomain(rows[0]);
  }

  async findById(id: string): Promise<ServiceAreaEntity | null> {
    const rows = await prisma.$queryRaw<RawServiceArea[]>`
      SELECT *, ST_AsGeoJSON("centerPoint") as "centerPointGeo"
      FROM bridge_service_area
      WHERE "id" = ${id}
    `;

    if (rows.length === 0 || !rows[0]) return null;
    return this.mapToDomain(rows[0]);
  }

  async findAllByServiceProviderId(serviceProviderId: string): Promise<ServiceAreaEntity[]> {
    const rows = await prisma.$queryRaw<RawServiceArea[]>`
      SELECT *, ST_AsGeoJSON("centerPoint") as "centerPointGeo"
      FROM bridge_service_area
      WHERE "serviceProviderId" = ${serviceProviderId}
      ORDER BY "isPrimary" DESC, "createdAt" ASC
    `;

    return rows.map((row) => this.mapToDomain(row));
  }

  async update(serviceArea: ServiceAreaEntity): Promise<ServiceAreaEntity> {
    const [longitude, latitude] = serviceArea.centerPoint;

    const rows = await prisma.$queryRaw<RawServiceArea[]>`
      UPDATE bridge_service_area
      SET 
        "city" = ${serviceArea.city},
        "isPrimary" = ${serviceArea.isPrimary},
        "radiusKm" = ${serviceArea.radiusKm},
        "centerPoint" = ST_SetSRID(ST_MakePoint(${longitude}, ${latitude}), 4326)::geography,
        "updatedAt" = NOW()
      WHERE "id" = ${serviceArea.id}
      RETURNING *, ST_AsGeoJSON("centerPoint") as "centerPointGeo"
    `;

    if (rows.length === 0 || !rows[0]) {
      throw new Error(`ServiceArea with ID ${serviceArea.id} not found`);
    }

    return this.mapToDomain(rows[0]);
  }

  async delete(id: string): Promise<void> {
    await prisma.bridge_ServiceArea.delete({
      where: { id },
    });
  }

  private mapToDomain(raw: RawServiceArea): ServiceAreaEntity {
    const geo = JSON.parse(raw.centerPointGeo);
    return {
      id: raw.id,
      serviceProviderId: raw.serviceProviderId,
      city: raw.city,
      isPrimary: raw.isPrimary,
      centerPoint: [geo.coordinates[0], geo.coordinates[1]],
      radiusKm: raw.radiusKm,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    };
  }
}
