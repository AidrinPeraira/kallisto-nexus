import { AddSAWorkerServicesRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface IAddSAWorkerServicesUseCase {
  execute(dto: AddSAWorkerServicesRequestDTO): Promise<void>;
}
