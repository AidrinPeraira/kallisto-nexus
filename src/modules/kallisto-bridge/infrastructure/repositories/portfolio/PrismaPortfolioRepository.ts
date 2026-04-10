import { IPortfolioRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/portfolio/IPortfolioRepository";
import { PortfolioEntity } from "@src/modules/kallisto-bridge/domain/entities/PortfolioEntity";
import { prisma } from "@packages/config/prisma";

export class PrismaPortfolioRepository implements IPortfolioRepository {
  async create(portfolio: PortfolioEntity): Promise<PortfolioEntity> {
    const created = await prisma.bridge_Portfolio.create({
      data: {
        serviceProviderId: portfolio.serviceProviderId,
        portfolioWebsite: portfolio.portfolioWebsite,
        isPublic: portfolio.isPublic,
      },
    });

    return this.mapToDomain(created);
  }

  async findById(id: string): Promise<PortfolioEntity | null> {
    const portfolio = await prisma.bridge_Portfolio.findUnique({
      where: { id },
      include: { projects: true },
    });

    if (!portfolio) return null;
    return this.mapToDomain(portfolio);
  }

  async findByServiceProviderId(
    serviceProviderId: string,
  ): Promise<PortfolioEntity | null> {
    const portfolio = await prisma.bridge_Portfolio.findUnique({
      where: { serviceProviderId },
      include: { projects: true },
    });

    if (!portfolio) return null;
    return this.mapToDomain(portfolio);
  }

  async update(portfolio: PortfolioEntity): Promise<PortfolioEntity> {
    const updated = await prisma.bridge_Portfolio.update({
      where: { id: portfolio.id },
      data: {
        portfolioWebsite: portfolio.portfolioWebsite,
        isPublic: portfolio.isPublic,
      },
    });

    return this.mapToDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.bridge_Portfolio.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaPortfolio: any): PortfolioEntity {
    return {
      id: prismaPortfolio.id,
      serviceProviderId: prismaPortfolio.serviceProviderId,
      portfolioWebsite: prismaPortfolio.portfolioWebsite || undefined,
      isPublic: prismaPortfolio.isPublic,
      createdAt: prismaPortfolio.createdAt,
      updatedAt: prismaPortfolio.updatedAt,
      projects: prismaPortfolio.projects ? prismaPortfolio.projects.map((p: any) => ({
        id: p.id,
        portfolioId: p.portfolioId,
        projectName: p.projectName,
        location: p.location || undefined,
        projectType: p.projectType,
        scope: p.scope,
        completionYear: p.completionYear || undefined,
        budgetValue: p.budgetValue || undefined,
        budgetCurrency: p.budgetCurrency || undefined,
        thumbnailUrl: p.thumbnailUrl || undefined,
        photos: p.photos,
        isKallistoVerified: p.isKallistoVerified,
        testimonialClientName: p.testimonialClientName || undefined,
        testimonialClientPhone: p.testimonialClientPhone || undefined,
        testimonialText: p.testimonialText || undefined,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })) : undefined,
    };
  }
}
