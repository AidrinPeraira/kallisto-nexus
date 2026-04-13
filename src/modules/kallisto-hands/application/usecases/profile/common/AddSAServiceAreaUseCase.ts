import { IHandsServiceAreaRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IHandsServiceAreaRepository";
import { IAddSAServiceAreaUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IAddSAServiceAreaUseCase";
import { AddSAServiceAreaRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";
import { HandsServiceAreaEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export class AddSAServiceAreaUseCase implements IAddSAServiceAreaUseCase {
  constructor(
    private readonly _serviceAreaRepository: IHandsServiceAreaRepository,
  ) {}

  async execute(dto: AddSAServiceAreaRequestDTO): Promise<void> {
    const serviceArea = {
      serviceProviderId: dto.serviceAssociateId,
      city: dto.city,
      isPrimary: dto.isPrimary,
      centerPoint: dto.centerPoint,
      radiusKm: dto.radiusKm,
    } as HandsServiceAreaEntity;

    await this._serviceAreaRepository.create(serviceArea);
  }
}
