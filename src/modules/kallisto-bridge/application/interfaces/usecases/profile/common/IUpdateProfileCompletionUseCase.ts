import { UpdateProfileCompletionRequestDTO } from "@src/modules/kallisto-bridge/application/dto/ServiceProviderDTO";

export interface IUpdateProfileCompletionUseCase {
  execute(dto: UpdateProfileCompletionRequestDTO): Promise<void>;
}
