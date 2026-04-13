import { AddSASkillsRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface IAddSAWorkerSkillsUseCase {
  execute(dto: AddSASkillsRequestDTO): Promise<void>;
}
