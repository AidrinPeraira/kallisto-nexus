import {
  AddOrgExtraIdentityRequestDTO,
  SPProfileUpdateResultDTO,
} from "@src/modules/kallisto-bridge/application/dto/usecases/ServiceProviderDTO";

/**
 * This interface is used to update the organisation identity of a service provider.
 * - it updates the fields and sets the identity added flag to true
 * - it validates the service provider type is org and service provider id exists before adding the data
 */
export interface IAddOrgExtraIdentityUseCase {
  execute(
    dto: AddOrgExtraIdentityRequestDTO,
  ): Promise<SPProfileUpdateResultDTO>;
}
