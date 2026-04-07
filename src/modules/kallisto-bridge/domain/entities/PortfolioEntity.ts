// ─── SUB-ENTITY: Portfolio Project ────────────────────────────────────────────

export interface PortfolioProjectEntity {
  id: string;
  portfolioId: string;

  // project info
  projectName: string;
  location?: string;
  projectType: string; // e.g. Residential | Commercial | Industrial | Hospitality
  scope: string[]; // e.g. Structure | Interior | MEP | Landscape
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

  createdAt: Date;
  updatedAt: Date;
}

// ─── ROOT ENTITY: Portfolio ────────────────────────────────────────────────────

export interface PortfolioEntity {
  id: string;
  serviceProviderId: string;

  portfolioWebsite?: string;
  isPublic: boolean;

  createdAt: Date;
  updatedAt: Date;

  // relations (optional — populated when fetched with includes)
  projects?: PortfolioProjectEntity[];
}
