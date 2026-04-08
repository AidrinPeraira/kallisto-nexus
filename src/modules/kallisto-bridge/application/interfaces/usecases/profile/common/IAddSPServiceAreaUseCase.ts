import { AddServiceAreaRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddSPServiceAreaUseCase {
  execute(dto: AddServiceAreaRequestDTO): Promise<void>;
}
