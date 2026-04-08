import { IOrganisationProfileRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IOrganisationProfileRepository";
import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { OrganisationProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { IAddOrgRepresentativeUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/organisation/IAddOrgRepresentativeUseCase";
import { AddOrgRespresentativeRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import {
  HttpStatus,
  ServiceProviderType,
  GovernmentIdType,
} from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class AddOrgRepresentativeUseCase implements IAddOrgRepresentativeUseCase {
  constructor(
    private readonly _organisationProfileRepository: IOrganisationProfileRepository,
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddOrgRespresentativeRequestDTO): Promise<void> {
    if (!dto.serviceProviderId) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SERVICE_PROVIDER_ID_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.representativeName) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.REPRESENTATIVE_NAME_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.representativeDesignation) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.REPRESENTATIVE_DESIGNATION_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.representativeMobile) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.REPRESENTATIVE_MOBILE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.representativeGovtIDType) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.REPRESENTATIVE_GOVT_ID_TYPE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.representativeGovtIDNumber) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.REPRESENTATIVE_GOVT_ID_NUMBER_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.representativeGovtIDProof) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.REPRESENTATIVE_GOVT_ID_PROOF_MANDATORY,
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

    if (existingServiceProvider.isRepresentativeAdded) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.REPRESENTATIVE_ALREADY_ADDED,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createData = {
      serviceProviderId: dto.serviceProviderId,
      representativeName: dto.representativeName,
      representativeDesignation: dto.representativeDesignation,
      representativeMobile: dto.representativeMobile,
      representativeGovtIDType:
        dto.representativeGovtIDType as unknown as GovernmentIdType,
      representativeGovtIDNumber: dto.representativeGovtIDNumber,
      representativeGovtIDProof: dto.representativeGovtIDProof,
    } as OrganisationProfileEntity;

    await this._organisationProfileRepository.create(createData);
  }
}
