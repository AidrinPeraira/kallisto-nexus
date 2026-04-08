import { IContractorProfileRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IContractorProfileRepository";
import { ContractorProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { IAddContractorExtraIdentityUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/contractor/IAddContractorExtraIdentityUseCase";
import { AddContractorExtraIdentityRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus, ServiceProviderType } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";
import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";

export class AddContractorExtraIdentityUseCase implements IAddContractorExtraIdentityUseCase {
  constructor(
    private readonly _contractorProfileRepository: IContractorProfileRepository,
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddContractorExtraIdentityRequestDTO): Promise<void> {
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
      existingServiceProvider.spType !== ServiceProviderType.CONTRACTOR
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

    if (dto.spType !== ServiceProviderType.CONTRACTOR) {
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
      await this._contractorProfileRepository.findByServiceProviderId(
        dto.serviceProviderId,
      );

    if (existingProfile) {
      const updateData: ContractorProfileEntity = {
        id: existingProfile.id,
        serviceProviderId: existingProfile.serviceProviderId,
        workingSince: dto.workingSince,
      };

      await this._contractorProfileRepository.update(updateData);
    } else {
      const createData: ContractorProfileEntity = {
        id: "", // Handled by DB generation
        serviceProviderId: dto.serviceProviderId,
        workingSince: dto.workingSince,
      };

      await this._contractorProfileRepository.create(createData);
    }

    if (!existingServiceProvider.isIdentityAdded) {
      await this._serviceProviderRepository.update({
        id: dto.serviceProviderId,
        isIdentityAdded: true,
      });
    }
  }
}
