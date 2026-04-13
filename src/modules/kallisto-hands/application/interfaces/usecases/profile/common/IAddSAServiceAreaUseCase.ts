import { AddSAServiceAreaRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface IAddSAServiceAreaUseCase {
  execute(dto: AddSAServiceAreaRequestDTO): Promise<void>;
}
