import {
  UpdateVendorProductRequestDTO,
  ProductResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ProductDTO";

export interface IUpdateVendorProductUseCase {
  /**
   * Updates an existing product listing and its variants.
   * @param dto The product update data.
   */
  execute(dto: UpdateVendorProductRequestDTO): Promise<ProductResultDTO>;
}
