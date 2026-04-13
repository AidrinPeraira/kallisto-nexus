import { IServiceAssociateRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IServiceAssociateRepository";
import { IGetServiceAssociateProfileUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IGetServiceAssociateProfileUseCase";
import { ServiceAssociateEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";
import { AppError, ErrorCode } from "@packages/common/errors";
import { ProfileMessages } from "@packages/common/messages";
import { HttpStatus } from "@packages/common/enums";

export class GetServiceAssociateProfileUseCase
  implements IGetServiceAssociateProfileUseCase
{
  constructor(
    private readonly _serviceAssociateRepository: IServiceAssociateRepository,
  ) {}

  async execute(userId: string): Promise<ServiceAssociateEntity> {
    const sa = await this._serviceAssociateRepository.findByUserId(userId);

    if (!sa) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.PROFILE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return sa;
  }
}
