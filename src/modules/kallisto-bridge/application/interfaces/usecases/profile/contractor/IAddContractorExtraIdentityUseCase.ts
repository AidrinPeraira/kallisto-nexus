import { AddContractorExtraIdentityRequestDTO } from "@src/modules/kallisto-bridge/application/dto/ServiceProviderDTO";

export interface IAddContractorExtraIdentityUseCase {
  execute(dto: AddContractorExtraIdentityRequestDTO): Promise<void>;
}
