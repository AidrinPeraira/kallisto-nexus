import { IItemRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IItemRepository";
import {
  GetItemsRequestDTO,
  GetItemsResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ItemDTO";
import { IGetItemsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/item/IGetItemsUseCase";

export class GetItemsUseCase implements IGetItemsUseCase {
  constructor(private readonly _itemRepository: IItemRepository) {}

  async execute(dto: GetItemsRequestDTO): Promise<GetItemsResultDTO> {
    const items = await this._itemRepository.findAll(dto);

    return {
      items: items.map((i) => ({
        id: i.id,
        itemCode: i.itemCode,
        name: i.name,
        category: i.category,
        hsnCode: i.hsnCode,
        imageUrl: i.imageUrl,
        unitOfMeasure: i.unitOfMeasure,
        description: i.description,
        isActive: i.isActive,
        specifications: i.specifications?.map((s) => ({
          id: s.id,
          specName: s.specName,
          specValues: s.specValues,
        })),
      })),
      total: items.length, // Should ideally come from repository
      page: dto.page || 1,
      limit: dto.limit || 10,
    };
  }
}
