-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- custom code sequences
CREATE SEQUENCE IF NOT EXISTS app_user_code_seq START WITH 1000;
CREATE SEQUENCE IF NOT EXISTS app_sab_code_seq START WITH 1000;
CREATE SEQUENCE IF NOT EXISTS app_sp_code_seq START WITH 1000;
CREATE SEQUENCE IF NOT EXISTS app_sah_code_seq START WITH 1000;

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('project_owner', 'sp_organization', 'sp_professional', 'sp_contractor', 'sa_contractor', 'sa_worker', 'system_admin');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'suspended', 'deleted');

-- CreateEnum
CREATE TYPE "ServiceProviderType" AS ENUM ('organisation', 'professional', 'contractor');

-- CreateEnum
CREATE TYPE "ServiceProviderStatus" AS ENUM ('onboarding', 'verification_pending', 'rejected', 'active', 'suspended', 'deleted', 'inactive', 'blocked');

-- CreateEnum
CREATE TYPE "ServiceTypes" AS ENUM ('architecture', 'interior_design', 'construction_contracting');

-- CreateEnum
CREATE TYPE "SkillTypes" AS ENUM ('mason', 'plumber', 'electrician', 'painter', 'carpenter', 'welder', 'tiler', 'plasterer', 'glazier', 'landscaper');

-- CreateEnum
CREATE TYPE "OrganisationType" AS ENUM ('partnership_firm', 'private_limited_company', 'public_limited_company', 'limited_liability_partnership', 'one_person_company');

-- CreateEnum
CREATE TYPE "BusinessProofType" AS ENUM ('gst_certificate', 'msme_certificate', 'partnership_deed', 'llp_registration', 'cin_certificate');

-- CreateEnum
CREATE TYPE "GovernmentIdType" AS ENUM ('aadhaar', 'passport', 'voter_id');

-- CreateEnum
CREATE TYPE "BasicsAssociateType" AS ENUM ('organisation', 'individual');

-- CreateEnum
CREATE TYPE "HandsAssociateType" AS ENUM ('contractor', 'worker');

-- CreateEnum
CREATE TYPE "ServiceAssociateStatus" AS ENUM ('onboarding', 'verification_pending', 'rejected', 'active', 'suspended', 'inactive', 'blocked', 'deleted');

-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('residential', 'commercial', 'industrial', 'hospitality', 'institutional');

-- CreateEnum
CREATE TYPE "ProjectScope" AS ENUM ('structure', 'interior', 'mep', 'landscape', 'facade');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_user" (
    "id" TEXT NOT NULL,
    "authId" TEXT NOT NULL,
    "userCode" TEXT NOT NULL DEFAULT concat('USR-', nextval('app_user_code_seq')),
    "email" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "role" "UserRole" NOT NULL,
    "profilePic" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'active',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "basics_service_associate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "saCode" TEXT NOT NULL DEFAULT concat('SA-B', nextval('app_sab_code_seq')),
    "saType" "BasicsAssociateType" NOT NULL,
    "displayName" TEXT NOT NULL,
    "profilePicture" TEXT,
    "isIdentityAdded" BOOLEAN NOT NULL DEFAULT false,
    "officeAddress" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "isAddressAdded" BOOLEAN NOT NULL DEFAULT false,
    "primaryServices" "ServiceTypes"[],
    "subServices" "ServiceTypes"[],
    "typicalProjectValue" INTEGER,
    "isServicesAdded" BOOLEAN NOT NULL DEFAULT false,
    "PAN" TEXT,
    "GSTIN" TEXT,
    "governmentIdType" "GovernmentIdType",
    "governmentIdNumber" TEXT,
    "professionalLicenseType" TEXT,
    "professionalLicenseNumber" TEXT,
    "isCredentialsAdded" BOOLEAN NOT NULL DEFAULT false,
    "financeAccountId" TEXT,
    "maskedAccountNumber" TEXT,
    "bankName" TEXT,
    "isBankDetailsAdded" BOOLEAN NOT NULL DEFAULT false,
    "portfolioId" TEXT,
    "isPortfolioAdded" BOOLEAN NOT NULL DEFAULT false,
    "isRepresentativeAdded" BOOLEAN NOT NULL DEFAULT false,
    "status" "ServiceAssociateStatus" NOT NULL DEFAULT 'onboarding',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "basics_service_associate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "basics_organisation_profile" (
    "id" TEXT NOT NULL,
    "serviceAssociateId" TEXT NOT NULL,
    "brandName" TEXT,
    "brandLogo" TEXT,
    "organisationType" "OrganisationType",
    "yearOfEstablishment" INTEGER,
    "businessProofType" "BusinessProofType",
    "businessProofImage" TEXT,
    "tradeLicense" TEXT,
    "insurance" TEXT,
    "representativeName" TEXT,
    "representativeDesignation" TEXT,
    "representativeMobile" TEXT,
    "representativeGovtIDType" "GovernmentIdType",
    "representativeGovtIDNumber" TEXT,
    "representativeGovtIDProof" TEXT,

    CONSTRAINT "basics_organisation_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "basics_individual_profile" (
    "id" TEXT NOT NULL,
    "serviceAssociateId" TEXT NOT NULL,
    "workingSince" INTEGER,

    CONSTRAINT "basics_individual_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "basics_service_area" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "centerPoint" geography(Point, 4326) NOT NULL,
    "radiusKm" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "basics_service_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bridge_service_provider" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spCode" TEXT NOT NULL DEFAULT concat('SP-', nextval('app_sp_code_seq')),
    "spType" "ServiceProviderType" NOT NULL,
    "displayName" TEXT NOT NULL,
    "profilePicture" TEXT,
    "officeAddress" TEXT,
    "officeEmail" TEXT,
    "officePhone" TEXT,
    "primaryServices" "ServiceTypes"[],
    "subServices" "ServiceTypes"[],
    "typicalProjectValue" INTEGER,
    "isServicesAdded" BOOLEAN NOT NULL DEFAULT false,
    "PAN" TEXT,
    "GSTIN" TEXT,
    "governmentIdType" "GovernmentIdType",
    "governmentIdNumber" TEXT,
    "professionalLicenseType" TEXT,
    "professionalLicenseNumber" TEXT,
    "financeAccountId" TEXT,
    "maskedAccountNumber" TEXT,
    "bankName" TEXT,
    "portfolioId" TEXT,
    "isIdentityAdded" BOOLEAN NOT NULL DEFAULT false,
    "isAddressAdded" BOOLEAN NOT NULL DEFAULT false,
    "isPortfolioAdded" BOOLEAN NOT NULL DEFAULT false,
    "isCredentialsAdded" BOOLEAN NOT NULL DEFAULT false,
    "isBankDetailsAdded" BOOLEAN NOT NULL DEFAULT false,
    "isRepresentativeAdded" BOOLEAN NOT NULL DEFAULT false,
    "status" "ServiceProviderStatus" NOT NULL DEFAULT 'onboarding',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bridge_service_provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bridge_organisation_profile" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "brandName" TEXT,
    "brandLogo" TEXT,
    "organisationType" "OrganisationType",
    "yearOfEstablishment" INTEGER NOT NULL,
    "businessProofType" "BusinessProofType",
    "businessProofImage" TEXT,
    "tradeLicense" TEXT,
    "insurance" TEXT,
    "representativeName" TEXT,
    "representativeDesignation" TEXT,
    "representativeMobile" TEXT,
    "representativeGovtIDType" "GovernmentIdType",
    "representativeGovtIDNumber" TEXT,
    "representativeGovtIDProof" TEXT,

    CONSTRAINT "bridge_organisation_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bridge_professional_profile" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "workingSince" INTEGER,

    CONSTRAINT "bridge_professional_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bridge_contractor_profile" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "workingSince" INTEGER,

    CONSTRAINT "bridge_contractor_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bridge_service_area" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "centerPoint" geography(Point, 4326) NOT NULL,
    "radiusKm" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bridge_service_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bridge_portfolio" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "portfolioWebsite" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bridge_portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bridge_portfolio_project" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "projectName" TEXT NOT NULL,
    "location" TEXT,
    "projectType" TEXT NOT NULL,
    "scope" TEXT[],
    "completionYear" INTEGER,
    "budgetValue" INTEGER,
    "budgetCurrency" TEXT DEFAULT 'INR',
    "thumbnailUrl" TEXT,
    "photos" TEXT[],
    "isKallistoVerified" BOOLEAN NOT NULL DEFAULT false,
    "testimonialClientName" TEXT,
    "testimonialClientPhone" TEXT,
    "testimonialText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bridge_portfolio_project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hands_service_associate" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "saCode" TEXT NOT NULL DEFAULT concat('SA-H', nextval('app_sah_code_seq')),
    "saType" "HandsAssociateType" NOT NULL,
    "displayName" TEXT NOT NULL,
    "profilePicture" TEXT,
    "isIdentityAdded" BOOLEAN NOT NULL DEFAULT false,
    "address" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "isAddressAdded" BOOLEAN NOT NULL DEFAULT false,
    "primarySkill" "SkillTypes",
    "subSkills" "SkillTypes"[],
    "isSkillsAdded" BOOLEAN NOT NULL DEFAULT false,
    "governmentIdType" "GovernmentIdType",
    "governmentIdNumber" TEXT,
    "PAN" TEXT,
    "isCredentialsAdded" BOOLEAN NOT NULL DEFAULT false,
    "financeAccountId" TEXT,
    "maskedAccountNumber" TEXT,
    "bankName" TEXT,
    "isBankDetailsAdded" BOOLEAN NOT NULL DEFAULT false,
    "status" "ServiceAssociateStatus" NOT NULL DEFAULT 'onboarding',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hands_service_associate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hands_contractor_profile" (
    "id" TEXT NOT NULL,
    "serviceAssociateId" TEXT NOT NULL,
    "workerCount" INTEGER,
    "workingSince" INTEGER,

    CONSTRAINT "hands_contractor_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hands_worker_profile" (
    "id" TEXT NOT NULL,
    "serviceAssociateId" TEXT NOT NULL,
    "contractorId" TEXT,
    "workingSince" INTEGER,
    "wagePerDay" DOUBLE PRECISION,
    "wageCurrency" TEXT DEFAULT 'INR',

    CONSTRAINT "hands_worker_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hands_service_area" (
    "id" TEXT NOT NULL,
    "serviceProviderId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "centerPoint" geography(Point, 4326) NOT NULL,
    "radiusKm" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hands_service_area_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_bank_account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountHolderName" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "bankBranch" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "IFSCCode" TEXT NOT NULL,
    "UPIId" TEXT,
    "GSTNumber" TEXT,
    "isGSTLinked" BOOLEAN NOT NULL DEFAULT false,
    "cancelledChequeUrl" TEXT,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_bank_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE INDEX "session_userId_idx" ON "session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- CreateIndex
CREATE INDEX "account_userId_idx" ON "account"("userId");

-- CreateIndex
CREATE INDEX "verification_identifier_idx" ON "verification"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "app_user_authId_key" ON "app_user"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "app_user_userCode_key" ON "app_user"("userCode");

-- CreateIndex
CREATE UNIQUE INDEX "app_user_email_key" ON "app_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "basics_service_associate_userId_key" ON "basics_service_associate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "basics_service_associate_saCode_key" ON "basics_service_associate"("saCode");

-- CreateIndex
CREATE UNIQUE INDEX "basics_organisation_profile_serviceAssociateId_key" ON "basics_organisation_profile"("serviceAssociateId");

-- CreateIndex
CREATE UNIQUE INDEX "basics_individual_profile_serviceAssociateId_key" ON "basics_individual_profile"("serviceAssociateId");

-- CreateIndex
CREATE UNIQUE INDEX "bridge_service_provider_userId_key" ON "bridge_service_provider"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "bridge_service_provider_spCode_key" ON "bridge_service_provider"("spCode");

-- CreateIndex
CREATE UNIQUE INDEX "bridge_organisation_profile_serviceProviderId_key" ON "bridge_organisation_profile"("serviceProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "bridge_professional_profile_serviceProviderId_key" ON "bridge_professional_profile"("serviceProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "bridge_contractor_profile_serviceProviderId_key" ON "bridge_contractor_profile"("serviceProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "bridge_portfolio_serviceProviderId_key" ON "bridge_portfolio"("serviceProviderId");

-- CreateIndex
CREATE UNIQUE INDEX "hands_service_associate_userId_key" ON "hands_service_associate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "hands_service_associate_saCode_key" ON "hands_service_associate"("saCode");

-- CreateIndex
CREATE UNIQUE INDEX "hands_contractor_profile_serviceAssociateId_key" ON "hands_contractor_profile"("serviceAssociateId");

-- CreateIndex
CREATE UNIQUE INDEX "hands_worker_profile_serviceAssociateId_key" ON "hands_worker_profile"("serviceAssociateId");

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basics_organisation_profile" ADD CONSTRAINT "basics_organisation_profile_serviceAssociateId_fkey" FOREIGN KEY ("serviceAssociateId") REFERENCES "basics_service_associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basics_individual_profile" ADD CONSTRAINT "basics_individual_profile_serviceAssociateId_fkey" FOREIGN KEY ("serviceAssociateId") REFERENCES "basics_service_associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "basics_service_area" ADD CONSTRAINT "basics_service_area_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "basics_service_associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bridge_organisation_profile" ADD CONSTRAINT "bridge_organisation_profile_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "bridge_service_provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bridge_professional_profile" ADD CONSTRAINT "bridge_professional_profile_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "bridge_service_provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bridge_contractor_profile" ADD CONSTRAINT "bridge_contractor_profile_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "bridge_service_provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bridge_service_area" ADD CONSTRAINT "bridge_service_area_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "bridge_service_provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bridge_portfolio" ADD CONSTRAINT "bridge_portfolio_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "bridge_service_provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bridge_portfolio_project" ADD CONSTRAINT "bridge_portfolio_project_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "bridge_portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hands_contractor_profile" ADD CONSTRAINT "hands_contractor_profile_serviceAssociateId_fkey" FOREIGN KEY ("serviceAssociateId") REFERENCES "hands_service_associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hands_worker_profile" ADD CONSTRAINT "hands_worker_profile_serviceAssociateId_fkey" FOREIGN KEY ("serviceAssociateId") REFERENCES "hands_service_associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hands_service_area" ADD CONSTRAINT "hands_service_area_serviceProviderId_fkey" FOREIGN KEY ("serviceProviderId") REFERENCES "hands_service_associate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
