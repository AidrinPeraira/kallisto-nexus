import { AddServicesRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddServicesUseCase {
  execute(dto: AddServicesRequestDTO): Promise<void>;
}
