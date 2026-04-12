import { MaterialCategory, UnitOfMeasure } from "@packages/common/enums";

export interface SpecificationDTO {
  id?: string;
  specName: string;
  specValues: string[];
}

export interface ItemResultDTO {
  id: string;
  itemCode: string;
  name: string;
  category: MaterialCategory;
  hsnCode?: string;
  imageUrl?: string;
  unitOfMeasure: UnitOfMeasure;
  description?: string;
  isActive: boolean;
  specifications?: SpecificationDTO[];
}

export interface CreateItemRequestDTO {
  name: string;
  category: MaterialCategory;
  hsnCode?: string;
  imageUrl?: string;
  unitOfMeasure: UnitOfMeasure;
  description?: string;
  specifications: Omit<SpecificationDTO, "id">[];
}

export interface UpdateItemRequestDTO {
  id: string;
  name?: string;
  category?: MaterialCategory;
  hsnCode?: string;
  imageUrl?: string;
  unitOfMeasure?: UnitOfMeasure;
  description?: string;
  isActive?: boolean;
  specifications?: SpecificationDTO[];
}

export interface GetItemsRequestDTO {
  category?: MaterialCategory;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetItemsResultDTO {
  items: ItemResultDTO[];
  total: number;
  page: number;
  limit: number;
}
