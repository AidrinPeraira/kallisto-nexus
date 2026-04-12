import { IGetServiceProviderProfileUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IGetServiceProviderProfileUseCase";
import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { IServiceAreaRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceAreaRepository";
import { ServiceProviderEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class GetServiceProviderProfileUseCase implements IGetServiceProviderProfileUseCase {
  constructor(
    private readonly _serviceProviderRepository: IServiceProviderRepository,
    private readonly _serviceAreaRepository: IServiceAreaRepository,
  ) {}

  async execute(userId: string): Promise<ServiceProviderEntity> {
    const sp = await this._serviceProviderRepository.findByUserId(userId);

    if (!sp) {
      throw new AppError(
        ErrorCode.USER_NOT_FOUND,
        ProfileMessages.PROFILE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // Fetch service areas separately as they use raw SQL in their repository
    const serviceAreas = await this._serviceAreaRepository.findAllByServiceProviderId(sp.id);
    sp.serviceAreas = serviceAreas;

    return sp;
  }
}
