import { AddBankDetailsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/ServiceProviderDTO";

/**
 * This use casw will call the finance module and update add banking details
 * minimal details and refernce id returned will be added to the SP table
 */
export interface IAddBankDetailsUseCase {
  execute(dto: AddBankDetailsRequestDTO): Promise<void>;
}
