import { Router } from "express";
import { IProductController } from "../interfaces/IProductController";
import {
  authMidllewarre,
  roleMiddleware,
  validate,
} from "@packages/common/middleware";
import {
  AddVendorProductSchema,
  UpdateVendorProductSchema,
} from "@src/modules/kallisto-hub/presentation/validators/ProductValidators";
import { UserRole } from "@packages/common/enums";

export function createProductRouter(controller: IProductController): Router {
  const router = Router();

  router.post(
    "/",
    authMidllewarre,
    roleMiddleware(UserRole.SYSTEM_ADMIN),
    validate(AddVendorProductSchema),
    controller.addVendorProduct.bind(controller),
  );

  router.put(
    "/:id",
    authMidllewarre,
    roleMiddleware(UserRole.SYSTEM_ADMIN),
    validate(UpdateVendorProductSchema),
    controller.updateVendorProduct.bind(controller),
  );

  router.get(
    "/vendor/:vendorId",
    controller.getVendorProducts.bind(controller),
  );

  router.get("/", controller.getProducts.bind(controller));

  return router;
}
