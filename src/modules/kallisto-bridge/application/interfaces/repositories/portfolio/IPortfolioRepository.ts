import { PortfolioEntity } from "@src/modules/kallisto-bridge/domain/entities/PortfolioEntity";

export interface IPortfolioRepository {
  /**
   * Creates a new portfolio for a service provider.
   * Each service provider can have at most one portfolio (1-1 relation).
   * @param portfolio The portfolio entity to persist.
   * @returns The created portfolio.
   */
  create(portfolio: PortfolioEntity): Promise<PortfolioEntity>;

  /**
   * Finds a portfolio by its internal UUID.
   * @param id The UUID of the portfolio.
   * @returns The portfolio if found, null otherwise.
   */
  findById(id: string): Promise<PortfolioEntity | null>;

  /**
   * Finds the portfolio belonging to a specific service provider.
   * This is the primary lookup — portfolios are always resolved from an SP context.
   * @param serviceProviderId The UUID of the service provider.
   * @returns The portfolio if found, null otherwise.
   */
  findByServiceProviderId(serviceProviderId: string): Promise<PortfolioEntity | null>;

  /**
   * Updates portfolio-level settings (e.g. website URL, public visibility toggle).
   * Individual projects are managed via IPortfolioProjectRepository.
   * @param portfolio The updated portfolio entity.
   * @returns The updated portfolio.
   */
  update(portfolio: PortfolioEntity): Promise<PortfolioEntity>;

  /**
   * Deletes a portfolio by ID.
   * Note: cascading deletion of associated projects should be handled at the DB level.
   * @param id The UUID of the portfolio to delete.
   */
  delete(id: string): Promise<void>;
}
