import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { ServiceProviderEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { IAddServicesUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPServicesUseCase";
import { AddServicesRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus, ServiceTypes } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class AddSPServiceUseCase implements IAddServicesUseCase {
  constructor(
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddServicesRequestDTO): Promise<void> {
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

    if (!dto.primaryServices || dto.primaryServices.length === 0) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.PRIMARY_SERVICES_MANDATORY,
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

    if (existingServiceProvider.isServicesAdded) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SERVICES_ALREADY_ADDED,
        HttpStatus.BAD_REQUEST,
      );
    }

    const updateData: Partial<ServiceProviderEntity> = {
      id: dto.serviceProviderId,
      primaryServices: dto.primaryServices as unknown as ServiceTypes[],
      subServices: dto.subServices as unknown as ServiceTypes[],
      typicalProjectValue: dto.typicalProjectValue,
    };

    await this._serviceProviderRepository.update(updateData);
  }
}
