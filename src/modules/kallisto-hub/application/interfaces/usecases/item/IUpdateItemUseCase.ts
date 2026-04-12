import {
  UpdateItemRequestDTO,
  ItemResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ItemDTO";

export interface IUpdateItemUseCase {
  /**
   * Updates an existing material item and its specifications.
   * @param dto The item update data.
   */
  execute(dto: UpdateItemRequestDTO): Promise<ItemResultDTO>;
}
