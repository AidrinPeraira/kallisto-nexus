import { IServiceProviderRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/profile/IServiceProviderRepository";
import { IPaymentModuleFacade } from "@src/modules/kallisto-bridge/application/interfaces/api-facade/IPaymentModuleFacade";
import { IAddBankDetailsUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddBankDetailsUseCase";
import { AddBankDetailsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HttpStatus } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class AddBankDetailsUseCase implements IAddBankDetailsUseCase {
  constructor(
    private readonly _serviceProviderRepository: IServiceProviderRepository,
    private readonly _paymentFacade: IPaymentModuleFacade,
  ) {}

  async execute(dto: AddBankDetailsRequestDTO): Promise<void> {
    if (!dto.serviceProviderId) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.SERVICE_PROVIDER_ID_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.accountHolderName) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.ACCOUNT_HOLDER_NAME_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.bankName) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.BANK_NAME_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.bankBranch) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.BANK_BRANCH_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.accountNumber) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.ACCOUNT_NUMBER_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!dto.IFSCCode) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.IFSC_CODE_MANDATORY,
        HttpStatus.BAD_REQUEST,
      );
    }

    // 1. Verify SP exists
    const sp = await this._serviceProviderRepository.findById(
      dto.serviceProviderId,
    );

    if (!sp) {
      throw new AppError(
        ErrorCode.VALIDATION_ERROR,
        ProfileMessages.PROFILE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // 2. Call Payment Facade to create finance account
    const facadeResponse = await this._paymentFacade.addBankDetails({
      serviceProviderId: dto.serviceProviderId,
      accountHolderName: dto.accountHolderName,
      bankName: dto.bankName,
      bankBranch: dto.bankBranch,
      accountNumber: dto.accountNumber,
      IFSCCode: dto.IFSCCode,
      UPIId: dto.UPIId,
      GSTNumber: dto.GSTNumber,
      isGSTLinked: dto.isGSTLinked,
      cancelledChequeUrl: dto.cancelledChequeUrl,
    });

    // 3. Update SP with account reference
    // We mask the account number for security in the SP table (e.g. last 4 digits)
    const maskedAccount =
      dto.accountNumber.length > 4
        ? `****${dto.accountNumber.slice(-4)}`
        : dto.accountNumber;

    await this._serviceProviderRepository.update({
      id: dto.serviceProviderId,
      financeAccountId: facadeResponse.paymentReferenceId,
      maskedAccountNumber: maskedAccount,
      bankName: dto.bankName,
      isBankDetailsAdded: true,
    });
  }
}
