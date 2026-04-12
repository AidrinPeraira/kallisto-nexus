import { AddBankDetailsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddSPBankDetailsUseCase {
  execute(dto: AddBankDetailsRequestDTO): Promise<void>;
}
