import {
  AddAddressRequestDTO,
  AddContractorExtraIdentityRequestDTO,
  AddOrgExtraIdentityRequestDTO,
  AddProfessionalExtraIdentityRequestDTO,
  AddServiceAreaRequestDTO,
  AddServicesRequestDTO,
  AddSPIdentityRequestDTO,
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
      serviceProviderId: body.serviceProviderId,
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
        centerPoint: serviceArea.centerPoint,
        radiusKm: serviceArea.radiusKm,
      };
    });
  }
}
