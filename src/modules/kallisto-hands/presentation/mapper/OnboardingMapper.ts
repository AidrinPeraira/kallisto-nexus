import {
  AddSAIdentityRequestDTO,
  AddSAAddressRequestDTO,
  AddSASkillsRequestDTO,
  AddSAContractorServicesRequestDTO,
  AddSAWorkerServicesRequestDTO,
  AddSACredentialsRequestDTO,
  AddSABankDetailsRequestDTO,
  AddSAServiceAreaRequestDTO,
} from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export class OnboardingMapper {
  static toAddSAIdentityRequestDTO(body: any): AddSAIdentityRequestDTO {
    return {
      userId: body.userId,
      displayName: body.displayName,
      profilePicture: body.profilePicture,
      saType: body.saType,
    };
  }

  static toAddSAAddressRequestDTO(body: any): AddSAAddressRequestDTO {
    return {
      serviceAssociateId: body.serviceAssociateId,
      saType: body.saType,
      address: body.address,
      email: body.email,
      phone: body.phone,
    };
  }

  static toAddSASkillsRequestDTO(body: any): AddSASkillsRequestDTO {
    return {
      serviceAssociateId: body.serviceAssociateId,
      saType: body.saType,
      primarySkill: body.primarySkill,
      subSkills: body.subSkills,
    };
  }

  static toAddSAContractorServicesRequestDTO(
    body: any,
  ): AddSAContractorServicesRequestDTO {
    return {
      serviceAssociateId: body.serviceAssociateId,
      workerCount: body.workerCount,
      workingSince: body.workingSince,
    };
  }

  static toAddSAWorkerServicesRequestDTO(
    body: any,
  ): AddSAWorkerServicesRequestDTO {
    return {
      serviceAssociateId: body.serviceAssociateId,
      contractorId: body.contractorId,
      workingSince: body.workingSince,
      wagePerDay: body.wagePerDay,
    };
  }

  static toAddSACredentialsRequestDTO(body: any): AddSACredentialsRequestDTO {
    return {
      serviceAssociateId: body.serviceAssociateId,
      saType: body.saType,
      PAN: body.PAN,
      governmentIdType: body.governmentIdType,
      governmentIdNumber: body.governmentIdNumber,
    };
  }

  static toAddSABankDetailsRequestDTO(body: any): AddSABankDetailsRequestDTO {
    return {
      serviceAssociateId: body.serviceAssociateId,
      saType: body.saType,
      accountHolderName: body.accountHolderName,
      bankName: body.bankName,
      bankBranch: body.bankBranch,
      accountNumber: body.accountNumber,
      IFSCCode: body.IFSCCode,
      UPIId: body.UPIId,
    };
  }

  static toAddSAServiceAreasRequestDTO(body: any): AddSAServiceAreaRequestDTO[] {
    const { serviceAssociateId, serviceAreas } = body;
    return serviceAreas.map((area: any) => ({
      serviceAssociateId,
      city: area.city,
      isPrimary: area.isPrimary,
      centerPoint: [area.centerPoint.lng, area.centerPoint.lat],
      radiusKm: area.radiusKm,
    }));
  }
}
