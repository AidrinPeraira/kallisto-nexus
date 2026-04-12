import {
  GetVendorsRequestDTO,
  GetVendorsResultDTO,
} from "@src/modules/kallisto-hub/application/dto/VendorDTO";

export interface IGetVendorsUseCase {
  /**
   * Retrieves a paginated list of vendors with filtering and search.
   * @param dto The query parameters.
   */
  execute(dto: GetVendorsRequestDTO): Promise<GetVendorsResultDTO>;
}
