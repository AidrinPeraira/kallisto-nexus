import { ServiceProviderEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";

export interface IGetServiceProviderProfileUseCase {
  /**
   * Fetches the complete service provider profile for a given user.
   * @param userId The UUID of the authenticated user.
   * @returns The complete service provider entity with relations.
   */
  execute(userId: string): Promise<ServiceProviderEntity>;
}
