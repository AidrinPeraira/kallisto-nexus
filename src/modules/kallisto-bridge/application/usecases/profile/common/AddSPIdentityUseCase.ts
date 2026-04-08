import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { ServiceProviderEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import {
  ServiceProviderType,
  ServiceProviderStatus,
  HttpStatus,
} from "@packages/common/enums";
import { IAddSPIdentityUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPIdentityUseCase";
import {
  AddSPIdentityRequestDTO,
  SPProfileUpdateResultDTO,
} from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { ProfileMessages } from "@packages/common/messages";

export class AddSPIdentityUseCase implements IAddSPIdentityUseCase {
  constructor(
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(
    dto: AddSPIdentityRequestDTO,
  ): Promise<SPProfileUpdateResultDTO> {
    const isOrganisation = dto.spType === ServiceProviderType.ORGANISATION;
    const isIdentityComplete = !isOrganisation;

    // 1. Check if SP already exists for this user
    const existingSp = await this._serviceProviderRepository.findByUserId(
      dto.userId,
    );

    if (existingSp) {
      throw new AppError(
        ErrorCode.SERVICE_PROVIDER_ALREADY_EXISTS,
        ProfileMessages.PROFILE_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }
    //  Create new SP
    const now = new Date();

    const createData = {
      userId: dto.userId,
      displayName: dto.displayName,
      profilePicture: dto.profilePicture,
      spType: dto.spType,
      status: ServiceProviderStatus.ONBOARDING,
      createdAt: now,
      updatedAt: now,
    } as ServiceProviderEntity;

    const newSP = await this._serviceProviderRepository.create(createData);

    return {
      serviceProviderId: newSP.id,
      spCode: newSP.spCode,
    };
  }
}
