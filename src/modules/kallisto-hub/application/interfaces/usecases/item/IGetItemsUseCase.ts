import {
  GetItemsRequestDTO,
  GetItemsResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ItemDTO";

export interface IGetItemsUseCase {
  /**
   * Retrieves a paginated list of material items (blueprints) with filtering and search.
   * @param dto The query parameters.
   */
  execute(dto: GetItemsRequestDTO): Promise<GetItemsResultDTO>;
}
