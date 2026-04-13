import {
  AddSAIdentityRequestDTO,
  SAProfileUpdateResultDTO,
} from "@src/modules/kallisto-hands/application/dto/usecases/ServiceAssociateDTO";

export interface IAddSAIdentityUseCase {
  execute(dto: AddSAIdentityRequestDTO): Promise<SAProfileUpdateResultDTO>;
}
