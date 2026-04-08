import { IOrganisationProfileRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IOrganisationProfileRepository";
import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { OrganisationProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { IAddOrgExtraIdentityUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/organisation/IAddOrgExtraIdentityUseCase";
import { AddOrgExtraIdentityRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import {
  HttpStatus,
  ServiceProviderType,
  OrganisationType,
} from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class AddOrgExtraIdentityUseCase implements IAddOrgExtraIdentityUseCase {
  constructor(
    private readonly _organisationProfileRepository: IOrganisationProfileRepository,
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddOrgExtraIdentityRequestDTO): Promise<void> {
    if (!dto.serviceProviderId) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SERVICE_PROVIDER_ID_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

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

    if (!dto.spType) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SP_TYPE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.spType !== ServiceProviderType.ORGANISATION) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SP_TYPE_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.organisationType) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.ORGANISATION_TYPE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      dto.yearOfEstablishment === undefined ||
      dto.yearOfEstablishment === null
    ) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.YEAR_OF_ESTABLISHMENT_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Validate the service provider exists
    const sp = await this._serviceProviderRepository.findById(
      dto.serviceProviderId,
    );

    if (!sp) {
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
        brandName: dto.brandName,
        brandLogo: dto.brandLogo,
        organisationType: dto.organisationType as unknown as OrganisationType,
        yearOfEstablishment: dto.yearOfEstablishment,
      };

      await this._organisationProfileRepository.update(updateData);
    } else {
      const createData: OrganisationProfileEntity = {
        id: "", // Handled by DB generation
        serviceProviderId: dto.serviceProviderId,
        brandName: dto.brandName,
        brandLogo: dto.brandLogo,
        organisationType: dto.organisationType as unknown as OrganisationType,
        yearOfEstablishment: dto.yearOfEstablishment,
      };

      await this._organisationProfileRepository.create(createData);
    }
  }
}
