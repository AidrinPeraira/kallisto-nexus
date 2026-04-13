import { HandsServiceAreaEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export interface IHandsServiceAreaRepository {
  create(serviceArea: HandsServiceAreaEntity): Promise<HandsServiceAreaEntity>;
  findById(id: string): Promise<HandsServiceAreaEntity | null>;
  findAllByServiceAssociateId(
    serviceAssociateId: string,
  ): Promise<HandsServiceAreaEntity[]>;
  update(serviceArea: HandsServiceAreaEntity): Promise<HandsServiceAreaEntity>;
  delete(id: string): Promise<void>;
}
