import { AddOrgRespresentativeRequestDTO } from "@src/modules/kallisto-bridge/application/dto/ServiceProviderDTO";

export interface IAddOrgRepresentativeUseCase {
  execute(dto: AddOrgRespresentativeRequestDTO): Promise<void>;
}
