import { AddOrgExtraCredentialsRequestDTO } from "@src/modules/kallisto-bridge/application/dto/ServiceProviderDTO";

/**
 * @description
 * - it adds the extra credentials to the organisation profile
 * - it validates the service provider type is org and service provider id exists before adding the data
 */
export interface IAddOrgExtraCredentialsUseCase {
  execute(dto: AddOrgExtraCredentialsRequestDTO): Promise<void>;
}
