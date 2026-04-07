import { AddOrgRespresentativeRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IAddOrgRepresentativeUseCase {
  execute(dto: AddOrgRespresentativeRequestDTO): Promise<void>;
}
