import { AddProfessionalExtraIdentityRequestDTO } from "@src/modules/kallisto-bridge/application/dto/ServiceProviderDTO";

export interface IAddProffesionalExtraIdentityUseCase {
  execute(dto: AddProfessionalExtraIdentityRequestDTO): Promise<void>;
}
