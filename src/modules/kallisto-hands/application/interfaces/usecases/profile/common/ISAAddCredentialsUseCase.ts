import { AddSACredentialsRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface ISAAddCredentialsUseCase {
  execute(dto: AddSACredentialsRequestDTO): Promise<void>;
}
