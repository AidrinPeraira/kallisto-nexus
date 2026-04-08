import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { ServiceProviderEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { IAddSPCredentialsUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPCredentialsUseCase";
import { AddCredentialsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import {
  HttpStatus,
  GovernmentIdType,
  ProfessionalLicenseType,
  ServiceProviderType,
} from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class AddSPCredentialsUseCase implements IAddSPCredentialsUseCase {
  constructor(
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddCredentialsRequestDTO): Promise<void> {
    if (!dto.serviceProviderId) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SERVICE_PROVIDER_ID_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.spType) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SP_TYPE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.PAN) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.PAN_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.governmentIdType) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.GOVERNMENT_ID_TYPE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.governmentIdNumber) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.GOVERNMENT_ID_NUMBER_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingServiceProvider =
      await this._serviceProviderRepository.findById(dto.serviceProviderId);

    if (
      !existingServiceProvider ||
      existingServiceProvider.spType !== dto.spType
    ) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.PROFILE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const updateData: Partial<ServiceProviderEntity> = {
      id: dto.serviceProviderId,
      PAN: dto.PAN,
      GSTIN: dto.GSTIN,
      governmentIdType: dto.governmentIdType as unknown as GovernmentIdType,
      governmentIdNumber: dto.governmentIdNumber,
      professionalLicenseType:
        dto.professionalLicenseType as unknown as ProfessionalLicenseType,
      professionalLicenseNumber: dto.professionalLicenseNumber,
      isCredentialsAdded: dto.spType !== ServiceProviderType.ORGANISATION,
    };

    await this._serviceProviderRepository.update(updateData);
  }
}
