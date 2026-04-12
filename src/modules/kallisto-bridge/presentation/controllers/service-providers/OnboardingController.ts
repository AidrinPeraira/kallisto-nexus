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
import { IAddSPAddressUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPAddressUseCase";
import { IAddServicesUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPServicesUseCase";
import { IAddSPServiceAreaUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPServiceAreaUseCase";
import { AppError, ErrorCode } from "@packages/common/errors";
import { IAddSPCredentialsUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPCredentialsUseCase";
import { IAddOrgExtraCredentialsUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/organisation/IAddOrgExtraCredentialsUseCase";
import { IAddOrgRepresentativeUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/organisation/IAddOrgRepresentativeUseCase";
import { IAddSPBankDetailsUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/profile/common/IAddSPBankDetailsUseCase";

export class OnboardingController implements IOnboardingController {
  constructor(
    private readonly _logger: ILogger,
    private readonly _addSPIdentityUseCase: IAddSPIdentityUseCase,
    private readonly _addOrgExtraIdentityUseCase: IAddOrgExtraIdentityUseCase,
    private readonly _addProfessionalExtraIdentityUseCase: IAddProfessionalExtraIdentityUseCase,
    private readonly _addContractorExtraIdentityUseCase: IAddContractorExtraIdentityUseCase,

    private readonly _addSPAddressUseCase: IAddSPAddressUseCase,
    private readonly _addSPServicesUseCase: IAddServicesUseCase,
    private readonly _addSPServiceAreasUseCase: IAddSPServiceAreaUseCase,

    private readonly _addSPCredentialsUseCase: IAddSPCredentialsUseCase,
    private readonly _addOrgExtraCredentialsUseCase: IAddOrgExtraCredentialsUseCase,

    private readonly _addOrgRepresentativeUseCase: IAddOrgRepresentativeUseCase,
    private readonly _addSPBankDetailsUseCase: IAddSPBankDetailsUseCase,

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
        isRepresentativeAdded: true,
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
        isRepresentativeAdded: true,
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

  async addSPAddress(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add SP Address request received");

      const data = OnboardingMapper.toAddSPAddressRequestDTO(req.body);

      //add address
      await this._addSPAddressUseCase.execute(data);

      //update completion status
      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: data.serviceProviderId,
        isAddressAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: data.serviceProviderId },
            ProfileMessages.ADDRESS_ADDED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add SP Address Error : ", error);
      throw error;
    }
  }

  /**
   * This method adds services only
   * - It lists the services that the service provider offers
   */
  async addSPServices(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add SP Services request received");

      const data = OnboardingMapper.toAddSPServicesRequestDTO(req.body);

      //add services
      await this._addSPServicesUseCase.execute(data);

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: data.serviceProviderId },
            ProfileMessages.SERVICES_ADDED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add SP Services Error : ", error);
      throw error;
    }
  }

  /**
   * This method adds service areas only
   */
  async addSPServiceAreas(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add SP Service Areas request received");

      const data = OnboardingMapper.toAddSPServiceAreasRequestDTO(req.body);

      if (data.length === 0) {
        throw new AppError(
          ErrorCode.BAD_REQUEST,
          ProfileMessages.SERVICE_AREAS_MANDATORY,
          HttpStatus.BAD_REQUEST,
        );
      }

      //add service areas
      for (const serviceArea of data) {
        await this._addSPServiceAreasUseCase.execute(serviceArea);
      }

      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: req.body.serviceProviderId,
        isServicesAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: req.body.serviceProviderId },
            ProfileMessages.SERVICE_AREAS_ADDED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add SP Service Areas Error: ", error);
      throw error;
    }
  }

  async addOrgSPCredentials(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Org SP Credentials request received");

      const data = OnboardingMapper.toAddOrgSPCredentialsRequestDTO(req.body);

      //add credentials
      await this._addSPCredentialsUseCase.execute(data);
      await this._addOrgExtraCredentialsUseCase.execute(data);

      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: data.serviceProviderId,
        isCredentialsAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: data.serviceProviderId },
            ProfileMessages.CREDENTIALS_ADDED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add Org SP Credentials Error: ", error);
      throw error;
    }
  }

  async addProfessionalSPCredentials(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      this._logger.info("Add Professional SP Credentials request received");

      const data = OnboardingMapper.toAddProfessionalSPCredentialsRequestDTO(
        req.body,
      );

      //add credentials
      await this._addSPCredentialsUseCase.execute(data);

      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: data.serviceProviderId,
        isCredentialsAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: data.serviceProviderId },
            ProfileMessages.CREDENTIALS_ADDED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add Professional SP Credentials Error: ", error);
      throw error;
    }
  }

  async addContractorSPCredentials(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Contractor SP Credentials request received");

      const data = OnboardingMapper.toAddContractorSPCredentialsRequestDTO(
        req.body,
      );

      //add credentials
      await this._addSPCredentialsUseCase.execute(data);

      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: data.serviceProviderId,
        isCredentialsAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: data.serviceProviderId },
            ProfileMessages.CREDENTIALS_ADDED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add Contractor SP Credentials Error: ", error);
      throw error;
    }
  }

  async addOrgRepresentative(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Org Representative request received");

      const data = OnboardingMapper.toAddOrgRepresentativeRequestDTO(req.body);

      //add representative
      await this._addOrgRepresentativeUseCase.execute(data);

      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: data.serviceProviderId,
        isRepresentativeAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: data.serviceProviderId },
            ProfileMessages.REPRESENTATIVE_ADDED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add Org Representative Error: ", error);
      throw error;
    }
  }

  async addSPBankDetails(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add SP Bank Details request received");

      const data = OnboardingMapper.toAddSPBankDetailsRequestDTO(req.body);

      //add bank details
      await this._addSPBankDetailsUseCase.execute(data);

      //update completion status
      await this._updateProfileCompletionUseCase.execute({
        serviceProviderId: data.serviceProviderId,
        isBankDetailsAdded: true,
      });

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { serviceProviderId: data.serviceProviderId },
            ProfileMessages.BANK_DETAILS_ADDED,
          ),
        );
      return;
    } catch (error: unknown) {
      this._logger.error("Add SP Bank Details Error: ", error);
      throw error;
    }
  }
}
