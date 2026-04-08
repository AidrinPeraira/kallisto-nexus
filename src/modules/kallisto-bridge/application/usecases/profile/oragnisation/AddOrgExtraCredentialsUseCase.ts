import { IOrganisationProfileRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IOrganisationProfileRepository";
import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { OrganisationProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { IAddOrgExtraCredentialsUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/organisation/IAddOrgExtraCredentialsUseCase";
import { AddOrgExtraCredentialsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import {
  HttpStatus,
  ServiceProviderType,
  BusinessProofType,
} from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class AddOrgExtraCredentialsUseCase implements IAddOrgExtraCredentialsUseCase {
  constructor(
    private readonly _organisationProfileRepository: IOrganisationProfileRepository,
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddOrgExtraCredentialsRequestDTO): Promise<void> {
    if (!dto.serviceProviderId) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SERVICE_PROVIDER_ID_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.businessProofType) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.BUSINESS_PROOF_TYPE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.businessProofImage) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.BUSINESS_PROOF_IMAGE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validate the service provider exists
    const existingServiceProvider =
      await this._serviceProviderRepository.findById(dto.serviceProviderId);

    if (
      !existingServiceProvider ||
      existingServiceProvider.spType !== ServiceProviderType.ORGANISATION
    ) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.PROFILE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const existingProfile =
      await this._organisationProfileRepository.findByServiceProviderId(
        dto.serviceProviderId,
      );

    if (existingProfile) {
      const updateData: OrganisationProfileEntity = {
        ...existingProfile,
        businessProofType:
          dto.businessProofType as unknown as BusinessProofType,
        businessProofImage: dto.businessProofImage,
        tradeLicense: dto.tradeLicense,
        insurance: dto.insurance,
      };

      await this._organisationProfileRepository.update(updateData);
    } else {
      const createData: OrganisationProfileEntity = {
        id: "", // Handled by DB generation
        serviceProviderId: dto.serviceProviderId,
        businessProofType:
          dto.businessProofType as unknown as BusinessProofType,
        businessProofImage: dto.businessProofImage,
        tradeLicense: dto.tradeLicense,
        insurance: dto.insurance,
      };

      await this._organisationProfileRepository.create(createData);
    }

    if (!existingServiceProvider.isCredentialsAdded) {
      await this._serviceProviderRepository.update({
        id: dto.serviceProviderId,
        isCredentialsAdded: true,
      });
    }
  }
}
