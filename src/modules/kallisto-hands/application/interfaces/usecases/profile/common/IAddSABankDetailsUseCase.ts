import { AddSABankDetailsRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface IAddSABankDetailsUseCase {
  execute(dto: AddSABankDetailsRequestDTO): Promise<void>;
}
