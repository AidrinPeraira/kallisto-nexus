import { VendorType } from "@packages/common/enums";

export interface VendorResultDTO {
  id: string;
  vendorCode: string;
  vendorType: VendorType;
  companyName: string;
  brandName?: string;
  profilePicture?: string;
  email?: string;
  phone?: string;
  city?: string;
  isVerified: boolean;
  isActive: boolean;
}

export interface VendorDetailsResultDTO extends VendorResultDTO {
  GSTIN?: string;
  officeAddress?: string;
  district?: string;
  state: string;
  pincode?: string;
  country: string;
  website?: string;
  representativeName?: string;
  representativePhone?: string;
  whatsappNumber?: string;
  financeAccountId?: string;
  accountHolderName?: string;
  bankName?: string;
  bankBranch?: string;
  accountNumber?: string;
  IFSCCode?: string;
  UPIId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateVendorRequestDTO {
  vendorType: VendorType;
  companyName: string;
  GSTIN?: string;
  brandName?: string;
  email: string;
  phone?: string;
  officeAddress?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export interface UpdateVendorRequestDTO {
  id: string;
  companyName?: string;
  brandName?: string;
  profilePicture?: string;
  officeAddress?: string;
  city?: string;
  district?: string;
  state?: string;
  pincode?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  representativeName?: string;
  representativePhone?: string;
  whatsappNumber?: string;
  isActive?: boolean;
}

export interface GetVendorsRequestDTO {
  vendorType?: VendorType;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GetVendorsResultDTO {
  vendors: VendorResultDTO[];
  total: number;
  page: number;
  limit: number;
}
