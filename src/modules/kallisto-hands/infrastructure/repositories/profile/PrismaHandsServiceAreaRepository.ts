import { IHandsServiceAreaRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IHandsServiceAreaRepository";
import { HandsServiceAreaEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";
import { prisma } from "@packages/config/prisma";
import { randomUUID } from "crypto";
import { ServiceAssociateMapper } from "@src/modules/kallisto-hands/infrastructure/mappers/ServiceAssociateMapper";

interface RawHandsServiceArea {
  id: string;
  serviceProviderId: string;
  city: string;
  isPrimary: boolean;
  radiusKm: number;
  centerPointGeo: string; // JSON string from ST_AsGeoJSON
  createdAt: Date;
  updatedAt: Date;
}

export class PrismaHandsServiceAreaRepository
  implements IHandsServiceAreaRepository
{
  async create(
    serviceArea: HandsServiceAreaEntity,
  ): Promise<HandsServiceAreaEntity> {
    const id = serviceArea.id || randomUUID();
    const [longitude, latitude] = serviceArea.centerPoint;

    const rows = await prisma.$queryRaw<RawHandsServiceArea[]>`
      INSERT INTO hands_service_area (
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
      throw new Error("Failed to create HandsServiceArea");
    }

    return ServiceAssociateMapper.toServiceAreaDomain(rows[0]);
  }

  async findById(id: string): Promise<HandsServiceAreaEntity | null> {
    const rows = await prisma.$queryRaw<RawHandsServiceArea[]>`
      SELECT *, ST_AsGeoJSON("centerPoint") as "centerPointGeo"
      FROM hands_service_area
      WHERE "id" = ${id}
    `;

    if (rows.length === 0 || !rows[0]) return null;
    return ServiceAssociateMapper.toServiceAreaDomain(rows[0]);
  }

  async findAllByServiceAssociateId(
    serviceAssociateId: string,
  ): Promise<HandsServiceAreaEntity[]> {
    const rows = await prisma.$queryRaw<RawHandsServiceArea[]>`
      SELECT *, ST_AsGeoJSON("centerPoint") as "centerPointGeo"
      FROM hands_service_area
      WHERE "serviceProviderId" = ${serviceAssociateId}
      ORDER BY "isPrimary" DESC, "createdAt" ASC
    `;

    return rows.map((row) => ServiceAssociateMapper.toServiceAreaDomain(row));
  }

  async update(
    serviceArea: HandsServiceAreaEntity,
  ): Promise<HandsServiceAreaEntity> {
    const [longitude, latitude] = serviceArea.centerPoint;

    const rows = await prisma.$queryRaw<RawHandsServiceArea[]>`
      UPDATE hands_service_area
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
      throw new Error(`HandsServiceArea with ID ${serviceArea.id} not found`);
    }

    return ServiceAssociateMapper.toServiceAreaDomain(rows[0]);
  }

  async delete(id: string): Promise<void> {
    await prisma.hands_ServiceArea.delete({
      where: { id },
    });
  }
}
