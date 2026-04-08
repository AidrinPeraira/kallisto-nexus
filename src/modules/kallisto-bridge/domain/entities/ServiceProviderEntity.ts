import {
  BusinessProofType,
  GovernmentIdType,
  OrganisationType,
  ServiceProviderStatus,
  ServiceProviderType,
  ServiceTypes,
} from "@packages/common/enums";

// ─── SUB-ENTITY: Organisation Profile ─────────────────────────────────────────

export interface OrganisationProfileEntity {
  id: string;
  serviceProviderId: string;

  // org specific identity
  brandName?: string;
  brandLogo?: string;
  organisationType?: OrganisationType;
  yearOfEstablishment?: number;

  // org-specific credentials
  businessProofType?: BusinessProofType;
  businessProofImage?: string;
  tradeLicense?: string;
  insurance?: string;

  // representative
  representativeName?: string;
  representativeDesignation?: string;
  representativeMobile?: string;
  representativeGovtIDType?: GovernmentIdType;
  representativeGovtIDNumber?: string;
  representativeGovtIDProof?: string;
}

// ─── SUB-ENTITY: Professional Profile ─────────────────────────────────────────

export interface ProfessionalProfileEntity {
  id: string;
  serviceProviderId: string;

  //identity
  workingSince?: number; // years of experience
}

// ─── SUB-ENTITY: Contractor Profile ───────────────────────────────────────────

export interface ContractorProfileEntity {
  id: string;
  serviceProviderId: string;

  //identity
  workingSince?: number;
}

// ─── SUB-ENTITY: Service Area ─────────────────────────────────────────────────

export interface ServiceAreaEntity {
  id: string;
  serviceProviderId: string;

  city: string;
  isPrimary: boolean;
  /** GeoJSON-compatible [longitude, latitude] tuple */
  centerPoint: [number, number];
  radiusKm: number;

  createdAt: Date;
  updatedAt: Date;
}

// ─── ROOT ENTITY: Service Provider ────────────────────────────────────────────

export interface ServiceProviderEntity {
  id: string;
  spCode: string;

  // identity
  userId: string;
  displayName: string;
  profilePicture?: string;
  spType: ServiceProviderType;

  // address
  officeAddress?: string;
  officeEmail?: string;
  officePhone?: string;

  // services
  primaryServices?: ServiceTypes[];
  subServices?: ServiceTypes[];
  typicalProjectValue?: number;

  // credentials
  PAN?: string;
  GSTIN?: string;
  governmentIdType?: GovernmentIdType;
  governmentIdNumber?: string;
  professionalLicenseType?: string;
  professionalLicenseNumber?: string;

  // bank details
  financeAccountId?: string;
  maskedAccountNumber?: string;
  bankName?: string;

  // portfolio reference
  portfolioId?: string;

  // completion flags
  isIdentityAdded: boolean;
  isAddressAdded: boolean;
  isServicesAdded: boolean;
  isPortfolioAdded: boolean;
  isCredentialsAdded: boolean;
  isBankDetailsAdded: boolean;
  isRepresentativeAdded: boolean;

  status: ServiceProviderStatus;
  createdAt: Date;
  updatedAt: Date;

  // relations (optional — populated when fetched with includes)
  serviceAreas?: ServiceAreaEntity[];
  organisationProfile?: OrganisationProfileEntity;
  professionalProfile?: ProfessionalProfileEntity;
  contractorProfile?: ContractorProfileEntity;
}
