import { IOrganisationProfileRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IOrganisationProfileRepository";
import { OrganisationProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { prisma } from "@packages/config/prisma";
import {
  OrganisationType,
  BusinessProofType,
  GovernmentIdType,
} from "@packages/common/enums";

export class PrismaOrganisationProfileRepository implements IOrganisationProfileRepository {
  async create(
    profile: OrganisationProfileEntity,
  ): Promise<OrganisationProfileEntity> {
    const data: any = {
      serviceProviderId: profile.serviceProviderId,
    };

    // Map optional fields
    const optionalFields: (keyof OrganisationProfileEntity)[] = [
      "brandName",
      "brandLogo",
      "organisationType",
      "yearOfEstablishment",
      "businessProofType",
      "businessProofImage",
      "tradeLicense",
      "insurance",
      "representativeName",
      "representativeDesignation",
      "representativeMobile",
      "representativeGovtIDType",
      "representativeGovtIDNumber",
      "representativeGovtIDProof",
    ];

    optionalFields.forEach((field) => {
      if (profile[field] !== undefined) {
        data[field as string] = profile[field];
      }
    });

    const createdProfile = await prisma.bridge_OrganisationProfile.upsert({
      where: { serviceProviderId: profile.serviceProviderId },
      update: data,
      create: data,
    });

    return this.mapToDomain(createdProfile);
  }

  async findById(id: string): Promise<OrganisationProfileEntity | null> {
    const profile = await prisma.bridge_OrganisationProfile.findUnique({
      where: { id },
    });

    if (!profile) return null;
    return this.mapToDomain(profile);
  }

  async findByServiceProviderId(
    serviceProviderId: string,
  ): Promise<OrganisationProfileEntity | null> {
    const profile = await prisma.bridge_OrganisationProfile.findUnique({
      where: { serviceProviderId },
    });

    if (!profile) return null;
    return this.mapToDomain(profile);
  }

  async update(
    profile: OrganisationProfileEntity,
  ): Promise<OrganisationProfileEntity> {
    const { id, ...updateData } = profile;

    if (!id) {
      throw new Error("OrganisationProfile ID is required for update");
    }

    const updatedProfile = await prisma.bridge_OrganisationProfile.update({
      where: { id },
      data: updateData as any,
    });

    return this.mapToDomain(updatedProfile);
  }

  async delete(id: string): Promise<void> {
    await prisma.bridge_OrganisationProfile.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaProfile: any): OrganisationProfileEntity {
    return {
      id: prismaProfile.id,
      serviceProviderId: prismaProfile.serviceProviderId,
      brandName: prismaProfile.brandName || undefined,
      brandLogo: prismaProfile.brandLogo || undefined,
      organisationType:
        (prismaProfile.organisationType as OrganisationType) || undefined,
      yearOfEstablishment: prismaProfile.yearOfEstablishment || undefined,
      businessProofType:
        (prismaProfile.businessProofType as BusinessProofType) || undefined,
      businessProofImage: prismaProfile.businessProofImage || undefined,
      tradeLicense: prismaProfile.tradeLicense || undefined,
      insurance: prismaProfile.insurance || undefined,
      representativeName: prismaProfile.representativeName || undefined,
      representativeDesignation:
        prismaProfile.representativeDesignation || undefined,
      representativeMobile: prismaProfile.representativeMobile || undefined,
      representativeGovtIDType:
        (prismaProfile.representativeGovtIDType as GovernmentIdType) ||
        undefined,
      representativeGovtIDNumber:
        prismaProfile.representativeGovtIDNumber || undefined,
      representativeGovtIDProof:
        prismaProfile.representativeGovtIDProof || undefined,
    };
  }
}
