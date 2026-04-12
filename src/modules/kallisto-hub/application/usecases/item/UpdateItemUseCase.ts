import { IItemRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IItemRepository";
import { IUpdateItemUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/item/IUpdateItemUseCase";
import {
  UpdateItemRequestDTO,
  ItemResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ItemDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HubMessages } from "@packages/common/messages";
import { HttpStatus } from "@packages/common/enums";

export class UpdateItemUseCase implements IUpdateItemUseCase {
  constructor(private readonly _itemRepository: IItemRepository) {}

  async execute(dto: UpdateItemRequestDTO): Promise<ItemResultDTO> {
    const existing = await this._itemRepository.findById(dto.id);
    if (!existing) {
      throw new AppError(
        ErrorCode.ITEM_NOT_FOUND,
        HubMessages.ITEM_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const updated = await this._itemRepository.update({
      id: dto.id,
      name: dto.name,
      category: dto.category,
      hsnCode: dto.hsnCode,
      imageUrl: dto.imageUrl,
      unitOfMeasure: dto.unitOfMeasure,
      description: dto.description,
      isActive: dto.isActive,
      specifications: dto.specifications?.map((s) => ({
        id: s.id || "",
        specName: s.specName,
        specValues: s.specValues,
        itemId: dto.id,
      })),
    });

    return {
      id: updated.id,
      itemCode: updated.itemCode,
      name: updated.name,
      category: updated.category,
      hsnCode: updated.hsnCode,
      imageUrl: updated.imageUrl,
      unitOfMeasure: updated.unitOfMeasure,
      description: updated.description,
      isActive: updated.isActive,
      specifications: updated.specifications?.map((s) => ({
        id: s.id,
        specName: s.specName,
        specValues: s.specValues,
      })),
    };
  }
}
