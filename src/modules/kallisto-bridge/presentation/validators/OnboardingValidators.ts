import { z } from "zod";
import {
  ServiceProviderType,
  OrganisationType,
  ServiceTypes,
  BusinessProofType,
  GovernmentIdType,
  ProfessionalLicenseType,
} from "@packages/common/enums";

// Base Identity Schema
const BaseIdentitySchema = {
  userId: z.string().min(1, "User ID is required"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  profilePicture: z.string().url("Invalid profile picture URL").optional(),
  // serviceProviderId: z.string().min(1, "Service Provider ID is required"),
};

export const AddOrgSPIdentitySchema = z.object({
  ...BaseIdentitySchema,
  spType: z.literal(ServiceProviderType.ORGANISATION),
  organisationType: z.enum(OrganisationType),
  yearOfEstablishment: z.number().int().min(1800).max(new Date().getFullYear()),
});

export const AddProfessionalSPIdentitySchema = z.object({
  ...BaseIdentitySchema,
  spType: z.literal(ServiceProviderType.PROFESSIONAL),
  workingSince: z.number().int().min(1900).max(new Date().getFullYear()),
});

export const AddContractorSPIdentitySchema = z.object({
  ...BaseIdentitySchema,
  spType: z.literal(ServiceProviderType.CONTRACTOR),
  workingSince: z.number().int().min(1900).max(new Date().getFullYear()),
});

// Address
export const AddSPAddressSchema = z.object({
  serviceProviderId: z.string().min(1, "Service Provider ID is required"),
  spType: z.enum(ServiceProviderType),
  officeAddress: z.string().min(5, "Office address is too short"),
  officeEmail: z.email("Invalid office email format"),
  officePhone: z.string().min(8, "Invalid office phone number"),
});

// Services
export const AddSPServicesSchema = z.object({
  serviceProviderId: z.string().min(1, "Service Provider ID is required"),
  spType: z.enum(ServiceProviderType),
  primaryServices: z
    .array(z.enum(ServiceTypes))
    .min(1, "At least one primary service is required"),
  subServices: z.array(z.enum(ServiceTypes)).optional(),
  typicalProjectValue: z.number().optional(),
});

// Service Areas
export const AddSPServiceAreasSchema = z.object({
  serviceProviderId: z.string().min(1, "Service Provider ID is required"),
  serviceAreas: z
    .array(
      z.object({
        city: z.string().min(1, "City is required"),
        isPrimary: z.boolean(),
        centerPoint: z.object({
          lat: z.number().min(-90).max(90),
          lng: z.number().min(-180).max(180),
        }),
        radiusKm: z.number().min(0, "Radius must be positive"),
      }),
    )
    .min(1, "At least one service area is required"),
});

// Credentials
export const AddOrgSPCredentialsSchema = z.object({
  serviceProviderId: z.string().min(1, "Service Provider ID is required"),
  spType: z.literal(ServiceProviderType.ORGANISATION),
  PAN: z.string().length(10, "Invalid PAN length"),
  GSTIN: z.string().optional(),
  businessProofType: z.enum(BusinessProofType),
  businessProofImage: z.string().url("Invalid image URL"),
  governmentIdType: z.enum(GovernmentIdType),
  governmentIdNumber: z.string().min(1, "Government ID is required"),
  insurance: z.record(z.string(), z.any()).optional().or(z.string().optional()),
  professionalLicenseType: z.enum(ProfessionalLicenseType).optional(),
  professionalLicenseNumber: z.string().optional(),
  tradeLicense: z.string().optional(),
});

export const AddProfessionalSPCredentialsSchema = z.object({
  serviceProviderId: z.string().min(1, "Service Provider ID is required"),
  spType: z.literal(ServiceProviderType.PROFESSIONAL),
  PAN: z.string().length(10, "Invalid PAN length"),
  GSTIN: z.string().optional(),
  governmentIdType: z.enum(GovernmentIdType),
  governmentIdNumber: z.string().min(1, "Government ID is required"),
  professionalLicenseType: z.enum(ProfessionalLicenseType).optional(),
  professionalLicenseNumber: z.string().optional(),
});

export const AddContractorSPCredentialsSchema = z.object({
  serviceProviderId: z.string().min(1, "Service Provider ID is required"),
  spType: z.literal(ServiceProviderType.CONTRACTOR),
  PAN: z.string().length(10, "Invalid PAN length"),
  GSTIN: z.string().optional(),
  governmentIdType: z.enum(GovernmentIdType),
  governmentIdNumber: z.string().min(1, "Government ID is required"),
  professionalLicenseType: z.enum(ProfessionalLicenseType).optional(),
  professionalLicenseNumber: z.string().optional(),
});

// Representative
export const AddOrgRepresentativeSchema = z.object({
  serviceProviderId: z.string().min(1, "Service Provider ID is required"),
  spType: z.literal(ServiceProviderType.ORGANISATION),
  representativeName: z.string().min(2, "Name is required"),
  representativeDesignation: z.string().min(2, "Designation is required"),
  representativeGovtIDType: z.enum(GovernmentIdType),
  representativeGovtIDNumber: z.string().min(1, "Government ID is required"),
  representativeGovtIDProof: z
    .url("Invalid proof URL")
    .optional()
    .or(z.string().length(0)),
  representativeMobile: z.string().min(8, "Invalid mobile number"),
});
