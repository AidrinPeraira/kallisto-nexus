export interface AddBankDetailsFacadeRequestDTO {
  serviceProviderId: string;
  accountHolderName: string;
  bankName: string;
  bankBranch: string;
  accountNumber: string;
  IFSCCode: string;
  UPIId?: string;
  GSTNumber?: string;
  isGSTLinked: boolean;
  cancelledChequeUrl?: string;
}

export interface AddBankDetailsFacadeResponseDTO {
  paymentReferenceId: string;
}
