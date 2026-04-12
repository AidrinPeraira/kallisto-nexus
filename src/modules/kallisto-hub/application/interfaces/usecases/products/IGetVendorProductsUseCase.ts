import { GetVendorProductsRequestDTO, GetVendorProductsResultDTO } from "@src/modules/kallisto-hub/application/dto/ProductDTO";

export interface IGetVendorProductsUseCase {
  /**
   * Retrieves all product listings belonging to a specific vendor.
   * @param dto The request DTO containing vendorId and pagination filters.
   */
  execute(dto: GetVendorProductsRequestDTO): Promise<GetVendorProductsResultDTO>;
}
