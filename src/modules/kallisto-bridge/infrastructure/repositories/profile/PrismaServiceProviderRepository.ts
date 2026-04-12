import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { ServiceProviderEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { prisma } from "@packages/config/prisma";
import {
  ServiceProviderStatus,
  ServiceProviderType,
  GovernmentIdType,
  ServiceTypes,
  ProfessionalLicenseType,
} from "@packages/common/enums";

export class PrismaServiceProviderRepository implements IServiceProviderRepository {
  async create(
    serviceProvider: ServiceProviderEntity,
  ): Promise<ServiceProviderEntity> {
    const data: any = {
      userId: serviceProvider.userId,
      displayName: serviceProvider.displayName,
      spType: serviceProvider.spType,
      status: serviceProvider.status || ServiceProviderStatus.ONBOARDING,
      isIdentityAdded: serviceProvider.isIdentityAdded ?? false,
      isAddressAdded: serviceProvider.isAddressAdded ?? false,
      isServicesAdded: serviceProvider.isServicesAdded ?? false,
      isPortfolioAdded: serviceProvider.isPortfolioAdded ?? false,
      isCredentialsAdded: serviceProvider.isCredentialsAdded ?? false,
      isBankDetailsAdded: serviceProvider.isBankDetailsAdded ?? false,
      isRepresentativeAdded: serviceProvider.isRepresentativeAdded ?? false,
    };

    // Map optional fields only if they are provided
    const optionalFields: (keyof ServiceProviderEntity)[] = [
      "profilePicture",
      "officeAddress",
      "officeEmail",
      "officePhone",
      "primaryServices",
      "subServices",
      "typicalProjectValue",
      "PAN",
      "GSTIN",
      "governmentIdType",
      "governmentIdNumber",
      "professionalLicenseType",
      "professionalLicenseNumber",
      "financeAccountId",
      "accountHolderName",
      "bankName",
      "bankBranch",
      "accountNumber",
      "IFSCCode",
      "UPIId",
      "portfolioId",
    ];

    optionalFields.forEach((field) => {
      if (serviceProvider[field] !== undefined) {
        data[field as string] = serviceProvider[field];
      }
    });

    const createdSp = await prisma.bridge_ServiceProvider.create({
      data,
    });

    return this.mapToDomain(createdSp);
  }

  async findById(id: string): Promise<ServiceProviderEntity | null> {
    const sp = await prisma.bridge_ServiceProvider.findUnique({
      where: { id },
      include: {
        organisationProfile: true,
        professionalProfile: true,
        contractorProfile: true,
      },
    });

    if (!sp) return null;
    return this.mapToDomain(sp);
  }

  async findByUserId(userId: string): Promise<ServiceProviderEntity | null> {
    const sp = await prisma.bridge_ServiceProvider.findUnique({
      where: { userId },
      include: {
        organisationProfile: true,
        professionalProfile: true,
        contractorProfile: true,
      },
    });

    if (!sp) return null;
    return this.mapToDomain(sp);
  }

  async findBySpCode(spCode: string): Promise<ServiceProviderEntity | null> {
    const sp = await prisma.bridge_ServiceProvider.findUnique({
      where: { spCode },
    });

    if (!sp) return null;
    return this.mapToDomain(sp);
  }

  async update(
    serviceProvider: Partial<ServiceProviderEntity>,
  ): Promise<ServiceProviderEntity> {
    const { id, ...updateData } = serviceProvider;

    if (!id) {
      throw new Error("ServiceProvider ID is required for update");
    }

    const updatedSp = await prisma.bridge_ServiceProvider.update({
      where: { id },
      data: updateData as any,
    });

    return this.mapToDomain(updatedSp);
  }

  async delete(id: string): Promise<void> {
    await prisma.bridge_ServiceProvider.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaSp: any): ServiceProviderEntity {
    const entity: ServiceProviderEntity = {
      id: prismaSp.id,
      spCode: prismaSp.spCode,
      userId: prismaSp.userId,
      displayName: prismaSp.displayName,
      profilePicture: prismaSp.profilePicture || undefined,
      spType: prismaSp.spType as ServiceProviderType,
      officeAddress: prismaSp.officeAddress || undefined,
      officeEmail: prismaSp.officeEmail || undefined,
      officePhone: prismaSp.officePhone || undefined,
      primaryServices: (prismaSp.primaryServices as ServiceTypes[]) || [],
      subServices: (prismaSp.subServices as ServiceTypes[]) || [],
      typicalProjectValue: prismaSp.typicalProjectValue || undefined,
      PAN: prismaSp.PAN || undefined,
      GSTIN: prismaSp.GSTIN || undefined,
      governmentIdType:
        (prismaSp.governmentIdType as GovernmentIdType) || undefined,
      governmentIdNumber: prismaSp.governmentIdNumber || undefined,
      professionalLicenseType:
        (prismaSp.professionalLicenseType as ProfessionalLicenseType) || undefined,
      professionalLicenseNumber:
        prismaSp.professionalLicenseNumber || undefined,
      financeAccountId: prismaSp.financeAccountId || undefined,
      accountHolderName: prismaSp.accountHolderName || undefined,
      bankName: prismaSp.bankName || undefined,
      bankBranch: prismaSp.bankBranch || undefined,
      accountNumber: prismaSp.accountNumber || undefined,
      IFSCCode: prismaSp.IFSCCode || undefined,
      UPIId: prismaSp.UPIId || undefined,
      portfolioId: prismaSp.portfolioId || undefined,
      isIdentityAdded: prismaSp.isIdentityAdded,
      isAddressAdded: prismaSp.isAddressAdded,
      isServicesAdded: prismaSp.isServicesAdded,
      isPortfolioAdded: prismaSp.isPortfolioAdded,
      isCredentialsAdded: prismaSp.isCredentialsAdded,
      isBankDetailsAdded: prismaSp.isBankDetailsAdded,
      isRepresentativeAdded: prismaSp.isRepresentativeAdded,
      status: prismaSp.status as ServiceProviderStatus,
      createdAt: prismaSp.createdAt,
      updatedAt: prismaSp.updatedAt,
    };

    if (prismaSp.organisationProfile) {
      entity.organisationProfile = {
        id: prismaSp.organisationProfile.id,
        serviceProviderId: prismaSp.organisationProfile.serviceProviderId,
        brandName: prismaSp.organisationProfile.brandName || undefined,
        brandLogo: prismaSp.organisationProfile.brandLogo || undefined,
        organisationType: prismaSp.organisationProfile.organisationType || undefined,
        yearOfEstablishment: prismaSp.organisationProfile.yearOfEstablishment || undefined,
        businessProofType: prismaSp.organisationProfile.businessProofType || undefined,
        businessProofImage: prismaSp.organisationProfile.businessProofImage || undefined,
        tradeLicense: prismaSp.organisationProfile.tradeLicense || undefined,
        insurance: prismaSp.organisationProfile.insurance || undefined,
        representativeName: prismaSp.organisationProfile.representativeName || undefined,
        representativeDesignation: prismaSp.organisationProfile.representativeDesignation || undefined,
        representativeMobile: prismaSp.organisationProfile.representativeMobile || undefined,
        representativeGovtIDType: prismaSp.organisationProfile.representativeGovtIDType || undefined,
        representativeGovtIDNumber: prismaSp.organisationProfile.representativeGovtIDNumber || undefined,
        representativeGovtIDProof: prismaSp.organisationProfile.representativeGovtIDProof || undefined,
      };
    }

    if (prismaSp.professionalProfile) {
      entity.professionalProfile = {
        id: prismaSp.professionalProfile.id,
        serviceProviderId: prismaSp.professionalProfile.serviceProviderId,
        workingSince: prismaSp.professionalProfile.workingSince || undefined,
      };
    }

    if (prismaSp.contractorProfile) {
      entity.contractorProfile = {
        id: prismaSp.contractorProfile.id,
        serviceProviderId: prismaSp.contractorProfile.serviceProviderId,
        workingSince: prismaSp.contractorProfile.workingSince || undefined,
      };
    }

    return entity;
  }
}
