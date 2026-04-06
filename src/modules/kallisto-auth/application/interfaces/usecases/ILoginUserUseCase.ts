import {
  LoginUserRequestDTO,
  LoginUserResult,
} from "@src/modules/kallisto-auth/application/dto/AuthDto";

export interface ILoginUserUseCase {
  /**
   * Logs in a user with the provided credentials.
   * Returns token
   * @param dto The user credentials.
   */
  execute(dto: LoginUserRequestDTO): Promise<LoginUserResult>;
}
