import { AddProfessionalExtraIdentityRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddProffesionalExtraIdentityUseCase {
  execute(dto: AddProfessionalExtraIdentityRequestDTO): Promise<void>;
}
