import { ServiceAssociateEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export interface IServiceAssociateRepository {
  /**
   * Creates a new service associate record.
   * @param serviceAssociate The service associate entity to persist.
   * @returns The created service associate.
   */
  create(
    serviceAssociate: ServiceAssociateEntity,
  ): Promise<ServiceAssociateEntity>;

  /**
   * Finds a service associate by their internal UUID.
   * @param id The UUID of the service associate.
   * @returns The service associate if found, null otherwise.
   */
  findById(id: string): Promise<ServiceAssociateEntity | null>;

  /**
   * Finds the service associate linked to a given user account.
   * @param userId The UUID of the associated app user.
   * @returns The service associate if found, null otherwise.
   */
  findByUserId(userId: string): Promise<ServiceAssociateEntity | null>;

  /**
   * Finds a service associate by their unique human-readable SA code (e.g. "SA-1001").
   * @param saCode The SA code string.
   * @returns The service associate if found, null otherwise.
   */
  findBySaCode(saCode: string): Promise<ServiceAssociateEntity | null>;

  /**
   * Updates a service associate's top-level fields.
   * @param serviceAssociate The updated service associate entity.
   * @returns The updated service associate.
   */
  update(
    serviceAssociate: Partial<ServiceAssociateEntity>,
  ): Promise<ServiceAssociateEntity>;

  /**
   * Deletes a service associate record by ID.
   * @param id The UUID of the service associate to delete.
   */
  delete(id: string): Promise<void>;
}
