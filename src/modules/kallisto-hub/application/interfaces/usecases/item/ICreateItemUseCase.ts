import {
  CreateItemRequestDTO,
  ItemResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ItemDTO";

export interface ICreateItemUseCase {
  /**
   * Creates a new material item and its specifications.
   * @param dto The item creation data.
   */
  execute(dto: CreateItemRequestDTO): Promise<ItemResultDTO>;
}
