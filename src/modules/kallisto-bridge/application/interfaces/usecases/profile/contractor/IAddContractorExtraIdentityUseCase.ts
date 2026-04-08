import {
  AddContractorExtraIdentityRequestDTO,
  SPProfileUpdateResultDTO,
} from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddContractorExtraIdentityUseCase {
  execute(
    dto: AddContractorExtraIdentityRequestDTO,
  ): Promise<SPProfileUpdateResultDTO>;
}
