import { VendorEntity } from "@src/modules/kallisto-hub/domain/entities/VendorEntity";

export interface IVendorRepository {
  /**
   * Creates a new vendor record.
   * @param vendor The vendor entity to persist.
   * @returns The created vendor.
   */
  create(vendor: VendorEntity): Promise<VendorEntity>;

  /**
   * Finds a vendor by their internal UUID.
   * @param id The UUID of the vendor.
   * @returns The vendor if found, null otherwise.
   */
  findById(id: string): Promise<VendorEntity | null>;

  /**
   * Finds a vendor by their unique human-readable vendor code (e.g. "VEN-1001").
   * @param vendorCode The vendor code string.
   * @returns The vendor if found, null otherwise.
   */
  findByVendorCode(vendorCode: string): Promise<VendorEntity | null>;

  /**
   * Finds a vendor by their official email address.
   * @param email The email address of the vendor.
   * @returns The vendor if found, null otherwise.
   */
  findByEmail(email: string): Promise<VendorEntity | null>;

  /**
   * Updates a vendor's top-level fields.
   * @param vendor The updated vendor entity (partial).
   * @returns The updated vendor.
   */
  update(vendor: Partial<VendorEntity>): Promise<VendorEntity>;

  /**
   * Deletes a vendor record by ID.
   * @param id The UUID of the vendor to delete.
   */
  delete(id: string): Promise<void>;

  /**
   * Lists all vendors, potentially filtered by certain criteria.
   * @param filters Optional filtering criteria.
   * @returns A list of vendors.
   */
  list(filters?: any): Promise<VendorEntity[]>;
}
