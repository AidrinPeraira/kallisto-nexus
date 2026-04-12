import { VendorType } from "@packages/common/enums";
import {
  CreateVendorRequestDTO,
  UpdateVendorRequestDTO,
  GetVendorsRequestDTO,
} from "@src/modules/kallisto-hub/application/dto/VendorDTO";

export class VendorMapper {
  static toCreateVendorRequestDTO(body: any): CreateVendorRequestDTO {
    return {
      vendorType: body.vendorType as VendorType,
      companyName: body.companyName,
      GSTIN: body.GSTIN,
      brandName: body.brandName,
      profilePicture: body.profilePicture,
      email: body.email,
      phone: body.phone,
      officeAddress: body.officeAddress,
      city: body.city,
      district: body.district,
      state: body.state,
      pincode: body.pincode,
      country: body.country,
      website: body.website,
      representativeName: body.representativeName,
      representativePhone: body.representativePhone,
      whatsappNumber: body.whatsappNumber,
      financeAccountId: body.financeAccountId,
      accountHolderName: body.accountHolderName,
      bankName: body.bankName,
      bankBranch: body.bankBranch,
      accountNumber: body.accountNumber,
      IFSCCode: body.IFSCCode,
      UPIId: body.UPIId,
      notes: body.notes,
    };
  }

  static toUpdateVendorRequestDTO(
    id: string,
    body: any,
  ): UpdateVendorRequestDTO {
    return {
      id,
      companyName: body.companyName,
      GSTIN: body.GSTIN,
      brandName: body.brandName,
      profilePicture: body.profilePicture,
      email: body.email,
      phone: body.phone,
      officeAddress: body.officeAddress,
      city: body.city,
      district: body.district,
      state: body.state,
      pincode: body.pincode,
      country: body.country,
      website: body.website,
      representativeName: body.representativeName,
      representativePhone: body.representativePhone,
      whatsappNumber: body.whatsappNumber,
      financeAccountId: body.financeAccountId,
      accountHolderName: body.accountHolderName,
      bankName: body.bankName,
      bankBranch: body.bankBranch,
      accountNumber: body.accountNumber,
      IFSCCode: body.IFSCCode,
      UPIId: body.UPIId,
      notes: body.notes,
      isActive: body.isActive,
      isVerified: body.isVerified,
    };
  }

  static toGetVendorsRequestDTO(query: any): GetVendorsRequestDTO {
    return {
      page: query.page ? parseInt(query.page as string) : 1,
      limit: query.limit ? parseInt(query.limit as string) : 10,
      search: query.search as string,
      vendorType: query.vendorType as VendorType,
    };
  }
}
