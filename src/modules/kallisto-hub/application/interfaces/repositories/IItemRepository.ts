import { ItemEntity } from "@src/modules/kallisto-hub/domain/entities/ItemEntity";

export interface IItemRepository {
  /**
   * Creates a new item (material blueprint).
   * @param item The item entity to persist.
   * @returns The created item.
   */
  create(item: ItemEntity): Promise<ItemEntity>;

  /**
   * Finds an item by its internal UUID.
   * @param id The UUID of the item.
   * @returns The item if found, null otherwise.
   */
  findById(id: string): Promise<ItemEntity | null>;

  /**
   * Finds an item by its unique human-readable item code (e.g. "ITM-1001").
   * @param itemCode The item code string.
   * @returns The item if found, null otherwise.
   */
  findByItemCode(itemCode: string): Promise<ItemEntity | null>;

  /**
   * Lists all items, potentially filtered by category or other criteria.
   * @param filters Optional filtering criteria.
   * @returns A list of items.
   */
  findAll(filters?: any): Promise<ItemEntity[]>;

  /**
   * Updates an item's configuration.
   * @param item The updated item entity (partial).
   * @returns The updated item.
   */
  update(item: Partial<ItemEntity>): Promise<ItemEntity>;

  /**
   * Deletes an item record by ID.
   * @param id The UUID of the item to delete.
   */
  delete(id: string): Promise<void>;
}
