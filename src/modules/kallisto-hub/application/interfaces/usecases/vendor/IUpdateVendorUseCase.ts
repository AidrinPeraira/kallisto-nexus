import {
  UpdateVendorRequestDTO,
  VendorResultDTO,
} from "@src/modules/kallisto-hub/application/dto/VendorDTO";

export interface IUpdateVendorUseCase {
  /**
   * Updates an existing vendor's details.
   * @param dto The vendor update data.
   */
  execute(dto: UpdateVendorRequestDTO): Promise<VendorResultDTO>;
}
