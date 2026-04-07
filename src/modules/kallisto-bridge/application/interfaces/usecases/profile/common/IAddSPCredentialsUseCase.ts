import { AddCredentialsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddCredentialsUseCase {
  execute(dto: AddCredentialsRequestDTO): Promise<void>;
}
