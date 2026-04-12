import {
  GetProductsRequestDTO,
  GetProductsResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ProductDTO";

export interface IGetProductsUseCase {
  /**
   * Retrieves a paginated list of all products across vendors.
   * @param dto The query parameters.
   */
  execute(dto: GetProductsRequestDTO): Promise<GetProductsResultDTO>;
}
