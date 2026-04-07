import { ContractorProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";

export interface IContractorProfileRepository {
  /**
   * Creates the contractor profile for a service provider.
   * Should only be called once per service provider of type "contractor".
   * @param profile The contractor profile entity to persist.
   * @returns The created contractor profile.
   */
  create(profile: ContractorProfileEntity): Promise<ContractorProfileEntity>;

  /**
   * Finds a contractor profile by its own ID.
   * @param id The UUID of the contractor profile.
   * @returns The profile if found, null otherwise.
   */
  findById(id: string): Promise<ContractorProfileEntity | null>;

  /**
   * Finds the contractor profile belonging to a specific service provider.
   * This is the primary lookup for this sub-table.
   * @param serviceProviderId The UUID of the parent service provider.
   * @returns The profile if found, null otherwise.
   */
  findByServiceProviderId(serviceProviderId: string): Promise<ContractorProfileEntity | null>;

  /**
   * Updates an existing contractor profile.
   * Used during the onboarding identity step for SP type "contractor".
   * @param profile The updated contractor profile entity.
   * @returns The updated contractor profile.
   */
  update(profile: ContractorProfileEntity): Promise<ContractorProfileEntity>;

  /**
   * Deletes a contractor profile by ID.
   * @param id The UUID of the contractor profile to delete.
   */
  delete(id: string): Promise<void>;
}
