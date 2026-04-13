import { AddSASkillsRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface IAddSAContractorSkillsUseCase {
  execute(dto: AddSASkillsRequestDTO): Promise<void>;
}
