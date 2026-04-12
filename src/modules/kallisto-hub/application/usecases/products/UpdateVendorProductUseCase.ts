import { IProductRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IProductRepository";
import { IUpdateVendorProductUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/products/IUpdateVendorProductUseCase";
import {
  UpdateVendorProductRequestDTO,
  ProductResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ProductDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HubMessages } from "@packages/common/messages";
import { HttpStatus } from "@packages/common/enums";

export class UpdateVendorProductUseCase implements IUpdateVendorProductUseCase {
  constructor(private readonly _productRepository: IProductRepository) {}

  async execute(dto: UpdateVendorProductRequestDTO): Promise<ProductResultDTO> {
    // 1. Check if product exists
    const existing = await this._productRepository.findById(dto.id);
    if (!existing) {
      throw new AppError(
        ErrorCode.PRODUCT_NOT_FOUND,
        HubMessages.PRODUCT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // 2. Update and save
    const updated = await this._productRepository.update({
      id: dto.id,
      productName: dto.productName,
      brandName: dto.brandName,
      description: dto.description,
      status: dto.status,
      variants: dto.variants?.map((v) => ({
        id: v.id || "",
        sku: v.sku,
        price: v.price,
        stockQuantity: v.stockQuantity,
        vendorProductId: dto.id,
        selectedSpecs:
          v.selectedSpecs?.map((s) => ({
            id: "",
            variantId: v.id || "",
            specId: s.specId,
            selectedValue: s.selectedValue,
          })) || [],
      })),
    });

    // 3. Map to result
    return {
      id: updated.id,
      productCode: updated.productCode,
      productName: updated.productName,
      brandName: updated.brandName,
      description: updated.description,
      status: updated.status,
      vendorId: updated.vendorId,
      itemId: updated.itemId,
      variants: updated.variants?.map((v) => ({
        id: v.id,
        sku: v.sku,
        price: Number(v.price),
        stockQuantity: v.stockQuantity,
        selectedSpecs:
          v.selectedSpecs?.map((s) => ({
            specId: s.specId,
            selectedValue: s.selectedValue,
          })) || [],
      })),
    };
  }
}
