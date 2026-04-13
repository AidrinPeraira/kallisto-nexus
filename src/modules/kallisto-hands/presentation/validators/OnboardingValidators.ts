import { z } from "zod";
import {
  HandsAssociateType,
  SkillTypes,
  GovernmentIdType,
} from "@packages/common/enums";

const BaseIdentitySchema = {
  userId: z.string().min(1, "User ID is required"),
  displayName: z.string().min(2, "Display name must be at least 2 characters"),
  profilePicture: z.url("Invalid profile picture URL").optional(),
};

export const AddSAIdentitySchema = z.object({
  ...BaseIdentitySchema,
  saType: z.enum([HandsAssociateType.CONTRACTOR, HandsAssociateType.WORKER]),
});

export const AddSAAddressSchema = z.object({
  serviceAssociateId: z.string().min(1, "Service Associate ID is required"),
  saType: z.enum([HandsAssociateType.CONTRACTOR, HandsAssociateType.WORKER]),
  address: z.string().min(5, "Address is too short"),
  email: z.email("Invalid email format"),
  phone: z.string().min(8, "Invalid phone number"),
});

export const AddSASkillsSchema = z.object({
  serviceAssociateId: z.string().min(1, "Service Associate ID is required"),
  saType: z.enum([HandsAssociateType.CONTRACTOR, HandsAssociateType.WORKER]),
  primarySkill: z.enum(SkillTypes as any),
  subSkills: z
    .array(z.enum(SkillTypes as any))
    .min(1, "At least one sub-skill is required"),
});

export const AddSAContractorServicesSchema = z.object({
  serviceAssociateId: z.string().min(1, "Service Associate ID is required"),
  workerCount: z.number().int().min(0),
  workingSince: z.number().int().min(1900).max(new Date().getFullYear()),
});

export const AddSAWorkerServicesSchema = z.object({
  serviceAssociateId: z.string().min(1, "Service Associate ID is required"),
  contractorId: z.string().optional(),
  workingSince: z.number().int().min(1900).max(new Date().getFullYear()),
  wagePerDay: z.number().min(0),
});

export const AddSACredentialsSchema = z.object({
  serviceAssociateId: z.string().min(1, "Service Associate ID is required"),
  saType: z.enum([HandsAssociateType.CONTRACTOR, HandsAssociateType.WORKER]),
  PAN: z.string().length(10, "Invalid PAN length"),
  governmentIdType: z.enum(GovernmentIdType as any),
  governmentIdNumber: z.string().min(1, "Government ID is required"),
});

export const AddSABankDetailsSchema = z.object({
  serviceAssociateId: z.string().min(1, "Service Associate ID is required"),
  saType: z.enum([HandsAssociateType.CONTRACTOR, HandsAssociateType.WORKER]),
  accountHolderName: z.string().min(2, "Account holder name is required"),
  bankName: z.string().min(2, "Bank name is required"),
  bankBranch: z.string().min(2, "Bank branch is required"),
  accountNumber: z.string().min(8, "Invalid account number"),
  IFSCCode: z.string().min(11, "Invalid IFSC code").max(11),
  UPIId: z.string().optional(),
});

export const AddSAServiceAreasSchema = z.object({
  serviceAssociateId: z.string().min(1, "Service Associate ID is required"),
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
