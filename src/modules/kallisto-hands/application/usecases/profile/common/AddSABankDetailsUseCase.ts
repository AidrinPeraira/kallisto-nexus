import { IServiceAssociateRepository } from "@src/modules/kallisto-hands/application/interfaces/repositories/profile/IServiceAssociateRepository";
import { IAddSABankDetailsUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IAddSABankDetailsUseCase";
import { AddSABankDetailsRequestDTO } from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { ProfileMessages } from "@packages/common/messages";
import { HttpStatus } from "@packages/common/enums";

export class AddSABankDetailsUseCase implements IAddSABankDetailsUseCase {
  constructor(
    private readonly _serviceAssociateRepository: IServiceAssociateRepository,
  ) {}

  async execute(dto: AddSABankDetailsRequestDTO): Promise<void> {
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
      financeAccountId: dto.financeAccountId,
      bankName: dto.bankName,
      // Note: Encryption logic for account number would go here, 
      // but following basic pattern for now.
      maskedAccountNumber: dto.accountNumber.replace(/.(?=.{4})/g, "*"),
    });
  }
}
