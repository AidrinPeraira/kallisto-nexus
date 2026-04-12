import { IVendorRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IVendorRepository";
import { IGetVendorsUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/vendor/IGetVendorsUseCase";
import {
  GetVendorsRequestDTO,
  GetVendorsResultDTO,
} from "@src/modules/kallisto-hub/application/dto/VendorDTO";

export class GetVendorsUseCase implements IGetVendorsUseCase {
  constructor(private readonly _vendorRepository: IVendorRepository) {}

  async execute(dto: GetVendorsRequestDTO): Promise<GetVendorsResultDTO> {
    const vendors = await this._vendorRepository.list(dto);

    return {
      vendors: vendors.map((v) => ({
        id: v.id,
        vendorCode: v.vendorCode,
        vendorType: v.vendorType,
        companyName: v.companyName,
        brandName: v.brandName,
        profilePicture: v.profilePicture,
        email: v.email,
        phone: v.phone,
        city: v.city,
        isVerified: v.isVerified,
        isActive: v.isActive,
      })),
      total: vendors.length, // Should ideally come from repository
      page: dto.page || 1,
      limit: dto.limit || 10,
    };
  }
}
