import { IProductRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IProductRepository";
import { IGetVendorProductsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/products/IGetVendorProductsUseCase";
import { GetVendorProductsResultDTO } from "@src/modules/kallisto-hub/application/dto/ProductDTO";

export class GetVendorProductsUseCase implements IGetVendorProductsUseCase {
  constructor(private readonly _productRepository: IProductRepository) {}

  async execute(vendorId: string): Promise<GetVendorProductsResultDTO> {
    const products = await this._productRepository.findByVendorId(vendorId);

    return {
      vendorId,
      products: products.map((p) => ({
        id: p.id,
        productCode: p.productCode,
        productName: p.productName,
        brandName: p.brandName,
        description: p.description,
        status: p.status,
        vendorId: p.vendorId,
        itemId: p.itemId,
        variants: p.variants?.map((v) => ({
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
      })),
    };
  }
}
