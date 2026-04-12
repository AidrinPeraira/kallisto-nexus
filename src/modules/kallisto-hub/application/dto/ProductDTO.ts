import { ProductStatus } from "@packages/common/enums";

export interface VariantSelectionDTO {
  specId: string;
  selectedValue: string;
}

export interface ProductVariantDTO {
  id?: string;
  sku?: string;
  price: number;
  stockQuantity?: number;
  selectedSpecs: VariantSelectionDTO[];
}

export interface ProductResultDTO {
  id: string;
  productCode?: string;
  productName: string;
  brandName?: string;
  description?: string;
  status: ProductStatus;
  vendorId: string;
  itemId: string;
  variants?: ProductVariantDTO[];
}

export interface AddVendorProductRequestDTO {
  vendorId: string;
  itemId: string;
  productName: string;
  brandName?: string;
  description?: string;
  status?: ProductStatus;
  variants: Omit<ProductVariantDTO, "id" | "sku">[];
}

export interface UpdateVendorProductRequestDTO {
  id: string;
  productName?: string;
  brandName?: string;
  description?: string;
  status?: ProductStatus;
  variants?: ProductVariantDTO[];
}

export interface GetProductsRequestDTO {
  itemId?: string;
  vendorId?: string;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetProductsResultDTO {
  products: ProductResultDTO[];
  total: number;
  page: number;
  limit: number;
}

export interface GetVendorProductsRequestDTO {
  vendorId: string;
  page?: number;
  limit?: number;
}

export interface GetVendorProductsResultDTO {
  vendorId: string;
  products: ProductResultDTO[];
}
