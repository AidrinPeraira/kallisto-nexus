import { ResendVerificationEmailRequestDTO } from "@src/modules/kallisto-auth/application/dto/AuthDto";
import { IAuthService } from "@src/modules/kallisto-auth/domain/services/IAuthService";
import { IResendVerificationEmailUseCase } from "@src/modules/kallisto-auth/domain/usecases/IResendVerificationEmailUseCase";

export class ResendVerificationEmailUseCase implements IResendVerificationEmailUseCase {
  constructor(private readonly _authService: IAuthService) {}

  async execute(request: ResendVerificationEmailRequestDTO): Promise<void> {
    //add code to check if we have a user registered with this email

    await this._authService.resendVerificationEmail(request.email);
  }
}
