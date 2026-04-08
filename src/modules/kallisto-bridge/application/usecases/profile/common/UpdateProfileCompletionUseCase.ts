import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { IUpdateProfileCompletionUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IUpdateProfileCompletionUseCase";
import { UpdateProfileCompletionRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class UpdateProfileCompletionUseCase implements IUpdateProfileCompletionUseCase {
  constructor(
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: UpdateProfileCompletionRequestDTO): Promise<void> {
    if (!dto.serviceProviderId) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SERVICE_PROVIDER_ID_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

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

    await this._serviceProviderRepository.update({
      id: dto.serviceProviderId,
      isIdentityAdded: dto.isIdentityAdded,
      isAddressAdded: dto.isAddressAdded,
      isServicesAdded: dto.isServicesAdded,
      isPortfolioAdded: dto.isPortfolioAdded,
      isCredentialsAdded: dto.isCredentialsAdded,
      isBankDetailsAdded: dto.isBankDetailsAdded,
      isRepresentativeAdded: dto.isRepresentativeAdded,
    });
  }
}
