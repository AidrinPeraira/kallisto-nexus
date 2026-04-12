import { IProfileController } from "@src/modules/kallisto-bridge/presentation/interfaces/IProfileController";
import { Router } from "express";

export function createProfileRoutes(
  profileController: IProfileController,
) {
  const router = Router();

  router.get(
    "/me",
    profileController.getProfile.bind(profileController),
  );

  return router;
}
