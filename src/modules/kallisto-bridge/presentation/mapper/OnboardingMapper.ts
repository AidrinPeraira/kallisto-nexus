import {
  AddAddressRequestDTO,
  AddContractorExtraIdentityRequestDTO,
  AddCredentialsRequestDTO,
  AddOrgExtraCredentialsRequestDTO,
  AddOrgExtraIdentityRequestDTO,
  AddOrgRespresentativeRequestDTO,
  AddProfessionalExtraIdentityRequestDTO,
  AddServiceAreaRequestDTO,
  AddServicesRequestDTO,
  AddSPIdentityRequestDTO,
  AddBankDetailsRequestDTO,
} from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export class OnboardingMapper {
  static toAddOrgSPIdentityRequestDTO(
    body: any,
  ): AddSPIdentityRequestDTO & AddOrgExtraIdentityRequestDTO {
    return {
      userId: body.userId,
      displayName: body.displayName,
      profilePicture: body.profilePicture,
      spType: body.spType,
      serviceProviderId: body.serviceProviderId, //REDUNDANT
      organisationType: body.organisationType,
      yearOfEstablishment: body.yearOfEstablishment,
    };
  }

  static toAddProfessionalSPIdentityRequestDTO(
    body: any,
  ): AddSPIdentityRequestDTO & AddProfessionalExtraIdentityRequestDTO {
    return {
      userId: body.userId,
      displayName: body.displayName,
      profilePicture: body.profilePicture,
      spType: body.spType,
      serviceProviderId: body.serviceProviderId,
      workingSince: body.workingSince,
    };
  }

  static toAddContractorSPIdentityRequestDTO(
    body: any,
  ): AddSPIdentityRequestDTO & AddContractorExtraIdentityRequestDTO {
    return {
      userId: body.userId,
      displayName: body.displayName,
      profilePicture: body.profilePicture,
      spType: body.spType,
      serviceProviderId: body.serviceProviderId,
      workingSince: body.workingSince,
    };
  }

  static toAddSPAddressRequestDTO(body: any): AddAddressRequestDTO {
    return {
      serviceProviderId: body.serviceProviderId,
      spType: body.spType,
      officeAddress: body.officeAddress,
      officeEmail: body.officeEmail,
      officePhone: body.officePhone,
    };
  }

  static toAddSPServicesRequestDTO(body: any): AddServicesRequestDTO {
    return {
      serviceProviderId: body.serviceProviderId,
      spType: body.spType,
      primaryServices: body.primaryServices,
      subServices: body.subServices,
      typicalProjectValue: body.typicalProjectValue,
    };
  }

  static toAddSPServiceAreasRequestDTO(body: any): AddServiceAreaRequestDTO[] {
    return body.serviceAreas.map((serviceArea: any) => {
      return {
        serviceProviderId: body.serviceProviderId,
        city: serviceArea.city,
        isPrimary: serviceArea.isPrimary,
        centerPoint: [serviceArea.centerPoint.lng, serviceArea.centerPoint.lat],
        radiusKm: serviceArea.radiusKm,
      };
    });
  }

  static toAddOrgSPCredentialsRequestDTO(
    body: any,
  ): AddCredentialsRequestDTO & AddOrgExtraCredentialsRequestDTO {
    return {
      serviceProviderId: body.serviceProviderId,
      spType: body.spType,
      PAN: body.PAN,
      GSTIN: body.GSTIN,
      businessProofType: body.businessProofType,
      businessProofImage: body.businessProofImage,
      governmentIdNumber: body.governmentIdNumber,
      governmentIdType: body.governmentIdType,
      insurance: body.insurance,
      professionalLicenseNumber: body.professionalLicenseNumber,
      professionalLicenseType: body.professionalLicenseType,
      tradeLicense: body.tradeLicense,
    };
  }

  static toAddProfessionalSPCredentialsRequestDTO(
    body: any,
  ): AddCredentialsRequestDTO {
    return {
      serviceProviderId: body.serviceProviderId,
      spType: body.spType,
      PAN: body.PAN,
      GSTIN: body.GSTIN,
      governmentIdNumber: body.governmentIdNumber,
      governmentIdType: body.governmentIdType,
      professionalLicenseNumber: body.professionalLicenseNumber,
      professionalLicenseType: body.professionalLicenseType,
    };
  }

  static toAddContractorSPCredentialsRequestDTO(
    body: any,
  ): AddCredentialsRequestDTO {
    return {
      serviceProviderId: body.serviceProviderId,
      spType: body.spType,
      PAN: body.PAN,
      GSTIN: body.GSTIN,
      governmentIdNumber: body.governmentIdNumber,
      governmentIdType: body.governmentIdType,
      professionalLicenseNumber: body.professionalLicenseNumber,
      professionalLicenseType: body.professionalLicenseType,
    };
  }

  static toAddOrgRepresentativeRequestDTO(
    body: any,
  ): AddOrgRespresentativeRequestDTO {
    return {
      serviceProviderId: body.serviceProviderId,
      spType: body.spType,
      representativeName: body.representativeName,
      representativeDesignation: body.representativeDesignation,
      representativeGovtIDNumber: body.representativeGovtIDNumber,
      representativeGovtIDType: body.representativeGovtIDType,
      representativeGovtIDProof: body.representativeGovtIDProof,
      representativeMobile: body.representativeMobile,
    };
  }
  static toAddSPBankDetailsRequestDTO(body: any): AddBankDetailsRequestDTO {
    return {
      serviceProviderId: body.serviceProviderId,
      spType: body.spType,
      financeAccountId: body.financeAccountId,
      accountHolderName: body.accountHolderName,
      bankName: body.bankName,
      bankBranch: body.bankBranch,
      accountNumber: body.accountNumber,
      IFSCCode: body.IFSCCode,
      UPIId: body.UPIId,
    };
  }
}
