import {
  ProjectScope,
  ProjectType,
} from "@packages/database/generated/prisma/enums";

export interface CreatePortfolioRequestDTO {
  serviceProviderId: string;

  portfolioWebsite?: string;
  isPublic: boolean;
}

export interface CreatePortfolioResponseDTO {
  portfolioId: string;
}

export interface AddPortfolioProjectRequestDTO {
  portfolioId: string;

  //project details
  projectName: string;
  location?: string;
  projectType: ProjectType;
  scope: ProjectScope[];
  completionYear?: number;
  budgetValue?: number;
  budgetCurrency?: string;

  // media
  thumbnailUrl?: string;
  photos: string[];

  // verification
  isKallistoVerified: boolean;

  // testimonial
  testimonialClientName?: string;
  testimonialClientPhone?: string;
  testimonialText?: string;
}

export interface AddPortfolioProjectResponseDTO {}
