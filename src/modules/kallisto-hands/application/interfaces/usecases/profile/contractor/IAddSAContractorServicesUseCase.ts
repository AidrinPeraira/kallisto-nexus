import { AddSAContractorServicesRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface IAddSAContractorServicesUseCase {
  execute(dto: AddSAContractorServicesRequestDTO): Promise<void>;
}
