import { IPortfolioProjectRepository } from "@src/modules/kallisto-bridge/application/interfaces/repositories/portfolio/IPortfolioProjectRepository";
import { PortfolioProjectEntity } from "@src/modules/kallisto-bridge/domain/entities/PortfolioEntity";
import { prisma } from "@packages/config/prisma";
import { ProjectType, ProjectScope } from "@packages/database/generated/prisma/enums";

export class PrismaPortfolioProjectRepository
  implements IPortfolioProjectRepository
{
  async create(
    project: PortfolioProjectEntity,
  ): Promise<PortfolioProjectEntity> {
    const created = await prisma.bridge_PortfolioProject.create({
      data: {
        portfolioId: project.portfolioId,
        projectName: project.projectName,
        location: project.location,
        projectType: project.projectType as ProjectType,
        scope: project.scope as ProjectScope[],
        completionYear: project.completionYear,
        budgetValue: project.budgetValue,
        budgetCurrency: project.budgetCurrency,
        thumbnailUrl: project.thumbnailUrl,
        photos: project.photos,
        isKallistoVerified: project.isKallistoVerified,
        testimonialClientName: project.testimonialClientName,
        testimonialClientPhone: project.testimonialClientPhone,
        testimonialText: project.testimonialText,
      },
    });

    return this.mapToDomain(created);
  }

  async findById(id: string): Promise<PortfolioProjectEntity | null> {
    const project = await prisma.bridge_PortfolioProject.findUnique({
      where: { id },
    });

    if (!project) return null;
    return this.mapToDomain(project);
  }

  async findAllByPortfolioId(
    portfolioId: string,
  ): Promise<PortfolioProjectEntity[]> {
    const projects = await prisma.bridge_PortfolioProject.findMany({
      where: { portfolioId },
    });

    return projects.map((p) => this.mapToDomain(p));
  }

  async update(
    project: PortfolioProjectEntity,
  ): Promise<PortfolioProjectEntity> {
    const updated = await prisma.bridge_PortfolioProject.update({
      where: { id: project.id },
      data: {
        projectName: project.projectName,
        location: project.location,
        projectType: project.projectType as ProjectType,
        scope: project.scope as ProjectScope[],
        completionYear: project.completionYear,
        budgetValue: project.budgetValue,
        budgetCurrency: project.budgetCurrency,
        thumbnailUrl: project.thumbnailUrl,
        photos: project.photos,
        isKallistoVerified: project.isKallistoVerified,
        testimonialClientName: project.testimonialClientName,
        testimonialClientPhone: project.testimonialClientPhone,
        testimonialText: project.testimonialText,
      },
    });

    return this.mapToDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.bridge_PortfolioProject.delete({
      where: { id },
    });
  }

  private mapToDomain(prismaProject: any): PortfolioProjectEntity {
    return {
      id: prismaProject.id,
      portfolioId: prismaProject.portfolioId,
      projectName: prismaProject.projectName,
      location: prismaProject.location || undefined,
      projectType: prismaProject.projectType,
      scope: prismaProject.scope,
      completionYear: prismaProject.completionYear || undefined,
      budgetValue: prismaProject.budgetValue || undefined,
      budgetCurrency: prismaProject.budgetCurrency || undefined,
      thumbnailUrl: prismaProject.thumbnailUrl || undefined,
      photos: prismaProject.photos,
      isKallistoVerified: prismaProject.isKallistoVerified,
      testimonialClientName: prismaProject.testimonialClientName || undefined,
      testimonialClientPhone: prismaProject.testimonialClientPhone || undefined,
      testimonialText: prismaProject.testimonialText || undefined,
      createdAt: prismaProject.createdAt,
      updatedAt: prismaProject.updatedAt,
    };
  }
}
