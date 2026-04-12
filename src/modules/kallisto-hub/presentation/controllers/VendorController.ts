import { Request, Response } from "express";
import { ILogger } from "@packages/logger";
import { successResponse } from "@packages/common/responses";
import { HttpStatus } from "@packages/common/enums";
import { HubMessages } from "@packages/common/messages";
import { IVendorController } from "@src/modules/kallisto-hub/presentation/interfaces/IVendorController";
import { ICreateVendorUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/vendor/ICreateVendorUseCase";
import { IGetVendorDetailsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/vendor/IGetVendorDetailsUseCase";
import { IUpdateVendorUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/vendor/IUpdateVendorUseCase";
import { IGetVendorsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/vendor/IGetVendorsUseCase";
import { VendorMapper } from "@src/modules/kallisto-hub/presentation/mapper/VendorMapper";

export class VendorController implements IVendorController {
  constructor(
    private readonly _logger: ILogger,
    private readonly _createVendorUseCase: ICreateVendorUseCase,
    private readonly _updateVendorUseCase: IUpdateVendorUseCase,
    private readonly _getVendorDetailsUseCase: IGetVendorDetailsUseCase,
    private readonly _getVendorsUseCase: IGetVendorsUseCase,
  ) {}

  async createVendor(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Create Vendor request received");
      const dto = VendorMapper.toCreateVendorRequestDTO(req.body);
      const result = await this._createVendorUseCase.execute(dto);

      res
        .status(HttpStatus.CREATED)
        .json(successResponse(result, HubMessages.VENDOR_CREATED));
    } catch (error) {
      this._logger.error("Create Vendor error", error);
      throw error;
    }
  }

  async updateVendor(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Update Vendor request received");
      const dto = VendorMapper.toUpdateVendorRequestDTO(
        req.params.id as string,
        req.body,
      );
      const result = await this._updateVendorUseCase.execute(dto);

      res
        .status(HttpStatus.OK)
        .json(successResponse(result, HubMessages.VENDOR_UPDATED));
    } catch (error) {
      this._logger.error("Update Vendor error", error);
      throw error;
    }
  }

  async getVendorDetails(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Get Vendor Details request received");
      const result = await this._getVendorDetailsUseCase.execute(
        req.params.id as string,
      );

      res.status(HttpStatus.OK).json(successResponse(result));
    } catch (error) {
      this._logger.error("Get Vendor Details error", error);
      throw error;
    }
  }

  async getVendors(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Get Vendors request received");
      const dto = VendorMapper.toGetVendorsRequestDTO(req.query);
      const result = await this._getVendorsUseCase.execute(dto);

      res.status(HttpStatus.OK).json(successResponse(result));
    } catch (error) {
      this._logger.error("Get Vendors error", error);
      throw error;
    }
  }
}
