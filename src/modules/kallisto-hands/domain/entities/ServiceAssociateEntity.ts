import {
  HandsAssociateType,
  ServiceAssociateStatus,
  SkillTypes,
  GovernmentIdType,
} from "@packages/common/enums";

// ─── SUB-ENTITY: Contractor Profile ───────────────────────────────────────────

export interface HandsContractorProfileEntity {
  id: string;
  serviceAssociateId: string;

  workerCount?: number;
  workingSince?: number;
}

// ─── SUB-ENTITY: Worker Profile ───────────────────────────────────────────────

export interface HandsWorkerProfileEntity {
  id: string;
  serviceAssociateId: string;

  contractorId?: string;
  workingSince?: number;
  wagePerDay?: number;
}

// ─── SUB-ENTITY: Service Area ─────────────────────────────────────────────────

export interface HandsServiceAreaEntity {
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

// ─── ROOT ENTITY: Service Associate ───────────────────────────────────────────

export interface ServiceAssociateEntity {
  id: string;
  userId: string;
  saCode: string;
  saType: HandsAssociateType;

  // identity
  displayName: string;
  profilePicture?: string;
  isIdentityAdded: boolean;

  // address
  address?: string;
  email?: string;
  phone?: string;
  isAddressAdded: boolean;

  // skills
  primarySkill?: SkillTypes;
  subSkills: SkillTypes[];
  isSkillsAdded: boolean;

  // credentials
  governmentIdType?: GovernmentIdType;
  governmentIdNumber?: string;
  PAN?: string;
  isCredentialsAdded: boolean;

  // bank details
  financeAccountId?: string;
  maskedAccountNumber?: string;
  bankName?: string;
  isBankDetailsAdded: boolean;

  status: ServiceAssociateStatus;
  createdAt: Date;
  updatedAt: Date;

  // relations
  serviceAreas?: HandsServiceAreaEntity[];
  contractorProfile?: HandsContractorProfileEntity;
  workerProfile?: HandsWorkerProfileEntity;
}
