import { ServiceAreaEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";

export interface IServiceAreaRepository {
  /**
   * Adds a new service area for a given service provider.
   * A service provider can have multiple service areas.
   * @param serviceArea The service area entity to persist.
   * @returns The created service area.
   */
  create(serviceArea: ServiceAreaEntity): Promise<ServiceAreaEntity>;

  /**
   * Finds a service area by its own ID.
   * @param id The UUID of the service area.
   * @returns The service area if found, null otherwise.
   */
  findById(id: string): Promise<ServiceAreaEntity | null>;

  /**
   * Retrieves all service areas associated with a service provider.
   * @param serviceProviderId The UUID of the service provider.
   * @returns A list of service areas (may be empty).
   */
  findAllByServiceProviderId(serviceProviderId: string): Promise<ServiceAreaEntity[]>;

  /**
   * Updates an existing service area (e.g. change radius or mark as primary).
   * @param serviceArea The updated service area entity.
   * @returns The updated service area.
   */
  update(serviceArea: ServiceAreaEntity): Promise<ServiceAreaEntity>;

  /**
   * Removes a service area by its ID.
   * @param id The UUID of the service area to delete.
   */
  delete(id: string): Promise<void>;
}
