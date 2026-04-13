// Repositories
import { PrismaServiceAssociateRepository } from "@src/modules/kallisto-hands/infrastructure/repositories/profile/PrismaServiceAssociateRepository";
import { PrismaHandsContractorProfileRepository } from "@src/modules/kallisto-hands/infrastructure/repositories/profile/PrismaHandsContractorProfileRepository";
import { PrismaHandsWorkerProfileRepository } from "@src/modules/kallisto-hands/infrastructure/repositories/profile/PrismaHandsWorkerProfileRepository";
import { PrismaHandsServiceAreaRepository } from "@src/modules/kallisto-hands/infrastructure/repositories/profile/PrismaHandsServiceAreaRepository";

// UseCases
import { AddSAIdentityUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/common/AddSAIdentityUseCase";
import { AddSAAddressUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/common/AddSAAddressUseCase";
import { AddSACredentialsUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/common/AddSACredentialsUseCase";
import { AddSABankDetailsUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/common/AddSABankDetailsUseCase";
import { AddSAServiceAreaUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/common/AddSAServiceAreaUseCase";
import { GetServiceAssociateProfileUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/common/GetServiceAssociateProfileUseCase";
import { UpdateStatusUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/common/UpdateStatusUseCase";
import { AddSAContractorSkillsUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/contractor/AddSAContractorSkillsUseCase";
import { AddSAContractorServicesUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/contractor/AddSAContractorServicesUseCase";
import { AddSAWorkerSkillsUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/worker/AddSAWorkerSkillsUseCase";
import { AddSAWorkerServicesUseCase } from "@src/modules/kallisto-hands/application/usecases/profile/worker/AddSAWorkerServicesUseCase";

// Controller
import { OnboardingController } from "@src/modules/kallisto-hands/presentation/controllers/OnboardingController";

import { WinstonLogger } from "@packages/logger";

export function createHandsModule() {
  const logger = new WinstonLogger();

  // 1. Repositories
  const prismaSARepo = new PrismaServiceAssociateRepository();
  const prismaContractorRepo = new PrismaHandsContractorProfileRepository();
  const prismaWorkerRepo = new PrismaHandsWorkerProfileRepository();
  const prismaServiceAreaRepo = new PrismaHandsServiceAreaRepository();

  // 2. UseCases
  const addSAIdentityUseCase = new AddSAIdentityUseCase(prismaSARepo);
  const addSAAddressUseCase = new AddSAAddressUseCase(prismaSARepo);
  const addSACredentialsUseCase = new AddSACredentialsUseCase(prismaSARepo);
  const addSABankDetailsUseCase = new AddSABankDetailsUseCase(prismaSARepo);
  const addSAServiceAreaUseCase = new AddSAServiceAreaUseCase(prismaServiceAreaRepo);
  const getSAProfileUseCase = new GetServiceAssociateProfileUseCase(prismaSARepo);
  const updateStatusUseCase = new UpdateStatusUseCase(prismaSARepo);

  const addSAContractorSkillsUseCase = new AddSAContractorSkillsUseCase(prismaSARepo);
  const addSAContractorServicesUseCase = new AddSAContractorServicesUseCase(prismaContractorRepo);
  const addSAWorkerSkillsUseCase = new AddSAWorkerSkillsUseCase(prismaSARepo);
  const addSAWorkerServicesUseCase = new AddSAWorkerServicesUseCase(prismaWorkerRepo);

  // 3. Controller
  const onboardingController = new OnboardingController(
    logger,
    addSAIdentityUseCase,
    addSAAddressUseCase,
    addSAContractorSkillsUseCase,
    addSAContractorServicesUseCase,
    addSAWorkerSkillsUseCase,
    addSAWorkerServicesUseCase,
    addSACredentialsUseCase,
    addSABankDetailsUseCase,
    addSAServiceAreaUseCase,
    getSAProfileUseCase,
    updateStatusUseCase,
  );

  return {
    onboardingController,
  };
}
