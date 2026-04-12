import { Router } from "express";
import { IVendorController } from "../interfaces/IVendorController";
import {
  authMidllewarre,
  roleMiddleware,
  validate,
} from "@packages/common/middleware";
import {
  CreateVendorSchema,
  UpdateVendorSchema,
} from "@src/modules/kallisto-hub/presentation/validators/VendorValidators";
import { UserRole } from "@packages/common/enums";

export function createVendorRouter(controller: IVendorController): Router {
  const router = Router();

  router.post(
    "/",
    authMidllewarre,
    roleMiddleware(UserRole.SYSTEM_ADMIN),
    validate(CreateVendorSchema),
    controller.createVendor.bind(controller),
  );

  router.put(
    "/:id",
    authMidllewarre,
    roleMiddleware(UserRole.SYSTEM_ADMIN),
    validate(UpdateVendorSchema),
    controller.updateVendor.bind(controller),
  );

  router.get("/:id", controller.getVendorDetails.bind(controller));

  router.get("/", controller.getVendors.bind(controller));

  return router;
}
