import { Request, Response } from "express";
import { ILogger } from "@packages/logger";
import { successResponse } from "@packages/common/responses";
import { HttpStatus } from "@packages/common/enums";
import { ItemMapper } from "../mapper/ItemMapper";
import { HubMessages } from "@packages/common/messages";
import { IItemController } from "@src/modules/kallisto-hub/presentation/interfaces/IItemController";
import { ICreateItemUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/item/ICreateItemUseCase";
import { IUpdateItemUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/item/IUpdateItemUseCase";
import { IGetItemsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/item/IGetItemsUseCase";

export class ItemController implements IItemController {
  constructor(
    private readonly _logger: ILogger,
    private readonly _createItemUseCase: ICreateItemUseCase,
    private readonly _updateItemUseCase: IUpdateItemUseCase,
    private readonly _getItemsUseCase: IGetItemsUseCase,
  ) {}

  async createItem(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Create Item request received");
      const dto = ItemMapper.toCreateItemRequestDTO(req.body);
      const result = await this._createItemUseCase.execute(dto);

      res
        .status(HttpStatus.CREATED)
        .json(successResponse(result, HubMessages.ITEM_CREATED));
    } catch (error) {
      this._logger.error("Create Item error", error);
      throw error;
    }
  }

  async updateItem(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Update Item request received");
      const dto = ItemMapper.toUpdateItemRequestDTO(
        req.params.id as string,
        req.body,
      );
      const result = await this._updateItemUseCase.execute(dto);

      res
        .status(HttpStatus.OK)
        .json(successResponse(result, HubMessages.ITEM_UPDATED));
    } catch (error) {
      this._logger.error("Update Item error", error);
      throw error;
    }
  }

  async getItems(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Get Items request received");
      const dto = ItemMapper.toGetItemsRequestDTO(req.query);
      const result = await this._getItemsUseCase.execute(dto);

      res.status(HttpStatus.OK).json(successResponse(result));
    } catch (error) {
      this._logger.error("Get Items error", error);
      throw error;
    }
  }
}
