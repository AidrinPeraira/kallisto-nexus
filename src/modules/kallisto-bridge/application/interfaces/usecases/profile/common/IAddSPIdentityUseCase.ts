import { AddIdentityRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

/**
 * This usecase is responsible for adding the identity of a service provider.
 * - It updates identity fields
 * - If organisation the identity completion status boolean should not be set to true
 * - If professional or contractor the identity completion status boolean should be set to true
 * - Same for the representative details
 */
export interface IAddSPIdentityUseCase {
  execute(dto: AddIdentityRequestDTO): Promise<void>;
}
