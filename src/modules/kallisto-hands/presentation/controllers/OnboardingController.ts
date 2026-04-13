import { Request, Response } from "express";
import { ILogger } from "@packages/logger";
import { successResponse } from "@packages/common/responses";
import { HttpStatus } from "@packages/common/enums";
import { ProfileMessages } from "@packages/common/messages";
import { IOnboardingController } from "@src/modules/kallisto-hands/presentation/interfaces/IOnboardingController";
import { OnboardingMapper } from "@src/modules/kallisto-hands/presentation/mapper/OnboardingMapper";
import { IAddSAIdentityUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IAddSAIdentityUseCase";
import { IAddSAAddressUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IAddSAAddressUseCase";
import { ISAAddCredentialsUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/ISAAddCredentialsUseCase";
import { IAddSABankDetailsUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IAddSABankDetailsUseCase";
import { IAddSAServiceAreaUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IAddSAServiceAreaUseCase";
import { IGetServiceAssociateProfileUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IGetServiceAssociateProfileUseCase";
import { IUpdateStatusUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/common/IUpdateStatusUseCase";
import { IAddSAContractorSkillsUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/contractor/IAddSAContractorSkillsUseCase";
import { IAddSAContractorServicesUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/contractor/IAddSAContractorServicesUseCase";
import { IAddSAWorkerSkillsUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/worker/IAddSAWorkerSkillsUseCase";
import { IAddSAWorkerServicesUseCase } from "@src/modules/kallisto-hands/application/interfaces/usecases/profile/worker/IAddSAWorkerServicesUseCase";

export class OnboardingController implements IOnboardingController {
  constructor(
    private readonly _logger: ILogger,
    private readonly _addSAIdentityUseCase: IAddSAIdentityUseCase,
    private readonly _addSAAddressUseCase: IAddSAAddressUseCase,
    private readonly _addSAContractorSkillsUseCase: IAddSAContractorSkillsUseCase,
    private readonly _addSAContractorServicesUseCase: IAddSAContractorServicesUseCase,
    private readonly _addSAWorkerSkillsUseCase: IAddSAWorkerSkillsUseCase,
    private readonly _addSAWorkerServicesUseCase: IAddSAWorkerServicesUseCase,
    private readonly _addSACredentialsUseCase: ISAAddCredentialsUseCase,
    private readonly _addSABankDetailsUseCase: IAddSABankDetailsUseCase,
    private readonly _addSAServiceAreaUseCase: IAddSAServiceAreaUseCase,
    private readonly _getSAProfileUseCase: IGetServiceAssociateProfileUseCase,
    private readonly _updateStatusUseCase: IUpdateStatusUseCase,
  ) {}

  async addContractorSAIdentity(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Contractor SA Identity request received");
      const data = OnboardingMapper.toAddSAIdentityRequestDTO(req.body);
      const result = await this._addSAIdentityUseCase.execute(data);

      await this._updateStatusUseCase.execute({
        serviceAssociateId: result.serviceAssociateId,
        isIdentityAdded: true,
      });

      res.status(HttpStatus.OK).json(
        successResponse(
          { serviceAssociateId: result.serviceAssociateId },
          ProfileMessages.CONTRACTOR_PROFILE_CREATED,
        ),
      );
    } catch (error) {
      this._logger.error("Add Contractor SA Identity Error: ", error);
      throw error;
    }
  }

  async addWorkerSAIdentity(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Worker SA Identity request received");
      const data = OnboardingMapper.toAddSAIdentityRequestDTO(req.body);
      const result = await this._addSAIdentityUseCase.execute(data);

      await this._updateStatusUseCase.execute({
        serviceAssociateId: result.serviceAssociateId,
        isIdentityAdded: true,
      });

      res.status(HttpStatus.OK).json(
        successResponse(
          { serviceAssociateId: result.serviceAssociateId },
          ProfileMessages.PROFESSIONAL_PROFILE_CREATED, // Reuse or add WORKER_PROFILE_CREATED
        ),
      );
    } catch (error) {
      this._logger.error("Add Worker SA Identity Error: ", error);
      throw error;
    }
  }

  async addSAAddress(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add SA Address request received");
      const data = OnboardingMapper.toAddSAAddressRequestDTO(req.body);
      await this._addSAAddressUseCase.execute(data);

      await this._updateStatusUseCase.execute({
        serviceAssociateId: data.serviceAssociateId,
        isAddressAdded: true,
      });

      res.status(HttpStatus.OK).json(
        successResponse(
          { serviceAssociateId: data.serviceAssociateId },
          ProfileMessages.ADDRESS_ADDED,
        ),
      );
    } catch (error) {
      this._logger.error("Add SA Address Error: ", error);
      throw error;
    }
  }

  async addContractorSASkills(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Contractor SA Skills request received");
      const skillsData = OnboardingMapper.toAddSASkillsRequestDTO(req.body);
      const servicesData = OnboardingMapper.toAddSAContractorServicesRequestDTO(req.body);

      await this._addSAContractorSkillsUseCase.execute(skillsData);
      await this._addSAContractorServicesUseCase.execute(servicesData);

      await this._updateStatusUseCase.execute({
        serviceAssociateId: skillsData.serviceAssociateId,
        isSkillsAdded: true,
      });

      res.status(HttpStatus.OK).json(
        successResponse(
          { serviceAssociateId: skillsData.serviceAssociateId },
          ProfileMessages.SERVICES_ADDED,
        ),
      );
    } catch (error) {
      this._logger.error("Add Contractor SA Skills Error: ", error);
      throw error;
    }
  }

  async addWorkerSASkills(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Worker SA Skills request received");
      const skillsData = OnboardingMapper.toAddSASkillsRequestDTO(req.body);
      const servicesData = OnboardingMapper.toAddSAWorkerServicesRequestDTO(req.body);

      await this._addSAWorkerSkillsUseCase.execute(skillsData);
      await this._addSAWorkerServicesUseCase.execute(servicesData);

      await this._updateStatusUseCase.execute({
        serviceAssociateId: skillsData.serviceAssociateId,
        isSkillsAdded: true,
      });

      res.status(HttpStatus.OK).json(
        successResponse(
          { serviceAssociateId: skillsData.serviceAssociateId },
          ProfileMessages.SERVICES_ADDED,
        ),
      );
    } catch (error) {
      this._logger.error("Add Worker SA Skills Error: ", error);
      throw error;
    }
  }

  async addSACredentials(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add SA Credentials request received");
      const data = OnboardingMapper.toAddSACredentialsRequestDTO(req.body);
      await this._addSACredentialsUseCase.execute(data);

      await this._updateStatusUseCase.execute({
        serviceAssociateId: data.serviceAssociateId,
        isCredentialsAdded: true,
      });

      res.status(HttpStatus.OK).json(
        successResponse(
          { serviceAssociateId: data.serviceAssociateId },
          ProfileMessages.CREDENTIALS_ADDED,
        ),
      );
    } catch (error) {
      this._logger.error("Add SA Credentials Error: ", error);
      throw error;
    }
  }

  async addSABankDetails(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add SA Bank Details request received");
      const data = OnboardingMapper.toAddSABankDetailsRequestDTO(req.body);
      await this._addSABankDetailsUseCase.execute(data);

      await this._updateStatusUseCase.execute({
        serviceAssociateId: data.serviceAssociateId,
        isBankDetailsAdded: true,
      });

      res.status(HttpStatus.OK).json(
        successResponse(
          { serviceAssociateId: data.serviceAssociateId },
          ProfileMessages.BANK_DETAILS_ADDED,
        ),
      );
    } catch (error) {
      this._logger.error("Add SA Bank Details Error: ", error);
      throw error;
    }
  }

  async addSAServiceAreas(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add SA Service Areas request received");
      const data = OnboardingMapper.toAddSAServiceAreasRequestDTO(req.body);

      for (const area of data) {
        await this._addSAServiceAreaUseCase.execute(area);
      }

      res.status(HttpStatus.OK).json(
        successResponse(
          { serviceAssociateId: req.body.serviceAssociateId },
          ProfileMessages.SERVICE_AREAS_ADDED,
        ),
      );
    } catch (error) {
      this._logger.error("Add SA Service Areas Error: ", error);
      throw error;
    }
  }

  async getSAProfile(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Get SA Profile request received");
      const userId = (req as any).user.id;
      const profile = await this._getSAProfileUseCase.execute(userId);

      res.status(HttpStatus.OK).json(
        successResponse(profile, ProfileMessages.PROFILE_FETCHED),
      );
    } catch (error) {
      this._logger.error("Get SA Profile Error: ", error);
      throw error;
    }
  }
}
