import { ServiceProviderType } from "@packages/common/enums";
import {
  BusinessProofType,
  GovernmentIdType,
  OrganisationType,
  ServiceTypes,
  ProfessionalLicenseType,
} from "@packages/database/generated/prisma/enums";

export interface SPProfileUpdateResultDTO {
  serviceProviderId: string;
  spCode: string;
}

export interface AddSPIdentityRequestDTO {
  userId: string;
  displayName: string;
  profilePicture?: string;
  spType: ServiceProviderType;
}

export interface AddOrgExtraIdentityRequestDTO {
  serviceProviderId: string;
  spType: ServiceProviderType;
  brandName?: string;
  brandLogo?: string;
  organisationType: OrganisationType;
  yearOfEstablishment: number;
}

export interface AddAddressRequestDTO {
  serviceProviderId: string;
  spType: ServiceProviderType;
  officeAddress: string;
  officeEmail: string;
  officePhone: string;
}

export interface AddServiceAreaRequestDTO {
  serviceProviderId: string;
  city: string;
  isPrimary: boolean;
  /** GeoJSON-compatible [longitude, latitude] tuple */
  centerPoint: [number, number];
  radiusKm: number;
}

export interface AddServicesRequestDTO {
  serviceProviderId: string;
  spType: ServiceProviderType;
  primaryServices: ServiceTypes[];
  subServices?: ServiceTypes[];
  typicalProjectValue?: number;
}

export interface AddCredentialsRequestDTO {
  serviceProviderId: string;
  spType: ServiceProviderType;
  PAN: string;
  GSTIN?: string;
  governmentIdType: GovernmentIdType;
  governmentIdNumber: string;
  professionalLicenseType?: ProfessionalLicenseType;
  professionalLicenseNumber?: string;
}

export interface AddOrgExtraCredentialsRequestDTO {
  serviceProviderId: string;
  businessProofType: BusinessProofType;
  businessProofImage: string;
  tradeLicense?: string;
  insurance?: string;
}

export interface AddOrgRespresentativeRequestDTO {
  serviceProviderId: string;
  spType: ServiceProviderType;
  representativeName: string;
  representativeDesignation: string;
  representativeMobile: string;
  representativeGovtIDType: GovernmentIdType;
  representativeGovtIDNumber: string;
  representativeGovtIDProof: string;
}

export interface AddProfessionalExtraIdentityRequestDTO {
  serviceProviderId: string;
  spType: ServiceProviderType;
  workingSince: number;
}

export interface AddContractorExtraIdentityRequestDTO {
  serviceProviderId: string;
  spType: ServiceProviderType;
  workingSince: number;
}

export interface UpdateProfileCompletionRequestDTO {
  serviceProviderId: string;
  isIdentityAdded?: boolean;
  isAddressAdded?: boolean;
  isServicesAdded?: boolean;
  isPortfolioAdded?: boolean;
  isCredentialsAdded?: boolean;
  isBankDetailsAdded?: boolean;
  isRepresentativeAdded?: boolean;
}

export interface AddBankDetailsRequestDTO {
  serviceProviderId: string;
  spType: ServiceProviderType;
  financeAccountId?: string;
  accountHolderName: string;
  bankName: string;
  bankBranch: string;
  accountNumber: string; // store encrypted
  IFSCCode: string;
  UPIId?: string;
}
