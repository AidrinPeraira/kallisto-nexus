import { VendorDetailsResultDTO } from "@src/modules/kallisto-hub/application/dto/VendorDTO";

export interface IGetVendorDetailsUseCase {
  /**
   * Retrieves full details of a single vendor.
   * @param id The UUID of the vendor.
   */
  execute(id: string): Promise<VendorDetailsResultDTO>;
}
