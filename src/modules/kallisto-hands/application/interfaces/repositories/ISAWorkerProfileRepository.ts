import { HandsWorkerProfileEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export interface ISAWorkerProfileRepository {
  /**
   * Creates the worker profile for a service associate.
   * @param profile The worker profile entity to persist.
   * @returns The created worker profile.
   */
  create(profile: HandsWorkerProfileEntity): Promise<HandsWorkerProfileEntity>;

  /**
   * Finds a worker profile by its own ID.
   * @param id The UUID of the worker profile.
   * @returns The profile if found, null otherwise.
   */
  findById(id: string): Promise<HandsWorkerProfileEntity | null>;

  /**
   * Finds the worker profile belonging to a specific service associate.
   * @param serviceAssociateId The UUID of the parent service associate.
   * @returns The profile if found, null otherwise.
   */
  findByServiceAssociateId(serviceAssociateId: string): Promise<HandsWorkerProfileEntity | null>;

  /**
   * Updates an existing worker profile.
   * @param profile The updated worker profile entity.
   * @returns The updated worker profile.
   */
  update(profile: HandsWorkerProfileEntity): Promise<HandsWorkerProfileEntity>;

  /**
   * Deletes a worker profile by ID.
   * @param id The UUID of the worker profile to delete.
   */
  delete(id: string): Promise<void>;
}
