import { z } from "zod";
import { VendorType } from "@packages/common/enums";

export const CreateVendorSchema = z.object({
  vendorType: z.enum(VendorType),
  companyName: z.string().min(2, "Company name is required"),
  GSTIN: z.string().length(15, "Invalid GSTIN length").optional(),
  brandName: z.string().optional(),
  profilePicture: z.url("Invalid profile picture URL").optional(),
  email: z.email("Invalid email format"),
  phone: z.string().min(10, "Phone number is too short").optional(),
  officeAddress: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  state: z.string().min(2, "State is required"),
  pincode: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  website: z.url().optional(),
  representativeName: z.string().optional(),
  representativePhone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  financeAccountId: z.string().optional(),
  accountHolderName: z.string().optional(),
  bankName: z.string().optional(),
  bankBranch: z.string().optional(),
  accountNumber: z.string().optional(),
  IFSCCode: z.string().length(11, "Invalid IFSC code length").optional(),
  UPIId: z.string().optional(),
  notes: z.string().optional(),
});

export const UpdateVendorSchema = CreateVendorSchema.partial().extend({
  isActive: z.boolean().optional(),
  isVerified: z.boolean().optional(),
});
