import { IServiceAssociateRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IServiceAssociateRepository";
import { ISAAddCredentialsUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/ISAAddCredentialsUseCase";
import { AddSACredentialsRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { ProfileMessages } from "@packages/common/messages";
import { HttpStatus } from "@packages/common/enums";

export class AddSACredentialsUseCase implements ISAAddCredentialsUseCase {
  constructor(
    private readonly _serviceAssociateRepository: IServiceAssociateRepository,
  ) {}

  async execute(dto: AddSACredentialsRequestDTO): Promise<void> {
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
      governmentIdType: dto.governmentIdType,
      governmentIdNumber: dto.governmentIdNumber,
      PAN: dto.PAN,
    });
  }
}
