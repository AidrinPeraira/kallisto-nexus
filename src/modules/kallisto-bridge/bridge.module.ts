// Repositories
import { PrismaServiceProviderRepository } from "@src/modules/kallisto-bridge/infrastructure/repositories/profile/PrismaServiceProviderRepository";
import { PrismaOrganisationProfileRepository } from "@src/modules/kallisto-bridge/infrastructure/repositories/profile/PrismaOrganisationProfileRepository";
import { PrismaProfessionalProfileRepository } from "@src/modules/kallisto-bridge/infrastructure/repositories/profile/PrismaProfessionalProfileRepository";
import { PrismaContractorProfileRepository } from "@src/modules/kallisto-bridge/infrastructure/repositories/profile/PrismaContractorProfileRepository";
import { PrismaServiceAreaRepository } from "@src/modules/kallisto-bridge/infrastructure/repositories/profile/PrismaServiceAreaRepository";
import { PrismaPortfolioRepository } from "@src/modules/kallisto-bridge/infrastructure/repositories/portfolio/PrismaPortfolioRepository";
import { PrismaPortfolioProjectRepository } from "@src/modules/kallisto-bridge/infrastructure/repositories/portfolio/PrismaPortfolioProjectRepository";

// UseCases
import { AddSPIdentityUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/common/AddSPIdentityUseCase";
import { AddOrgExtraIdentityUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/oragnisation/AddOrgExtraIdentityUseCase";
import { AddProfessionalExtraIdentityUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/professional/AddProfessionalExtraIdentityUseCase";
import { AddContractorExtraIdentityUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/contractor/AddContractorExtraIdentityUseCase";

import { AddSPAddressUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/common/AddSPAddressUseCase";
import { AddSPServiceUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/common/AddSPServiceUseCase";
import { AddSPServiceAreaUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/common/AddSPServiceAreaUseCase";

import { AddSPCredentialsUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/common/AddSPCredentialsUseCase";
import { AddOrgExtraCredentialsUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/oragnisation/AddOrgExtraCredentialsUseCase";

import { AddOrgRepresentativeUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/oragnisation/AddOrgRepresentativeUseCase";

import { UpdateProfileCompletionUseCase } from "@src/modules/kallisto-bridge/application/usecases/profile/common/UpdateProfileCompletionUseCase";
import { CreatePortfolioUseCase } from "@src/modules/kallisto-bridge/application/usecases/portfolio/CreatePortfolioUseCase";
import { AddPortfolioProjectUseCase } from "@src/modules/kallisto-bridge/application/usecases/portfolio/AddPortfolioProjectUseCase";

// Controller
import { OnboardingController } from "@src/modules/kallisto-bridge/presentation/controllers/service-providers/OnboardingController";
import { PortfolioController } from "@src/modules/kallisto-bridge/presentation/controllers/service-providers/PortfolioController";

import { WinstonLogger } from "@packages/logger";

export function createBridgeModule() {
  const logger = new WinstonLogger();

  // 1. Repositories
  const prismaSPRepo = new PrismaServiceProviderRepository();
  const prismaOrgRepo = new PrismaOrganisationProfileRepository();
  const prismaProfRepo = new PrismaProfessionalProfileRepository();
  const prismaContractorRepo = new PrismaContractorProfileRepository();
  const prismaServiceAreaRepo = new PrismaServiceAreaRepository();
  const prismaPortfolioRepo = new PrismaPortfolioRepository();
  const prismaPortfolioProjectRepo = new PrismaPortfolioProjectRepository();

  // 2. UseCases
  const addSPIdentityUseCase = new AddSPIdentityUseCase(prismaSPRepo);
  const addOrgExtraIdentityUseCase = new AddOrgExtraIdentityUseCase(
    prismaOrgRepo,
    prismaSPRepo,
  );
  const addProfessionalExtraIdentityUseCase =
    new AddProfessionalExtraIdentityUseCase(prismaProfRepo, prismaSPRepo);
  const addContractorExtraIdentityUseCase =
    new AddContractorExtraIdentityUseCase(prismaContractorRepo, prismaSPRepo);

  const addSPAddressUseCase = new AddSPAddressUseCase(prismaSPRepo);
  const addSPServicesUseCase = new AddSPServiceUseCase(prismaSPRepo);
  const addSPServiceAreaUseCase = new AddSPServiceAreaUseCase(
    prismaServiceAreaRepo,
    prismaSPRepo,
  );

  const addSPCredentialsUseCase = new AddSPCredentialsUseCase(prismaSPRepo);
  const addOrgExtraCredentialsUseCase = new AddOrgExtraCredentialsUseCase(
    prismaOrgRepo,
    prismaSPRepo,
  );

  const addOrgRepresentativeUseCase = new AddOrgRepresentativeUseCase(
    prismaOrgRepo,
    prismaSPRepo,
  );

  const updateProfileCompletionUseCase = new UpdateProfileCompletionUseCase(
    prismaSPRepo,
  );

  const createPortfolioUseCase = new CreatePortfolioUseCase(
    prismaPortfolioRepo,
    prismaPortfolioProjectRepo,
    prismaSPRepo,
  );
  const addPortfolioProjectUseCase = new AddPortfolioProjectUseCase(
    prismaPortfolioProjectRepo,
    prismaPortfolioRepo,
  );

  // 3. Controller
  const onboardingController = new OnboardingController(
    logger,
    addSPIdentityUseCase,
    addOrgExtraIdentityUseCase,
    addProfessionalExtraIdentityUseCase,
    addContractorExtraIdentityUseCase,

    addSPAddressUseCase,
    addSPServicesUseCase, // This maps to `IAddServicesUseCase` parameter
    addSPServiceAreaUseCase,

    addSPCredentialsUseCase,
    addOrgExtraCredentialsUseCase,

    addOrgRepresentativeUseCase,

    updateProfileCompletionUseCase,
  );

  const portfolioController = new PortfolioController(
    logger,
    createPortfolioUseCase,
    addPortfolioProjectUseCase,
    updateProfileCompletionUseCase,
  );

  return {
    onboardingController,
    portfolioController,
  };
}
