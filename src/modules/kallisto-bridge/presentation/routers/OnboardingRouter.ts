import { validate } from "@packages/common/middleware";
import { IOnboardingController } from "@src/modules/kallisto-bridge/presentation/interfaces/IOnboardingController";
import { Router } from "express";
import {
  AddOrgSPIdentitySchema,
  AddProfessionalSPIdentitySchema,
  AddContractorSPIdentitySchema,
  AddSPAddressSchema,
  AddSPServicesSchema,
  AddSPServiceAreasSchema,
  AddOrgSPCredentialsSchema,
  AddProfessionalSPCredentialsSchema,
  AddContractorSPCredentialsSchema,
  AddOrgRepresentativeSchema,
  AddSPBankDetailsSchema,
} from "@src/modules/kallisto-bridge/presentation/validators/OnboardingValidators";

export function createOnboardingRoutes(
  onboardingController: IOnboardingController,
) {
  const router = Router();

  // ----- Identity -----
  router.post(
    "/sp-org/identity",
    validate(AddOrgSPIdentitySchema),
    onboardingController.addOrgSPIdentity.bind(onboardingController),
  );

  router.post(
    "/sp-professional/identity",
    validate(AddProfessionalSPIdentitySchema),
    onboardingController.addProfessionalSPIdentity.bind(onboardingController),
  );

  router.post(
    "/sp-contractor/identity",
    validate(AddContractorSPIdentitySchema),
    onboardingController.addContractorSPIdentity.bind(onboardingController),
  );

  // ----- Address -----
  router.post(
    "/sp-org/address",
    validate(AddSPAddressSchema),
    onboardingController.addSPAddress.bind(onboardingController),
  );

  router.post(
    "/sp-professional/address",
    validate(AddSPAddressSchema),
    onboardingController.addSPAddress.bind(onboardingController),
  );

  router.post(
    "/sp-contractor/address",
    validate(AddSPAddressSchema),
    onboardingController.addSPAddress.bind(onboardingController),
  );

  // ----- Services -----
  router.post(
    "/sp-org/services",
    validate(AddSPServicesSchema),
    onboardingController.addSPServices.bind(onboardingController),
  );

  router.post(
    "/sp-professional/services",
    validate(AddSPServicesSchema),
    onboardingController.addSPServices.bind(onboardingController),
  );

  router.post(
    "/sp-contractor/services",
    validate(AddSPServicesSchema),
    onboardingController.addSPServices.bind(onboardingController),
  );

  // ----- Service Areas -----

  router.post(
    "/sp-org/service-areas",
    validate(AddSPServiceAreasSchema),
    onboardingController.addSPServiceAreas.bind(onboardingController),
  );

  router.post(
    "/sp-professional/service-areas",
    validate(AddSPServiceAreasSchema),
    onboardingController.addSPServiceAreas.bind(onboardingController),
  );

  router.post(
    "/sp-contractor/service-areas",
    validate(AddSPServiceAreasSchema),
    onboardingController.addSPServiceAreas.bind(onboardingController),
  );

  // ----- Credentials -----
  router.post(
    "/sp-org/credentials",
    validate(AddOrgSPCredentialsSchema),
    onboardingController.addOrgSPCredentials.bind(onboardingController),
  );

  router.post(
    "/sp-professional/credentials",
    validate(AddProfessionalSPCredentialsSchema),
    onboardingController.addProfessionalSPCredentials.bind(
      onboardingController,
    ),
  );

  router.post(
    "/sp-contractor/credentials",
    validate(AddContractorSPCredentialsSchema),
    onboardingController.addContractorSPCredentials.bind(onboardingController),
  );

  // ----- Representative -----
  router.post(
    "/sp-org/representative",
    validate(AddOrgRepresentativeSchema),
    onboardingController.addOrgRepresentative.bind(onboardingController),
  );

  //--- bank account details
  router.post(
    "/sp-org/bank-details",
    validate(AddSPBankDetailsSchema),
    onboardingController.addSPBankDetails.bind(onboardingController),
  );

  router.post(
    "/sp-professional/bank-details",
    validate(AddSPBankDetailsSchema),
    onboardingController.addSPBankDetails.bind(onboardingController),
  );

  router.post(
    "/sp-contractor/bank-details",
    validate(AddSPBankDetailsSchema),
    onboardingController.addSPBankDetails.bind(onboardingController),
  );

  return router;
}
