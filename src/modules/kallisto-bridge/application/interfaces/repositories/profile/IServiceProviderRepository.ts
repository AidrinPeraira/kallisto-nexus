import { ServiceProviderEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";

export interface IServiceProviderRepository {
  /**
   * Creates a new service provider record.
   * Called once during onboarding when a user selects their SP type.
   * @param serviceProvider The service provider entity to persist.
   * @returns The created service provider.
   */
  create(serviceProvider: ServiceProviderEntity): Promise<ServiceProviderEntity>;

  /**
   * Finds a service provider by their internal UUID.
   * @param id The UUID of the service provider.
   * @returns The service provider if found, null otherwise.
   */
  findById(id: string): Promise<ServiceProviderEntity | null>;

  /**
   * Finds the service provider linked to a given user account.
   * This is the primary lookup — most requests resolve from the auth user context.
   * @param userId The UUID of the associated app user.
   * @returns The service provider if found, null otherwise.
   */
  findByUserId(userId: string): Promise<ServiceProviderEntity | null>;

  /**
   * Finds a service provider by their unique human-readable SP code (e.g. "SP-1001").
   * @param spCode The SP code string.
   * @returns The service provider if found, null otherwise.
   */
  findBySpCode(spCode: string): Promise<ServiceProviderEntity | null>;

  /**
   * Updates a service provider's top-level fields (identity, address, services, credentials, etc.).
   * Sub-profiles and service areas are managed via their own dedicated repositories.
   * @param serviceProvider The updated service provider entity.
   * @returns The updated service provider.
   */
  update(serviceProvider: ServiceProviderEntity): Promise<ServiceProviderEntity>;

  /**
   * Deletes a service provider record by ID.
   * @param id The UUID of the service provider to delete.
   */
  delete(id: string): Promise<void>;
}
