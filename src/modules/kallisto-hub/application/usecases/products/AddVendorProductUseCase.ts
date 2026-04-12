import { IProductRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IProductRepository";
import { IVendorRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IVendorRepository";
import { IItemRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IItemRepository";
import { IAddVendorProductUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/products/IAddVendorProductUseCase";
import {
  AddVendorProductRequestDTO,
  ProductResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ProductDTO";
import { ProductEntity } from "@src/modules/kallisto-hub/domain/entities/ProductEntity";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HubMessages } from "@packages/common/messages";
import { HttpStatus, ProductStatus } from "@packages/common/enums";

export class AddVendorProductUseCase implements IAddVendorProductUseCase {
  constructor(
    private readonly _productRepository: IProductRepository,
    private readonly _vendorRepository: IVendorRepository,
    private readonly _itemRepository: IItemRepository,
  ) {}

  async execute(dto: AddVendorProductRequestDTO): Promise<ProductResultDTO> {
    // 1. Verify Vendor exists
    const vendor = await this._vendorRepository.findById(dto.vendorId);
    if (!vendor) {
      throw new AppError(
        ErrorCode.VENDOR_NOT_FOUND,
        HubMessages.VENDOR_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // 2. Verify Item exists
    const item = await this._itemRepository.findById(dto.itemId);
    if (!item) {
      throw new AppError(
        ErrorCode.ITEM_NOT_FOUND,
        HubMessages.ITEM_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // 3. Create Product Entity
    const now = new Date();
    const product: ProductEntity = {
      id: "",
      productCode: "",
      productName: dto.productName,
      brandName: dto.brandName,
      description: dto.description,
      status: dto.status || ProductStatus.ACTIVE,
      vendorId: dto.vendorId,
      itemId: dto.itemId,
      createdAt: now,
      updatedAt: now,
      variants: dto.variants.map((v) => ({
        id: "",
        price: v.price,
        stockQuantity: v.stockQuantity,
        vendorProductId: "",
        selectedSpecs: v.selectedSpecs.map((s) => ({
          id: "",
          variantId: "",
          specId: s.specId,
          selectedValue: s.selectedValue,
        })),
      })),
    };

    const created = await this._productRepository.create(product);

    return {
      id: created.id,
      productCode: created.productCode,
      productName: created.productName,
      brandName: created.brandName,
      description: created.description,
      status: created.status,
      vendorId: created.vendorId,
      itemId: created.itemId,
      variants: created.variants?.map((v) => ({
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
