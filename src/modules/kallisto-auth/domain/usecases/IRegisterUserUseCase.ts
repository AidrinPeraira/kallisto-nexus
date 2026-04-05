import {
  RegisterUserRequestDTO,
  RegisterUserResult,
} from "@src/modules/kallisto-auth/application/dto/AuthDto";

export interface IRegisterUserUseCase {
  /**
   * Registers a new user with the provided credentials.
   * Returns usercode, email, and message
   * @param dto The user credentials.
   * @param redirectUrl The URL to redirect the user to after successful registration.
   */
  execute(
    dto: RegisterUserRequestDTO,
    redirectUrl?: string,
  ): Promise<RegisterUserResult>;
}
