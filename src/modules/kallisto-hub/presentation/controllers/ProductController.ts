import { Request, Response } from "express";
import { ILogger } from "@packages/logger";
import { successResponse } from "@packages/common/responses";
import { HttpStatus } from "@packages/common/enums";
import { HubMessages } from "@packages/common/messages";
import { IProductController } from "@src/modules/kallisto-hub/presentation/interfaces/IProductController";
import { IAddVendorProductUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/products/IAddVendorProductUseCase";
import { IUpdateVendorProductUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/products/IUpdateVendorProductUseCase";
import { IGetVendorProductsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/products/IGetVendorProductsUseCase";
import { IGetProductsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/products/IGetProductsUseCase";
import { ProductMapper } from "@src/modules/kallisto-hub/presentation/mapper/ProductMapper";

export class ProductController implements IProductController {
  constructor(
    private readonly _logger: ILogger,
    private readonly _addVendorProductUseCase: IAddVendorProductUseCase,
    private readonly _updateVendorProductUseCase: IUpdateVendorProductUseCase,
    private readonly _getVendorProductsUseCase: IGetVendorProductsUseCase,
    private readonly _getProductsUseCase: IGetProductsUseCase,
  ) {}

  async addVendorProduct(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Vendor Product request received");
      const dto = ProductMapper.toAddVendorProductRequestDTO(req.body);
      const result = await this._addVendorProductUseCase.execute(dto);

      res
        .status(HttpStatus.CREATED)
        .json(successResponse(result, HubMessages.PRODUCT_CREATED));
    } catch (error) {
      this._logger.error("Add Vendor Product error", error);
      throw error;
    }
  }

  async updateVendorProduct(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Update Vendor Product request received");
      const dto = ProductMapper.toUpdateVendorProductRequestDTO(
        req.params.id as string,
        req.body,
      );
      const result = await this._updateVendorProductUseCase.execute(dto);

      res
        .status(HttpStatus.OK)
        .json(successResponse(result, HubMessages.PRODUCT_UPDATED));
    } catch (error) {
      this._logger.error("Update Vendor Product error", error);
      throw error;
    }
  }

  async getVendorProducts(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Get Vendor Products request received");
      const dto = ProductMapper.toGetVendorProductsRequestDTO(
        req.params.vendorId as string,
        req.query,
      );
      const result = await this._getVendorProductsUseCase.execute(dto);

      res.status(HttpStatus.OK).json(successResponse(result));
    } catch (error) {
      this._logger.error("Get Vendor Products error", error);
      throw error;
    }
  }

  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Get Products request received");
      const dto = ProductMapper.toGetProductsRequestDTO(req.query);
      const result = await this._getProductsUseCase.execute(dto);

      res.status(HttpStatus.OK).json(successResponse(result));
    } catch (error) {
      this._logger.error("Get Products error", error);
      throw error;
    }
  }
}
