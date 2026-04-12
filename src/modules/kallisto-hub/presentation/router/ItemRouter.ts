import { Router } from "express";
import { IItemController } from "../interfaces/IItemController";
import {
  authMidllewarre,
  roleMiddleware,
  validate,
} from "@packages/common/middleware";
import {
  CreateItemSchema,
  UpdateItemSchema,
} from "@src/modules/kallisto-hub/presentation/validators/ItemValidators";
import { UserRole } from "@packages/common/enums";

export function createItemRouter(controller: IItemController): Router {
  const router = Router();

  router.post(
    "/",
    authMidllewarre,
    roleMiddleware(UserRole.SYSTEM_ADMIN),
    validate(CreateItemSchema),
    controller.createItem.bind(controller),
  );

  router.put(
    "/:id",
    authMidllewarre,
    roleMiddleware(UserRole.SYSTEM_ADMIN),
    validate(UpdateItemSchema),
    controller.updateItem.bind(controller),
  );

  router.get("/", controller.getItems.bind(controller));

  return router;
}
