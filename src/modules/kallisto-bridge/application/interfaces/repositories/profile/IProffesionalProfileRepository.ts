import { ProfessionalProfileEntity } from "@src/modules/kallisto-bridge/domain/entities/ServiceProviderEntity";

export interface IProfessionalProfileRepository {
  /**
   * Creates the professional profile for a service provider.
   * Should only be called once per service provider of type "professional".
   * @param profile The professional profile entity to persist.
   * @returns The created professional profile.
   */
  create(profile: ProfessionalProfileEntity): Promise<ProfessionalProfileEntity>;

  /**
   * Finds a professional profile by its own ID.
   * @param id The UUID of the professional profile.
   * @returns The profile if found, null otherwise.
   */
  findById(id: string): Promise<ProfessionalProfileEntity | null>;

  /**
   * Finds the professional profile belonging to a specific service provider.
   * This is the primary lookup for this sub-table.
   * @param serviceProviderId The UUID of the parent service provider.
   * @returns The profile if found, null otherwise.
   */
  findByServiceProviderId(serviceProviderId: string): Promise<ProfessionalProfileEntity | null>;

  /**
   * Updates an existing professional profile.
   * Used during the onboarding identity step for SP type "professional".
   * @param profile The updated professional profile entity.
   * @returns The updated professional profile.
   */
  update(profile: ProfessionalProfileEntity): Promise<ProfessionalProfileEntity>;

  /**
   * Deletes a professional profile by ID.
   * @param id The UUID of the professional profile to delete.
   */
  delete(id: string): Promise<void>;
}
