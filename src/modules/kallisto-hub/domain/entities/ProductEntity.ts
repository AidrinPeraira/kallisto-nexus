import { ProductStatus } from "@packages/common/enums";

// ─── SUB-ENTITY: Variant Selection ─────────────────────────────────────────

export interface VariantSelectionEntity {
  id: string;
  variantId: string;
  specId: string;
  selectedValue: string;
}

// ─── SUB-ENTITY: Product Variant ───────────────────────────────────────────

export interface ProductVariantEntity {
  id: string;
  sku?: string;
  price: number; // Decimal mapped to number
  stockQuantity?: number;
  vendorProductId: string;

  // relations
  selectedSpecs?: VariantSelectionEntity[];
}

// ─── ROOT ENTITY: Product ────────────────────────────────────────────────────

export interface ProductEntity {
  id: string;
  productCode?: string;
  productName: string;
  brandName?: string;
  description?: string;
  status: ProductStatus;

  vendorId: string;
  itemId: string;

  createdAt: Date;
  updatedAt: Date;

  // relations
  variants?: ProductVariantEntity[];
}
