import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { AddBankDetailsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { IAddSPBankDetailsUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPBankDetailsUseCase";

export class AddSPBankDetailsUseCase implements IAddSPBankDetailsUseCase {
  constructor(
    private readonly _serviceProviderRepository: IServiceProviderRepository,
  ) {}

  async execute(dto: AddBankDetailsRequestDTO): Promise<void> {
    const { serviceProviderId, ...bankDetails } = dto;

    await this._serviceProviderRepository.update({
      id: serviceProviderId,
      ...bankDetails,
    });
  }
}
