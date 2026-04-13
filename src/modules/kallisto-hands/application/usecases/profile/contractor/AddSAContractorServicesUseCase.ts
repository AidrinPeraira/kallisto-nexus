import { IHandsContractorProfileRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IHandsContractorProfileRepository";
import { IAddSAContractorServicesUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/contractor/IAddSAContractorServicesUseCase";
import { AddSAContractorServicesRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";
import { HandsContractorProfileEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export class AddSAContractorServicesUseCase
  implements IAddSAContractorServicesUseCase
{
  constructor(
    private readonly _contractorProfileRepository: IHandsContractorProfileRepository,
  ) {}

  async execute(dto: AddSAContractorServicesRequestDTO): Promise<void> {
    const existing = await this._contractorProfileRepository.findByServiceAssociateId(
      dto.serviceAssociateId,
    );

    if (existing) {
      await this._contractorProfileRepository.update({
        id: existing.id,
        workerCount: dto.workerCount,
        workingSince: dto.workingSince,
      });
    } else {
      const profile = {
        serviceAssociateId: dto.serviceAssociateId,
        workerCount: dto.workerCount,
        workingSince: dto.workingSince,
      } as HandsContractorProfileEntity;
      await this._contractorProfileRepository.create(profile);
    }
  }
}
