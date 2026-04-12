import {
  CreateVendorRequestDTO,
  VendorResultDTO,
} from "@src/modules/kallisto-hub/application/dto/VendorDTO";

export interface ICreateVendorUseCase {
  /**
   * Creates a new vendor record.
   * @param dto The vendor creation data.
   */
  execute(dto: CreateVendorRequestDTO): Promise<VendorResultDTO>;
}
