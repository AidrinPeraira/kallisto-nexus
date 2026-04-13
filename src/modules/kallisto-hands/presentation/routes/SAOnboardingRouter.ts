import { validate } from "@packages/common/middleware";
import { IOnboardingController } from "@src/modules/kallisto-hands/presentation/interfaces/IOnboardingController";
import { Router } from "express";
import {
  AddSAIdentitySchema,
  AddSAAddressSchema,
  AddSASkillsSchema,
  AddSAContractorServicesSchema,
  AddSAWorkerServicesSchema,
  AddSACredentialsSchema,
  AddSABankDetailsSchema,
  AddSAServiceAreasSchema,
} from "@src/modules/kallisto-hands/presentation/validators/OnboardingValidators";

export function createOnboardingRoutes(
  onboardingController: IOnboardingController,
) {
  const router = Router();

  // ----- Identity -----
  router.post(
    "/onboarding/identity/contractor",
    validate(AddSAIdentitySchema),
    onboardingController.addContractorSAIdentity.bind(onboardingController),
  );

  router.post(
    "/onboarding/identity/worker",
    validate(AddSAIdentitySchema),
    onboardingController.addWorkerSAIdentity.bind(onboardingController),
  );

  // ----- Address -----
  router.post(
    "/onboarding/address/contractor",
    validate(AddSAAddressSchema),
    onboardingController.addSAAddress.bind(onboardingController),
  );

  router.post(
    "/onboarding/address/worker",
    validate(AddSAAddressSchema),
    onboardingController.addSAAddress.bind(onboardingController),
  );


  // ----- Skills & Services -----
  router.post(
    "/onboarding/skills/contractor",
    validate(AddSASkillsSchema.and(AddSAContractorServicesSchema)),
    onboardingController.addContractorSASkills.bind(onboardingController),
  );

  router.post(
    "/onboarding/skills/worker",
    validate(AddSASkillsSchema.and(AddSAWorkerServicesSchema)),
    onboardingController.addWorkerSASkills.bind(onboardingController),
  );

  // ----- Credentials -----
  router.post(
    "/onboarding/credentials/contractor",
    validate(AddSACredentialsSchema),
    onboardingController.addSACredentials.bind(onboardingController),
  );

  router.post(
    "/onboarding/credentials/worker",
    validate(AddSACredentialsSchema),
    onboardingController.addSACredentials.bind(onboardingController),
  );

  // ----- Bank Details -----
  router.post(
    "/onboarding/bank-details/contractor",
    validate(AddSABankDetailsSchema),
    onboardingController.addSABankDetails.bind(onboardingController),
  );

  router.post(
    "/onboarding/bank-details/worker",
    validate(AddSABankDetailsSchema),
    onboardingController.addSABankDetails.bind(onboardingController),
  );

  // ----- Service Areas -----
  router.post(
    "/onboarding/service-areas/contractor",
    validate(AddSAServiceAreasSchema),
    onboardingController.addSAServiceAreas.bind(onboardingController),
  );

  router.post(
    "/onboarding/service-areas/worker",
    validate(AddSAServiceAreasSchema),
    onboardingController.addSAServiceAreas.bind(onboardingController),
  );

  // ----- Profile Retrieval -----
  router.get(
    "/profile",
    onboardingController.getSAProfile.bind(onboardingController),
  );

  return router;
}
