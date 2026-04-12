import { HandsContractorProfileEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export interface ISAContractorProfileRepository {
  /**
   * Creates the contractor profile for a service associate.
   * @param profile The contractor profile entity to persist.
   * @returns The created contractor profile.
   */
  create(profile: HandsContractorProfileEntity): Promise<HandsContractorProfileEntity>;

  /**
   * Finds a contractor profile by its own ID.
   * @param id The UUID of the contractor profile.
   * @returns The profile if found, null otherwise.
   */
  findById(id: string): Promise<HandsContractorProfileEntity | null>;

  /**
   * Finds the contractor profile belonging to a specific service associate.
   * @param serviceAssociateId The UUID of the parent service associate.
   * @returns The profile if found, null otherwise.
   */
  findByServiceAssociateId(serviceAssociateId: string): Promise<HandsContractorProfileEntity | null>;

  /**
   * Updates an existing contractor profile.
   * @param profile The updated contractor profile entity.
   * @returns The updated contractor profile.
   */
  update(profile: HandsContractorProfileEntity): Promise<HandsContractorProfileEntity>;

  /**
   * Deletes a contractor profile by ID.
   * @param id The UUID of the contractor profile to delete.
   */
  delete(id: string): Promise<void>;
}
