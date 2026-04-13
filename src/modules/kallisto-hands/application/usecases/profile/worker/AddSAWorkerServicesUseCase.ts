import { IHandsWorkerProfileRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IHandsWorkerProfileRepository";
import { IAddSAWorkerServicesUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/worker/IAddSAWorkerServicesUseCase";
import { AddSAWorkerServicesRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";
import { HandsWorkerProfileEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";

export class AddSAWorkerServicesUseCase implements IAddSAWorkerServicesUseCase {
  constructor(
    private readonly _workerProfileRepository: IHandsWorkerProfileRepository,
  ) {}

  async execute(dto: AddSAWorkerServicesRequestDTO): Promise<void> {
    const existing = await this._workerProfileRepository.findByServiceAssociateId(
      dto.serviceAssociateId,
    );

    if (existing) {
      await this._workerProfileRepository.update({
        id: existing.id,
        contractorId: dto.contractorId,
        workingSince: dto.workingSince,
        wagePerDay: dto.wagePerDay,
      });
    } else {
      const profile = {
        serviceAssociateId: dto.serviceAssociateId,
        contractorId: dto.contractorId,
        workingSince: dto.workingSince,
        wagePerDay: dto.wagePerDay,
      } as HandsWorkerProfileEntity;
      await this._workerProfileRepository.create(profile);
    }
  }
}
