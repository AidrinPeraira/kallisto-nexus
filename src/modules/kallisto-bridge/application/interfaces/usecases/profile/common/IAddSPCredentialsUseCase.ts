import { AddCredentialsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddSPCredentialsUseCase {
  execute(dto: AddCredentialsRequestDTO): Promise<void>;
}
