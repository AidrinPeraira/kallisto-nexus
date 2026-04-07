import { AddServiceAreaRequestDTO } from "@src/modules/kallisto-bridge/application/dto/ServiceProviderDTO";

export interface IAddServiceAreaUseCase {
  execute(dto: AddServiceAreaRequestDTO): Promise<void>;
}
