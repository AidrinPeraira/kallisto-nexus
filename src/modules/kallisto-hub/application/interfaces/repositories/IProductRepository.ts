import { ProductEntity } from "@src/modules/kallisto-hub/domain/entities/ProductEntity";

export interface IProductRepository {
  /**
   * Creates a new vendor product listing.
   * @param product The product entity to persist.
   * @returns The created product.
   */
  create(product: ProductEntity): Promise<ProductEntity>;

  /**
   * Finds a product listing by its internal UUID.
   * @param id The UUID of the product.
   * @returns The product if found, null otherwise.
   */
  findById(id: string): Promise<ProductEntity | null>;

  /**
   * Finds a product listing by its unique code (VP-...).
   * @param productCode The product code.
   * @returns The product if found, null otherwise.
   */
  findByProductCode(productCode: string): Promise<ProductEntity | null>;

  /**
   * Lists all products belonging to a specific vendor.
   * @param vendorId The UUID of the vendor.
   * @returns A list of products.
   */
  findByVendorId(vendorId: string): Promise<ProductEntity[]>;

  /**
   * Lists all products for a specific item (material).
   * @param itemId The UUID of the item.
   * @returns A list of products.
   */
  findByItemId(itemId: string): Promise<ProductEntity[]>;

  /**
   * Updates a product listing.
   * @param product The updated product entity (partial).
   * @returns The updated product.
   */
  update(product: Partial<ProductEntity>): Promise<ProductEntity>;

  /**
   * Deletes a product listing by ID.
   * @param id The UUID of the product to delete.
   */
  delete(id: string): Promise<void>;

  /**
   * Lists all products across all vendors with pagination/filtering.
   * @param filters Filtering/Pagination criteria.
   */
  list(filters?: any): Promise<any[]>;
}
