import { AddCredentialsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/ServiceProviderDTO";

export interface IAddCredentialsUseCase {
  execute(dto: AddCredentialsRequestDTO): Promise<void>;
}
