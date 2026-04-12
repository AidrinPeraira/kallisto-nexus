import { IVendorRepository } from "@src/modules/kallisto-hub/application/interfaces/repositories/IVendorRepository";
import { IUpdateVendorUseCase } from "@src/modules/kallisto-hub/application/interfaces/usecases/vendor/IUpdateVendorUseCase";
import {
  UpdateVendorRequestDTO,
  VendorResultDTO,
} from "@src/modules/kallisto-hub/application/dto/VendorDTO";
import { AppError, ErrorCode } from "@packages/common/errors";
import { HubMessages } from "@packages/common/messages";
import { HttpStatus } from "@packages/common/enums";

export class UpdateVendorUseCase implements IUpdateVendorUseCase {
  constructor(private readonly _vendorRepository: IVendorRepository) {}

  async execute(dto: UpdateVendorRequestDTO): Promise<VendorResultDTO> {
    // 1. Find vendor
    const existing = await this._vendorRepository.findById(dto.id);
    if (!existing) {
      throw new AppError(
        ErrorCode.VENDOR_NOT_FOUND,
        HubMessages.VENDOR_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // 2. Update and save
    const updated = await this._vendorRepository.update(dto);

    // 3. Map to result
    return {
      id: updated.id,
      vendorCode: updated.vendorCode,
      vendorType: updated.vendorType,
      companyName: updated.companyName,
      brandName: updated.brandName,
      profilePicture: updated.profilePicture,
      email: updated.email,
      phone: updated.phone,
      city: updated.city,
      isVerified: updated.isVerified,
      isActive: updated.isActive,
    };
  }
}
