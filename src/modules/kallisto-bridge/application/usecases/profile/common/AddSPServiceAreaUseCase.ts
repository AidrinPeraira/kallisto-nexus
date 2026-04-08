import { IServiceAreaRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceAreaRepository";
import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { ServiceAreaEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { IAddSPServiceAreaUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPServiceAreaUseCase";
import { AddServiceAreaRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class AddSPServiceAreaUseCase implements IAddSPServiceAreaUseCase {
  constructor(
    private readonly _serviceAreaRepository: IServiceAreaRepository,
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddServiceAreaRequestDTO): Promise<void> {
    if (!dto.serviceProviderId) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SERVICE_PROVIDER_ID_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.city) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.CITY_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.centerPoint || dto.centerPoint.length !== 2) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.CENTER_POINT_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.radiusKm === undefined || dto.radiusKm === null) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.RADIUS_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    // 1. Verify SP exists
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

    // 2. Create the service area
    const now = new Date();
    const serviceAreaEntity: ServiceAreaEntity = {
      id: "", // DB generated
      serviceProviderId: dto.serviceProviderId,
      city: dto.city,
      isPrimary: dto.isPrimary,
      centerPoint: dto.centerPoint,
      radiusKm: dto.radiusKm,
      createdAt: now,
      updatedAt: now,
    };

    await this._serviceAreaRepository.create(serviceAreaEntity);
  }
}
