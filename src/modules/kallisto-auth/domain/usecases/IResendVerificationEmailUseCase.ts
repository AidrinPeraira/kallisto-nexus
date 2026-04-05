import { ResendVerificationEmailRequestDTO } from "@src/modules/kallisto-auth/application/dto/AuthDto";

export interface IResendVerificationEmailUseCase {
  execute(request: ResendVerificationEmailRequestDTO): Promise<void>;
}
