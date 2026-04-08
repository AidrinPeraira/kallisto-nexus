import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { ServiceProviderEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { IAddSPAddressUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPAddressUseCase";
import { AddAddressRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class AddSPAddressUseCase implements IAddSPAddressUseCase {
  constructor(
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddAddressRequestDTO): Promise<void> {
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

    if (!dto.officeAddress) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.OFFICE_ADDRESS_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.officeEmail) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.OFFICE_EMAIL_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.officePhone) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.OFFICE_PHONE_MANDATORY,
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
      officeAddress: dto.officeAddress,
      officeEmail: dto.officeEmail,
      officePhone: dto.officePhone,
      isAddressAdded: true,
    };

    await this._serviceProviderRepository.update(updateData);
  }
}
