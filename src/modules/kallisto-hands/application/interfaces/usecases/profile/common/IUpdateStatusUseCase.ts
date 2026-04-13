import { UpdateSAProfileCompletionRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface IUpdateStatusUseCase {
  execute(dto: UpdateSAProfileCompletionRequestDTO): Promise<void>;
}
