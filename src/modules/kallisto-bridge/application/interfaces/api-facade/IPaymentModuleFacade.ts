import {
  AddBankDetailsFacadeRequestDTO,
  AddBankDetailsFacadeResponseDTO,
} from "@src/modules/kallisto-bridge/application/dto/api-facade/PaymentFacadeDTO";

export interface IPaymentModuleFacade {
  addBankDetails(
    dto: AddBankDetailsFacadeRequestDTO,
  ): Promise<AddBankDetailsFacadeResponseDTO>;
}
