import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { ServiceProviderEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import {
  ServiceProviderType,
  ServiceProviderStatus,
} from "@packages/common/enums";
import { IAddSPIdentityUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPIdentityUseCase";
import { AddIdentityRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export class AddSPIdentityUseCase implements IAddSPIdentityUseCase {
  constructor(
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddIdentityRequestDTO): Promise<void> {
    const isOrganisation = dto.spType === ServiceProviderType.ORGANISATION;
    const isIdentityComplete = !isOrganisation;

    // 1. Check if SP already exists for this user
    const existingSp = await this._serviceProviderRepository.findByUserId(
      dto.userId,
    );

    if (existingSp) {
      // 2a. Update existing SP
      const updateData: Partial<ServiceProviderEntity> = {
        id: existingSp.id,
        displayName: dto.displayName,
        profilePicture: dto.profilePicture,
        spType: dto.spType,
        isIdentityAdded: isIdentityComplete,
        isRepresentativeAdded: isIdentityComplete,
      };

      await this._serviceProviderRepository.update(updateData);
    } else {
      // 2b. Create new SP
      const now = new Date();
      
      const createData = {
        userId: dto.userId,
        displayName: dto.displayName,
        profilePicture: dto.profilePicture,
        spType: dto.spType,
        status: ServiceProviderStatus.ONBOARDING,
        isIdentityAdded: isIdentityComplete,
        isRepresentativeAdded: isIdentityComplete,
        createdAt: now,
        updatedAt: now,
      } as ServiceProviderEntity;

      await this._serviceProviderRepository.create(createData);
    }
  }
}
