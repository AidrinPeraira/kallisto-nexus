import { AddPortfolioProjectRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/PortfolioDTO";

/**
 * this usecase is used to add a project to a portfolio of SP
 */
export interface AddPortfolioProjectUseCase {
  execute(request: AddPortfolioProjectRequestDTO): Promise<void>;
}
