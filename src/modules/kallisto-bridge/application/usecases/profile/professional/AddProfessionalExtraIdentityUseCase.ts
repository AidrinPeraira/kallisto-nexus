import { IProfessionalProfileRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IProfessionalProfileRepository";
import { ProfessionalProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { IAddProfessionalExtraIdentityUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/professional/IAddProfessionalExtraIdentityUseCase";
import { AddProfessionalExtraIdentityRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus, ServiceProviderType } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";
import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";

export class AddProfessionalExtraIdentityUseCase implements IAddProfessionalExtraIdentityUseCase {
  constructor(
    private readonly _professionalProfileRepository: IProfessionalProfileRepository,
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddProfessionalExtraIdentityRequestDTO): Promise<void> {
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
      existingServiceProvider.spType !== ServiceProviderType.PROFESSIONAL
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

    if (dto.spType !== ServiceProviderType.PROFESSIONAL) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SP_TYPE_INVALID,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (dto.workingSince === undefined || dto.workingSince === null) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.WORKING_SINCE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingProfile =
      await this._professionalProfileRepository.findByServiceProviderId(
        dto.serviceProviderId,
      );

    if (existingProfile) {
      const updateData: ProfessionalProfileEntity = {
        id: existingProfile.id,
        serviceProviderId: existingProfile.serviceProviderId,
        workingSince: dto.workingSince,
      };

      await this._professionalProfileRepository.update(updateData);
    } else {
      const createData: ProfessionalProfileEntity = {
        id: "", // Handled by DB generation
        serviceProviderId: dto.serviceProviderId,
        workingSince: dto.workingSince,
      };

      await this._professionalProfileRepository.create(createData);
    }

    if (!existingServiceProvider.isIdentityAdded) {
      await this._serviceProviderRepository.update({
        id: dto.serviceProviderId,
        isIdentityAdded: true,
      });
    }
  }
}
