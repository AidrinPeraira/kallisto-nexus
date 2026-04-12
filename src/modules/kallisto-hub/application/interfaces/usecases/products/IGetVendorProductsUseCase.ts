import { GetVendorProductsResultDTO } from "@src/modules/kallisto-hub/application/dto/ProductDTO";

export interface IGetVendorProductsUseCase {
  /**
   * Retrieves all product listings belonging to a specific vendor.
   * @param vendorId The UUID of the vendor.
   */
  execute(vendorId: string): Promise<GetVendorProductsResultDTO>;
}
