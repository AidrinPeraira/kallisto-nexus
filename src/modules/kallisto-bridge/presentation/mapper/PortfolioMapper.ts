import {
  AddPortfolioProjectRequestDTO,
  CreatePortfolioRequestDTO,
} from "@src/modules/kallisto-bridge/application/dto/usecases/PortfolioDTO";

export class PortfolioMapper {
  static toCreatePortfolioRequestDTO(
    body: any,
  ): CreatePortfolioRequestDTO & AddPortfolioProjectRequestDTO {
    return {
      serviceProviderId: body.serviceProviderId,
      portfolioId: "", // Not used during initial creation but required by DTO type
      portfolioWebsite: body.portfolioWebsite,

      isPublic: body.isPublic ?? false,
      projectName: body.projectName,
      location: body.location,
      projectType: body.projectType,
      scope: body.scope,
      completionYear: body.completionYear,
      budgetValue: body.budgetValue,
      budgetCurrency: body.budgetCurrency,
      thumbnailUrl: body.thumbnailUrl,
      photos: body.photos || [],
      isKallistoVerified: body.isKallistoVerified ?? false,
      testimonialClientName: body.testimonialClientName,
      testimonialClientPhone: body.testimonialClientPhone,
      testimonialText: body.testimonialText,
    };
  }

  static toAddPortfolioProjectRequestDTO(body: any): AddPortfolioProjectRequestDTO {
    return {
      portfolioId: body.portfolioId,
      projectName: body.projectName,
      location: body.location,
      projectType: body.projectType,
      scope: body.scope,
      completionYear: body.completionYear,
      budgetValue: body.budgetValue,
      budgetCurrency: body.budgetCurrency,
      thumbnailUrl: body.thumbnailUrl,
      photos: body.photos || [],
      isKallistoVerified: body.isKallistoVerified ?? false,
      testimonialClientName: body.testimonialClientName,
      testimonialClientPhone: body.testimonialClientPhone,
      testimonialText: body.testimonialText,
    };
  }
}
