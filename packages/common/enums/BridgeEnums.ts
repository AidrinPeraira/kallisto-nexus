export enum ServiceProviderType {
  ORGANISATION = "organisation",
  PROFESSIONAL = "professional",
  CONTRACTOR = "contractor",
}

export enum ServiceProviderStatus {
  ONBOARDING = "onboarding",
  VERIFICATION_PENDING = "verification_pending",
  REJECTED = "rejected",
  ACTIVE = "active",
  SUSPENDED = "suspended",
  DELETED = "deleted",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
}

export enum ServiceTypes {
  ARCHITECTURE = "architecture",
  INTERIOR_DESIGN = "interior_design",
  CONSTRUCTION_CONTRACTING = "construction_contracting",
}

export enum OrganisationType {
  PARTNERSHIP_FIRM = "partnership_firm",
  PRIVATE_LIMITED_COMPANY = "private_limited_company",
  PUBLIC_LIMITED_COMPANY = "public_limited_company",
  LIMITED_LIABILITY_PARTNERSHIP = "limited_liability_partnership",
  ONE_PERSON_COMPANY = "one_person_company",
}

export enum BusinessProofType {
  GST_CERTIFICATE = "gst_certificate",
  MSME_CERTIFICATE = "msme_certificate",
  PARTNERSHIP_DEED = "partnership_deed",
  LLP_REGISTRATION = "llp_registration",
  CIN_CERTIFICATE = "cin_certificate",
}

export enum GovernmentIdType {
  AADHAAR = "aadhaar",
  PASSPORT = "passport",
  VOTER_ID = "voter_id",
}

export enum ProfessionalLicenseType {
  COA_LICENSE = "coa_license",
  PWD_CONTRACTOR = "pwd_contractor",
  MCCI_LICENSE = "mcci_license",
  OTHER = "other",
}
