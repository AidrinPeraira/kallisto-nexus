import { IVendorRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IVendorRepository";
import { IGetVendorDetailsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/vendor/IGetVendorDetailsUseCase";
import { VendorDetailsResultDTO } from "@src/modules/kallisto-hub/application/dto/VendorDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HubMessages } from "@packages/common/messages";
import { HttpStatus } from "@packages/common/enums";

export class GetVendorDetailsUseCase implements IGetVendorDetailsUseCase {
  constructor(private readonly _vendorRepository: IVendorRepository) {}

  async execute(id: string): Promise<VendorDetailsResultDTO> {
    const vendor = await this._vendorRepository.findById(id);
    if (!vendor) {
      throw new AppError(
        ErrorCode.VENDOR_NOT_FOUND,
        HubMessages.VENDOR_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      id: vendor.id,
      vendorCode: vendor.vendorCode,
      vendorType: vendor.vendorType,
      companyName: vendor.companyName,
      brandName: vendor.brandName,
      profilePicture: vendor.profilePicture,
      email: vendor.email,
      phone: vendor.phone,
      city: vendor.city,
      district: vendor.district,
      state: vendor.state,
      pincode: vendor.pincode,
      country: vendor.country,
      isVerified: vendor.isVerified,
      isActive: vendor.isActive,
      GSTIN: vendor.GSTIN,
      officeAddress: vendor.officeAddress,
      website: vendor.website,
      representativeName: vendor.representativeName,
      representativePhone: vendor.representativePhone,
      whatsappNumber: vendor.whatsappNumber,
      financeAccountId: vendor.financeAccountId,
      accountHolderName: vendor.accountHolderName,
      bankName: vendor.bankName,
      bankBranch: vendor.bankBranch,
      accountNumber: vendor.accountNumber,
      IFSCCode: vendor.IFSCCode,
      UPIId: vendor.UPIId,
      notes: vendor.notes,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
    };
  }
}
