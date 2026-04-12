import { IProductRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IProductRepository";
import { IGetProductsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/products/IGetProductsUseCase";
import {
  GetProductsRequestDTO,
  GetProductsResultDTO,
} from "@src/modules/kallisto-hub/application/dto/ProductDTO";

export class GetProductsUseCase implements IGetProductsUseCase {
  constructor(private readonly _productRepository: IProductRepository) {}

  async execute(dto: GetProductsRequestDTO): Promise<GetProductsResultDTO> {
    const products = await this._productRepository.list(dto);

    return {
      products: products.map((p) => ({
        id: p.id,
        productCode: p.productCode,
        productName: p.productName,
        brandName: p.brandName,
        description: p.description,
        status: p.status,
        vendorId: p.vendorId,
        itemId: p.itemId,
      })),
      total: products.length, // Should ideally come from repository
      page: dto.page || 1,
      limit: dto.limit || 10,
    };
  }
}
