import {
  HandsAssociateType,
  SkillTypes,
  GovernmentIdType,
} from "@packages/common/enums";

export interface SAProfileUpdateResultDTO {
  serviceAssociateId: string;
  saCode: string;
}

export interface AddSAIdentityRequestDTO {
  userId: string;
  displayName: string;
  profilePicture?: string;
  saType: HandsAssociateType;
}

export interface AddSAAddressRequestDTO {
  serviceAssociateId: string;
  saType: HandsAssociateType;
  address: string;
  email: string;
  phone: string;
}

export interface AddSAServiceAreaRequestDTO {
  serviceAssociateId: string;
  city: string;
  isPrimary: boolean;
  /** GeoJSON-compatible [longitude, latitude] tuple */
  centerPoint: [number, number];
  radiusKm: number;
}

export interface AddSACredentialsRequestDTO {
  serviceAssociateId: string;
  saType: HandsAssociateType;
  PAN: string;
  governmentIdType: GovernmentIdType;
  governmentIdNumber: string;
}

export interface AddSABankDetailsRequestDTO {
  serviceAssociateId: string;
  saType: HandsAssociateType;
  financeAccountId?: string;
  accountHolderName: string;
  bankName: string;
  bankBranch: string;
  accountNumber: string;
  IFSCCode: string;
  UPIId?: string;
}

export interface AddSASkillsRequestDTO {
  serviceAssociateId: string;
  saType: HandsAssociateType;
  primarySkill: SkillTypes;
  subSkills: SkillTypes[];
}

export interface AddSAContractorServicesRequestDTO {
  serviceAssociateId: string;
  workerCount: number;
  workingSince: number;
}

export interface AddSAWorkerServicesRequestDTO {
  serviceAssociateId: string;
  contractorId?: string;
  workingSince: number;
  wagePerDay: number;
}

export interface UpdateSAProfileCompletionRequestDTO {
  serviceAssociateId: string;
  isIdentityAdded?: boolean;
  isAddressAdded?: boolean;
  isSkillsAdded?: boolean;
  isCredentialsAdded?: boolean;
  isBankDetailsAdded?: boolean;
}
