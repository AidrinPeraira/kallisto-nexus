import { WinstonLogger } from "@packages/logger";
// Repositories
import { PrismaItemRepository } from "./infrastructure/repositories/PrismaItemRepository";
import { PrismaProductRepository } from "./infrastructure/repositories/PrismaProductRepository";
import { PrismaVendorRepository } from "./infrastructure/repositories/PrismaVendorRepository";

// Use Cases - Vendor
import { CreateVendorUseCase } from "./application/usecases/vendor/CreateVendorUseCase";
import { UpdateVendorUseCase } from "./application/usecases/vendor/UpdateVendorUseCase";
import { GetVendorDetailsUseCase } from "./application/usecases/vendor/GetVendorDetailsUseCase";
import { GetVendorsUseCase } from "./application/usecases/vendor/GetVendorsUseCase";

// Use Cases - Item
import { CreateItemUseCase } from "./application/usecases/item/CreateItemUseCase";
import { UpdateItemUseCase } from "./application/usecases/item/UpdateItemUseCase";
import { GetItemsUseCase } from "./application/usecases/item/GetItemsUseCase";

// Use Cases - Products
import { AddVendorProductUseCase } from "./application/usecases/products/AddVendorProductUseCase";
import { UpdateVendorProductUseCase } from "./application/usecases/products/UpdateVendorProductUseCase";
import { GetVendorProductsUseCase } from "./application/usecases/products/GetVendorProductsUseCase";
import { GetProductsUseCase } from "./application/usecases/products/GetProductsUseCase";

// Controllers
import { VendorController } from "./presentation/controllers/VendorController";
import { ItemController } from "./presentation/controllers/ItemController";
import { ProductController } from "./presentation/controllers/ProductController";

export function createHubModule() {
  const logger = new WinstonLogger();

  // 1. Repositories
  const itemRepository = new PrismaItemRepository();
  const productRepository = new PrismaProductRepository();
  const vendorRepository = new PrismaVendorRepository();

  // 2. Use Cases - Vendor
  const createVendorUseCase = new CreateVendorUseCase(vendorRepository);
  const updateVendorUseCase = new UpdateVendorUseCase(vendorRepository);
  const getVendorDetailsUseCase = new GetVendorDetailsUseCase(vendorRepository);
  const getVendorsUseCase = new GetVendorsUseCase(vendorRepository);

  // 3. Use Cases - Item
  const createItemUseCase = new CreateItemUseCase(itemRepository);
  const updateItemUseCase = new UpdateItemUseCase(itemRepository);
  const getItemsUseCase = new GetItemsUseCase(itemRepository);

  // 4. Use Cases - Product
  const addVendorProductUseCase = new AddVendorProductUseCase(
    productRepository,
    vendorRepository,
    itemRepository,
  );
  const updateVendorProductUseCase = new UpdateVendorProductUseCase(
    productRepository,
  );
  const getVendorProductsUseCase = new GetVendorProductsUseCase(
    productRepository,
  );
  const getProductsUseCase = new GetProductsUseCase(productRepository);

  // 5. Controllers
  const vendorController = new VendorController(
    logger,
    createVendorUseCase,
    updateVendorUseCase,
    getVendorDetailsUseCase,
    getVendorsUseCase,
  );

  const itemController = new ItemController(
    logger,
    createItemUseCase,
    updateItemUseCase,
    getItemsUseCase,
  );

  const productController = new ProductController(
    logger,
    addVendorProductUseCase,
    updateVendorProductUseCase,
    getVendorProductsUseCase,
    getProductsUseCase,
  );

  return {
    vendorController,
    itemController,
    productController,
  };
}
