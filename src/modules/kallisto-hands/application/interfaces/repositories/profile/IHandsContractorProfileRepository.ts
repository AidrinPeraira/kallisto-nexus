import { HandsContractorProfileEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export interface IHandsContractorProfileRepository {
  create(
    contractorProfile: HandsContractorProfileEntity,
  ): Promise<HandsContractorProfileEntity>;
  findById(id: string): Promise<HandsContractorProfileEntity | null>;
  findByServiceAssociateId(
    serviceAssociateId: string,
  ): Promise<HandsContractorProfileEntity | null>;
  update(
    contractorProfile: Partial<HandsContractorProfileEntity>,
  ): Promise<HandsContractorProfileEntity>;
  delete(id: string): Promise<void>;
}
