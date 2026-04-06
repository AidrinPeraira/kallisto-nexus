import { UserEntity } from "@src/modules/kallisto-auth/domain/entities/UserEntity";

export interface IUserRepository {
  /**
   * Creates a new user in the database.
   * @param user The user to create.
   * @returns The created user.
   */
  create(user: UserEntity): Promise<UserEntity>;

  /**
   * Finds a user by their ID.
   * @param id The ID of the user to find.
   * @returns The user if found, null otherwise.
   */
  findById(id: string): Promise<UserEntity | null>;

  /**
   * Finds a user by their email.
   * @param email The email of the user to find.
   * @returns The user if found, null otherwise.
   */
  findByEmail(email: string): Promise<UserEntity | null>;

  /**
   * Finds a user by their user code.
   * @param userCode The user code of the user to find.
   * @returns The user if found, null otherwise.
   */
  findByUserCode(userCode: string): Promise<UserEntity | null>;

  /**
   * Updates an existing user in the database.
   * @param user The user to update.
   * @returns The updated user.
   */
  update(user: UserEntity): Promise<UserEntity>;

  /**
   * Deletes a user from the database.
   * @param id The ID of the user to delete.
   */
  delete(id: string): Promise<void>;
}
