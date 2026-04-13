import { IServiceAssociateRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IServiceAssociateRepository";
import { IAddSAWorkerSkillsUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/worker/IAddSAWorkerSkillsUseCase";
import { AddSASkillsRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { ProfileMessages } from "@packages/common/messages";
import { HttpStatus } from "@packages/common/enums";

export class AddSAWorkerSkillsUseCase implements IAddSAWorkerSkillsUseCase {
  constructor(
    private readonly _serviceAssociateRepository: IServiceAssociateRepository,
  ) {}

  async execute(dto: AddSASkillsRequestDTO): Promise<void> {
    const sa = await this._serviceAssociateRepository.findById(
      dto.serviceAssociateId,
    );

    if (!sa) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.PROFILE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this._serviceAssociateRepository.update({
      id: sa.id,
      primarySkill: dto.primarySkill,
      subSkills: dto.subSkills,
    });
  }
}
