import {
  AddPortfolioProjectRequestDTO,
  CreatePortfolioRequestDTO,
  CreatePortfolioResponseDTO,
} from "@src/modules/kallisto-bridge/application/dto/usecases/PortfolioDTO";

/**
 * this usecase is used to create a portfolio for a service provider
 * it is called together with add portfolio project to initially create a portfolio
 */
export interface CreatePortfolioUseCase {
  execute(
    request: CreatePortfolioRequestDTO & AddPortfolioProjectRequestDTO,
  ): Promise<CreatePortfolioResponseDTO>;
}
