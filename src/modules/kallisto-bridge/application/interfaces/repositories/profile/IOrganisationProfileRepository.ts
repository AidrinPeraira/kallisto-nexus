import { OrganisationProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";

export interface IOrganisationProfileRepository {
  /**
   * Creates the organisation profile for a service provider.
   * Should only be called once per service provider of type "organisation".
   * @param profile The organisation profile entity to persist.
   * @returns The created organisation profile.
   */
  create(profile: OrganisationProfileEntity): Promise<OrganisationProfileEntity>;

  /**
   * Finds an organisation profile by its own ID.
   * @param id The UUID of the organisation profile.
   * @returns The profile if found, null otherwise.
   */
  findById(id: string): Promise<OrganisationProfileEntity | null>;

  /**
   * Finds the organisation profile belonging to a specific service provider.
   * This is the primary lookup for this sub-table.
   * @param serviceProviderId The UUID of the parent service provider.
   * @returns The profile if found, null otherwise.
   */
  findByServiceProviderId(serviceProviderId: string): Promise<OrganisationProfileEntity | null>;

  /**
   * Updates an existing organisation profile.
   * Used as onboarding steps for identity, representative, and credentials sections.
   * @param profile The updated organisation profile entity.
   * @returns The updated organisation profile.
   */
  update(profile: OrganisationProfileEntity): Promise<OrganisationProfileEntity>;

  /**
   * Deletes an organisation profile by ID.
   * @param id The UUID of the organisation profile to delete.
   */
  delete(id: string): Promise<void>;
}
