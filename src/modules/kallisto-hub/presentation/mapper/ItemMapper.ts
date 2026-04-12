import { MaterialCategory, UnitOfMeasure } from "@packages/common/enums";
import {
  CreateItemRequestDTO,
  GetItemsRequestDTO,
  UpdateItemRequestDTO,
} from "@src/modules/kallisto-hub/application/dto/ItemDTO";

export class ItemMapper {
  static toCreateItemRequestDTO(body: any): CreateItemRequestDTO {
    return {
      name: body.name,
      category: body.category as MaterialCategory,
      hsnCode: body.hsnCode,
      imageUrl: body.imageUrl,
      unitOfMeasure: body.unitOfMeasure as UnitOfMeasure,
      description: body.description,
      specifications: body.specifications?.map((s: any) => ({
        specName: s.specName,
        specValues: s.specValues,
      })),
    };
  }

  static toUpdateItemRequestDTO(id: string, body: any): UpdateItemRequestDTO {
    return {
      id,
      name: body.name,
      category: body.category as MaterialCategory,
      hsnCode: body.hsnCode,
      imageUrl: body.imageUrl,
      unitOfMeasure: body.unitOfMeasure as UnitOfMeasure,
      description: body.description,
      isActive: body.isActive,
      specifications: body.specifications?.map((s: any) => ({
        id: s.id,
        specName: s.specName,
        specValues: s.specValues,
      })),
    };
  }

  static toGetItemsRequestDTO(query: any): GetItemsRequestDTO {
    return {
      page: query.page ? parseInt(query.page as string) : 1,
      limit: query.limit ? parseInt(query.limit as string) : 10,
      category: query.category as MaterialCategory,
      search: query.search as string,
    };
  }
}
