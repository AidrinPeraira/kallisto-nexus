import {
  ServiceAssociateEntity,
  HandsContractorProfileEntity,
  HandsWorkerProfileEntity,
  HandsServiceAreaEntity,
} from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";
import {
  HandsAssociateType,
  ServiceAssociateStatus,
  SkillTypes,
  GovernmentIdType,
} from "@packages/common/enums";

export class ServiceAssociateMapper {
  static toDomain(prismaSa: any): ServiceAssociateEntity {
    const entity: ServiceAssociateEntity = {
      id: prismaSa.id,
      userId: prismaSa.userId,
      saCode: prismaSa.saCode,
      saType: prismaSa.saType as HandsAssociateType,
      displayName: prismaSa.displayName,
      profilePicture: prismaSa.profilePicture || undefined,
      isIdentityAdded: prismaSa.isIdentityAdded,
      address: prismaSa.address || undefined,
      email: prismaSa.email || undefined,
      phone: prismaSa.phone || undefined,
      isAddressAdded: prismaSa.isAddressAdded,
      primarySkill: (prismaSa.primarySkill as SkillTypes) || undefined,
      subSkills: (prismaSa.subSkills as SkillTypes[]) || [],
      isSkillsAdded: prismaSa.isSkillsAdded,
      governmentIdType: (prismaSa.governmentIdType as GovernmentIdType) || undefined,
      governmentIdNumber: prismaSa.governmentIdNumber || undefined,
      PAN: prismaSa.PAN || undefined,
      isCredentialsAdded: prismaSa.isCredentialsAdded,
      financeAccountId: prismaSa.financeAccountId || undefined,
      maskedAccountNumber: prismaSa.maskedAccountNumber || undefined,
      bankName: prismaSa.bankName || undefined,
      isBankDetailsAdded: prismaSa.isBankDetailsAdded,
      status: prismaSa.status as ServiceAssociateStatus,
      createdAt: prismaSa.createdAt,
      updatedAt: prismaSa.updatedAt,
    };

    if (prismaSa.contractorProfile) {
      entity.contractorProfile = this.toContractorProfileDomain(
        prismaSa.contractorProfile,
      );
    }

    if (prismaSa.workerProfile) {
      entity.workerProfile = this.toWorkerProfileDomain(prismaSa.workerProfile);
    }

    if (prismaSa.serviceAreas) {
      entity.serviceAreas = prismaSa.serviceAreas.map((sa: any) =>
        this.toServiceAreaDomain(sa),
      );
    }

    return entity;
  }

  static toContractorProfileDomain(
    prismaCp: any,
  ): HandsContractorProfileEntity {
    return {
      id: prismaCp.id,
      serviceAssociateId: prismaCp.serviceAssociateId,
      workerCount: prismaCp.workerCount || undefined,
      workingSince: prismaCp.workingSince || undefined,
    };
  }

  static toWorkerProfileDomain(prismaWp: any): HandsWorkerProfileEntity {
    return {
      id: prismaWp.id,
      serviceAssociateId: prismaWp.serviceAssociateId,
      contractorId: prismaWp.contractorId || undefined,
      workingSince: prismaWp.workingSince || undefined,
      wagePerDay: prismaWp.wagePerDay || undefined,
    };
  }

  static toServiceAreaDomain(prismaSa: any): HandsServiceAreaEntity {
    let centerPoint: [number, number] = [0, 0];
    if (prismaSa.centerPointGeo) {
      const geo = JSON.parse(prismaSa.centerPointGeo);
      centerPoint = [geo.coordinates[0], geo.coordinates[1]];
    }

    return {
      id: prismaSa.id,
      serviceProviderId: prismaSa.serviceProviderId,
      city: prismaSa.city,
      isPrimary: prismaSa.isPrimary,
      centerPoint: centerPoint,
      radiusKm: prismaSa.radiusKm,
      createdAt: prismaSa.createdAt,
      updatedAt: prismaSa.updatedAt,
    };
  }
}
