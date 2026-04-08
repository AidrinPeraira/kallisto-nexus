import { Request, Response } from "express";
import { IAddSPIdentityUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPIdentityUseCase";
import { IAddOrgExtraIdentityUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/organisation/IAddOrgExtraIdentityUseCase";
import { IOnboardingController } from "@src/modules/kallisto-bridge/presentation/interfaces/IOnboardingController";
import { ILogger } from "@packages/logger";
import { successResponse } from "@packages/common/responses";
import { HttpStatus } from "@packages/common/enums";
import { OnboardingMapper } from "@src/modules/kallisto-bridge/presentation/mapper/OnboardingMapper";
import { IUpdateProfileCompletionUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IUpdateProfileCompletionUseCase";
import { ProfileMessages } from "@packages/common/messages";
import { IAddProfessionalExtraIdentityUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/professional/IAddProfessionalExtraIdentityUseCase";
import { IAddContractorExtraIdentityUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/contractor/IAddContractorExtraIdentityUseCase";

export class OnboardingController implements IOnboardingController {
  constructor(
    private readonly _logger: ILogger,
    private readonly _addSPIdentityUseCase: IAddSPIdentityUseCase,
    private readonly _addOrgExtraIdentityUseCase: IAddOrgExtraIdentityUseCase,
    private readonly _addProfessionalExtraIdentityUseCase: IAddProfessionalExtraIdentityUseCase,
    private readonly _addContractorExtraIdentityUseCase: IAddContractorExtraIdentityUseCase,
    private readonly _updateProfileCompletionUseCase: IUpdateProfileCompletionUseCase,
  ) {}

  /**
   * This functino calls the adds organisation identity
   * - adds common fields in sp identity
   * - adds extra fields for org identity
   * - updates status boolean for identity
   */
  async addOrgSPIdentity(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Org SP Identity request received");

      const data = OnboardingMapper.toAddOrgSPIdentityRequestDTO(req.body);

      //create sp
      const result = await this._addSPIdentityUseCase.execute(data);

      //add org extra identity
      await this._addOrgExtraIdentityUseCase.execute({
        ...data,
        serviceProviderId: result.serviceProviderId,
      });

      //update completion status
      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: result.serviceProviderId,
        isIdentityAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: result.serviceProviderId },
            ProfileMessages.ORGANISATION_PROFILE_CREATED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add Org SP Identity Error : ", error);
      throw error;
    }
  }

  /**
   * This functino calls the adds professional identity
   * - adds common fields in sp identity
   * - adds extra fields for professional identity
   * - updates status boolean for identity
   */
  async addProfessionalSPIdentity(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Professional SP Identity request received");

      const data = OnboardingMapper.toAddProfessionalSPIdentityRequestDTO(
        req.body,
      );

      //create sp
      const result = await this._addSPIdentityUseCase.execute(data);

      //add professional extra identity
      await this._addProfessionalExtraIdentityUseCase.execute({
        ...data,
        serviceProviderId: result.serviceProviderId,
      });

      //update completion status
      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: result.serviceProviderId,
        isIdentityAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: result.serviceProviderId },
            ProfileMessages.PROFESSIONAL_PROFILE_CREATED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add Professional SP Identity Error : ", error);
      throw error;
    }
  }

  /**
   * This functino calls the adds contractor identity
   * - adds common fields in sp identity
   * - adds extra fields for contractor identity
   * - updates status boolean for identity
   */
  async addContractorSPIdentity(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Contractor SP Identity request received");

      const data = OnboardingMapper.toAddContractorSPIdentityRequestDTO(
        req.body,
      );

      //create sp
      const result = await this._addSPIdentityUseCase.execute(data);

      //add contractor extra identity
      await this._addContractorExtraIdentityUseCase.execute({
        ...data,
        serviceProviderId: result.serviceProviderId,
      });

      //update completion status
      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: result.serviceProviderId,
        isIdentityAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: result.serviceProviderId },
            ProfileMessages.CONTRACTOR_PROFILE_CREATED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add Contractor SP Identity Error : ", error);
      throw error;
    }
  }
}
