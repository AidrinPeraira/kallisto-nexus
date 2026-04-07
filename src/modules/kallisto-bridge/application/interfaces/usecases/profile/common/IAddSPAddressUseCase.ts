import { AddAddressRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

/**
 * Checks id and sp type and adds the address
 * sets the address added flag to true
 */
export interface IAddSPAddressUseCase {
  execute(dto: AddAddressRequestDTO): Promise<void>;
}
