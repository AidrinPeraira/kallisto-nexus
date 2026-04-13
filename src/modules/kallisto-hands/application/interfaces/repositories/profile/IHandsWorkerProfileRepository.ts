import { HandsWorkerProfileEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export interface IHandsWorkerProfileRepository {
  create(
    workerProfile: HandsWorkerProfileEntity,
  ): Promise<HandsWorkerProfileEntity>;
  findById(id: string): Promise<HandsWorkerProfileEntity | null>;
  findByServiceAssociateId(
    serviceAssociateId: string,
  ): Promise<HandsWorkerProfileEntity | null>;
  update(
    workerProfile: Partial<HandsWorkerProfileEntity>,
  ): Promise<HandsWorkerProfileEntity>;
  delete(id: string): Promise<void>;
}
