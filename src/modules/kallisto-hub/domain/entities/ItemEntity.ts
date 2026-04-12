import { MaterialCategory, UnitOfMeasure } from "@packages/common/enums";

// ─── SUB-ENTITY: Specification ───────────────────────────────────────────────

export interface SpecificationEntity {
  id: string;
  specName: string;
  specValues: string[];
  itemId: string;
}

// ─── ROOT ENTITY: Item ────────────────────────────────────────────────────────

export interface ItemEntity {
  id: string;
  itemCode: string;
  name: string;
  category: MaterialCategory;
  hsnCode?: string;
  imageUrl?: string;
  unitOfMeasure: UnitOfMeasure;
  description?: string;

  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // relations
  specifications?: SpecificationEntity[];
}
