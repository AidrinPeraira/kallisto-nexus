import { IServiceAssociateRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IServiceAssociateRepository";
import { ServiceAssociateEntity } from "@src/modules/kallisto-hands/domain/entities/ServiceAssociateEntity";
import {
  ServiceAssociateStatus,
  HttpStatus,
} from "@packages/common/enums";
import { IAddSAIdentityUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IAddSAIdentityUseCase";
import {
  AddSAIdentityRequestDTO,
  SAProfileUpdateResultDTO,
} from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { ProfileMessages } from "@packages/common/messages";

export class AddSAIdentityUseCase implements IAddSAIdentityUseCase {
  constructor(
    private readonly _serviceAssociateRepository: IServiceAssociateRepository,
  ) {}

  async execute(
    dto: AddSAIdentityRequestDTO,
  ): Promise<SAProfileUpdateResultDTO> {
    // 1. Check if SA already exists for this user
    const existingSa = await this._serviceAssociateRepository.findByUserId(
      dto.userId,
    );

    if (existingSa) {
      throw new AppError(
        ErrorCode.SERVICE_PROVIDER_ALREADY_EXISTS,
        ProfileMessages.PROFILE_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    // 2. Create new SA
    const now = new Date();

    const createData = {
      userId: dto.userId,
      displayName: dto.displayName,
      profilePicture: dto.profilePicture,
      saType: dto.saType,
      status: ServiceAssociateStatus.ONBOARDING,
      isIdentityAdded: false,
      isAddressAdded: false,
      isSkillsAdded: false,
      isCredentialsAdded: false,
      isBankDetailsAdded: false,
      subSkills: [],
      createdAt: now,
      updatedAt: now,
    } as any;

    const newSA = await this._serviceAssociateRepository.create(createData as any);

    return {
      serviceAssociateId: newSA.id,
      saCode: newSA.saCode,
    };
  }
}
