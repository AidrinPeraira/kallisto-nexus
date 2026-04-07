import { AddServiceAreaRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddServiceAreaUseCase {
  execute(dto: AddServiceAreaRequestDTO): Promise<void>;
}
