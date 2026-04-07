import { UpdateProfileCompletionRequestDTO } from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

export interface IUpdateProfileCompletionUseCase {
  execute(dto: UpdateProfileCompletionRequestDTO): Promise<void>;
}
