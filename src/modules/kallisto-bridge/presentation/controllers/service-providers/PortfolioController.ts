import { Request, Response } from "express";
import { PortfolioController as IPortfolioController } from "@src/modules/kallisto-bridge/presentation/interfaces/IPortfolioController";
import { CreatePortfolioUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/portfolio/ICreatePortfolioUseCase";
import { AddPortfolioProjectUseCase } from "@src/modules/kallisto-bridge/application/interfaces/usecases/portfolio/IAddPortfolioProjectUseCase";
import { ILogger } from "@packages/logger";
import { PortfolioMapper } from "@src/modules/kallisto-bridge/presentation/mapper/PortfolioMapper";
import { HttpStatus } from "@packages/common/enums";
import { successResponse } from "@packages/common/responses";
import { ProfileMessages } from "@packages/common/messages";

export class PortfolioController implements IPortfolioController {
  constructor(
    private readonly _logger: ILogger,
    private readonly _createPortfolioUseCase: CreatePortfolioUseCase,
    private readonly _addPortfolioProjectUseCase: AddPortfolioProjectUseCase,
  ) {}

  async createPortfolio(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Create Portfolio request received");

      const data = PortfolioMapper.toCreatePortfolioRequestDTO(req.body);

      const result = await this._createPortfolioUseCase.execute(data);

      res
        .status(HttpStatus.CREATED)
        .json(
          successResponse(result, ProfileMessages.PORTFOLIO_CREATED),
        );
    } catch (error: unknown) {
      this._logger.error("Create Portfolio Error: ", error);
      throw error;
    }
  }

  async addPortfolioProject(req: Request, res: Response): Promise<void> {
    try {
      this._logger.info("Add Portfolio Project request received");

      const data = PortfolioMapper.toAddPortfolioProjectRequestDTO(req.body);

      await this._addPortfolioProjectUseCase.execute(data);

      res
        .status(HttpStatus.OK)
        .json(
          successResponse(
            { portfolioId: data.portfolioId },
            ProfileMessages.PROJECT_ADDED,
          ),
        );
    } catch (error: unknown) {
      this._logger.error("Add Portfolio Project Error: ", error);
      throw error;
    }
  }
}
