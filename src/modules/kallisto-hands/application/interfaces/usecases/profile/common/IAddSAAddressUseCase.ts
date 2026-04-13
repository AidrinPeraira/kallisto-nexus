import { AddSAAddressRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface IAddSAAddressUseCase {
  execute(dto: AddSAAddressRequestDTO): Promise<void>;
}
