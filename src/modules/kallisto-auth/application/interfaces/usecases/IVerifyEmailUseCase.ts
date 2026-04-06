import { VerifyEmailRequestDTO } from "@src/modules/kallisto-auth/application/dto/AuthDto";

export interface IVerifyEmailUseCase {
  execute(request: VerifyEmailRequestDTO): Promise<void>;
}
