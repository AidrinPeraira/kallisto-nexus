import { Request, Response } from "express";
import { IProfileController } from "@src/modules/kallisto-bridge/presentation/interfaces/IProfileController";
import { IGetServiceProviderProfileUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IGetServiceProviderProfileUseCase";
import { ILogger } from "@packages/logger";
import { successResponse } from "@packages/common/responses";
import { HttpStatus } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";

export class ProfileController implements IProfileController {
  constructor(
    private readonly _logger: ILogger,
    private readonly _getProfileUseCase: IGetServiceProviderProfileUseCase,
  ) {}

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Get SP Profile request received");

      // Assuming authMiddleware attaches user to request
      const userId = (req as any).user?.userId || req.body.userId;

      if (!userId) {
        this._logger.error("User ID not found in request context");
        throw new Error("Unauthorized: User context missing");
      }

      const profile = await this._getProfileUseCase.execute(userId);

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            profile,
            ProfileMessages.PROFILE_FETCHED || "Profile fetched successfully",
          ),
        );
    } catch (error: unknown) {
      this._logger.error("Get SP Profile Error: ", error);
      throw error;
    }
  }
}
