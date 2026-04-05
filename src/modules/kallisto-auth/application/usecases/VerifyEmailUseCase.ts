import { VerifyEmailRequestDTO } from "@src/modules/kallisto-auth/application/dto/AuthDto";
import { IAuthService } from "@src/modules/kallisto-auth/domain/services/IAuthService";
import { IVerifyEmailUseCase } from "@src/modules/kallisto-auth/domain/usecases/IVerifyEmailUseCase";

export class VerifyEmailUseCase implements IVerifyEmailUseCase {
  constructor(private readonly _authService: IAuthService) {}

  async execute(request: VerifyEmailRequestDTO): Promise<void> {
    await this._authService.verifyEmail(request.token);
  }
}
