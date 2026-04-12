import { ProductStatus } from "@packages/common/enums";
import {
  AddVendorProductRequestDTO,
  GetProductsRequestDTO,
  GetVendorProductsRequestDTO,
  UpdateVendorProductRequestDTO,
} from "@src/modules/kallisto-hub/application/dto/ProductDTO";

export class ProductMapper {
  static toAddVendorProductRequestDTO(body: any): AddVendorProductRequestDTO {
    return {
      productName: body.productName,
      brandName: body.brandName,
      description: body.description,
      vendorId: body.vendorId,
      itemId: body.itemId,
      variants: body.variants?.map((v: any) => ({
        price: v.price,
        stockQuantity: v.stockQuantity,
        selectedSpecs: v.selectedSpecs?.map((s: any) => ({
          specId: s.specId,
          selectedValue: s.selectedValue,
        })),
      })),
    };
  }

  static toUpdateVendorProductRequestDTO(
    id: string,
    body: any,
  ): UpdateVendorProductRequestDTO {
    return {
      id,
      productName: body.productName,
      brandName: body.brandName,
      description: body.description,
      status: body.status as ProductStatus,
      variants: body.variants?.map((v: any) => ({
        id: v.id,
        sku: v.sku,
        price: v.price,
        stockQuantity: v.stockQuantity,
        selectedSpecs: v.selectedSpecs?.map((s: any) => ({
          id: s.id,
          specId: s.specId,
          selectedValue: s.selectedValue,
        })),
      })),
    };
  }

  static toGetVendorProductsRequestDTO(
    vendorId: string,
    query: any,
  ): GetVendorProductsRequestDTO {
    return {
      vendorId,
      page: query.page ? parseInt(query.page as string) : 1,
      limit: query.limit ? parseInt(query.limit as string) : 10,
    };
  }

  static toGetProductsRequestDTO(query: any): GetProductsRequestDTO {
    return {
      page: query.page ? parseInt(query.page as string) : 1,
      limit: query.limit ? parseInt(query.limit as string) : 10,
      search: query.search as string,
      vendorId: query.vendorId as string,
      itemId: query.itemId as string,
    };
  }
}
