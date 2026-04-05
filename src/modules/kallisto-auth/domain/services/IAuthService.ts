export interface IAuthService {
  /**
   * Signs up a new user.
   * @param name The name of the user.
   * @param email The email of the user.
   * @param password The password of the user.
   * @returns The created user.
   */
  signUp(
    name: string,
    email: string,
    password: string,
    redirectUrl?: string,
  ): Promise<{
    authId: string;
  }>;

  /**
   * Signs in a user with the provided credentials.
   * @param email The email of the user.
   * @param password The password of the user.
   */
  signIn(
    email: string,
    password: string,
  ): Promise<{
    token: string;
  }>;

  /**
   * Verifies the email of a user.
   * @param token The token to verify the email.
   */
  verifyEmail(token: string): Promise<void>;

  /**
   * Resends the verification email to the user.
   * @param email The email of the user.
   */
  resendVerificationEmail(email: string): Promise<void>;

  /**
   * Refreshes the session of a user.
   * @param sessionToken The session token of the user.
   */
  refreshSession(sessionToken: string): Promise<string>;
}
