import { VendorType } from "@packages/common/enums";

// ─── SUB-ENTITY: Hub Service Area ──────────────────────────────────────────────

export interface HubServiceAreaEntity {
  id: string;
  vendorId: string;

  city: string;
  isPrimary: boolean;
  /** GeoJSON-compatible [longitude, latitude] tuple */
  centerPoint: [number, number];
  radiusKm: number;

  createdAt: Date;
  updatedAt: Date;
}

// ─── ROOT ENTITY: Vendor ──────────────────────────────────────────────────────

export interface VendorEntity {
  id: string;
  vendorCode: string;
  vendorType: VendorType;

  // identity
  companyName: string;
  GSTIN?: string;
  brandName?: string;
  profilePicture?: string;

  // bank details
  financeAccountId?: string;
  accountHolderName?: string;
  bankName?: string;
  bankBranch?: string;
  accountNumber?: string;
  IFSCCode?: string;
  UPIId?: string;

  // address
  officeAddress?: string;
  city?: string;
  district?: string;
  state: string;
  pincode?: string;
  country: string;

  // contact
  phone?: string;
  email?: string;
  website?: string;
  representativeName?: string;
  representativePhone?: string;
  contactNumber?: string;
  whatsappNumber?: string;

  // meta
  isVerified: boolean;
  isActive: boolean;
  logoUrl?: string;
  notes?: string;
  metadata?: any;

  createdAt: Date;
  updatedAt: Date;

  // relations
  hubServiceAreas?: HubServiceAreaEntity[];
}
