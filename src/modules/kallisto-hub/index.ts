import { Router } from "express";
import { createHubModule } from "./hub.module";
import { createVendorRouter } from "./presentation/router/VendorRouter";
import { createItemRouter } from "./presentation/router/ItemRouter";
import { createProductRouter } from "./presentation/router/ProductRouter";

export function createHubRouter(): Router {
  const { vendorController, itemController, productController } =
    createHubModule();
  const router = Router();

  // Route Mounting
  router.use("/vendors", createVendorRouter(vendorController));
  router.use("/items", createItemRouter(itemController));
  router.use("/products", createProductRouter(productController));

  return router;
}
