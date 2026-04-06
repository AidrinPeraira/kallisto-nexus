export interface IEmailService {
  /**
   * Sends an email verification to the user.
   * @param email The email of the user.
   * @param verificationUrl The URL to verify the email.
   */
  sendEmailVerification(email: string, verificationUrl: string): Promise<void>;

  /**
   * Sends a password reset to the user.
   * @param email The email of the user.
   * @param resetUrl The URL to reset the password.
   */
  sendPasswordReset(email: string, resetUrl: string): Promise<void>;
}
