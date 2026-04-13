import { ServiceAssociateEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export interface IGetServiceAssociateProfileUseCase {
  /**
   * Fetches the complete service associate profile for a given user.
   * @param userId The UUID of the authenticated user.
   * @returns The complete service associate entity with relations.
   */
  execute(userId: string): Promise<ServiceAssociateEntity>;
}
