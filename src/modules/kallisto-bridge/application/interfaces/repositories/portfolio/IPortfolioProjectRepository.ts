import { PortfolioProjectEntity } from "@src/modules/kallisto-bridge/domain/entities/PortfolioEntity";

export interface IPortfolioProjectRepository {
  /**
   * Adds a new project entry to an existing portfolio.
   * @param project The portfolio project entity to persist.
   * @returns The created portfolio project.
   */
  create(project: PortfolioProjectEntity): Promise<PortfolioProjectEntity>;

  /**
   * Finds a single portfolio project by its UUID.
   * @param id The UUID of the portfolio project.
   * @returns The project if found, null otherwise.
   */
  findById(id: string): Promise<PortfolioProjectEntity | null>;

  /**
   * Retrieves all projects belonging to a given portfolio.
   * @param portfolioId The UUID of the parent portfolio.
   * @returns A list of portfolio projects (may be empty).
   */
  findAllByPortfolioId(portfolioId: string): Promise<PortfolioProjectEntity[]>;

  /**
   * Updates an existing portfolio project (e.g. edit details, add photos, update testimonial).
   * @param project The updated portfolio project entity.
   * @returns The updated portfolio project.
   */
  update(project: PortfolioProjectEntity): Promise<PortfolioProjectEntity>;

  /**
   * Removes a portfolio project by its UUID.
   * @param id The UUID of the project to delete.
   */
  delete(id: string): Promise<void>;
}
