import { AddProfessionalExtraIdentityRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddProfessionalExtraIdentityUseCase {
  execute(dto: AddProfessionalExtraIdentityRequestDTO): Promise<void>;
}
