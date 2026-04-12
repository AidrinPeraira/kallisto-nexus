import {
  AddVendorProductRequestDTO,
  ProductResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ProductDTO";

export interface IAddVendorProductUseCase {
  /**
   * Adds a product listing (and its variants) for a specific vendor.
   * @param dto The product addition data.
   */
  execute(dto: AddVendorProductRequestDTO): Promise<ProductResultDTO>;
}
