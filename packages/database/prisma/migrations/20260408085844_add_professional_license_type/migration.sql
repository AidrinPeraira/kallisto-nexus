/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `app_user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `basics_individual_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `basics_organisation_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `basics_service_area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `basics_service_associate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bridge_contractor_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bridge_organisation_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bridge_portfolio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bridge_portfolio_project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bridge_professional_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bridge_service_area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `bridge_service_provider` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hands_contractor_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hands_service_area` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hands_service_associate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `hands_worker_profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment_bank_account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "basics_individual_profile" DROP CONSTRAINT "basics_individual_profile_serviceAssociateId_fkey";

-- DropForeignKey
ALTER TABLE "basics_organisation_profile" DROP CONSTRAINT "basics_organisation_profile_serviceAssociateId_fkey";

-- DropForeignKey
ALTER TABLE "basics_service_area" DROP CONSTRAINT "basics_service_area_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "bridge_contractor_profile" DROP CONSTRAINT "bridge_contractor_profile_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "bridge_organisation_profile" DROP CONSTRAINT "bridge_organisation_profile_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "bridge_portfolio" DROP CONSTRAINT "bridge_portfolio_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "bridge_portfolio_project" DROP CONSTRAINT "bridge_portfolio_project_portfolioId_fkey";

-- DropForeignKey
ALTER TABLE "bridge_professional_profile" DROP CONSTRAINT "bridge_professional_profile_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "bridge_service_area" DROP CONSTRAINT "bridge_service_area_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "hands_contractor_profile" DROP CONSTRAINT "hands_contractor_profile_serviceAssociateId_fkey";

-- DropForeignKey
ALTER TABLE "hands_service_area" DROP CONSTRAINT "hands_service_area_serviceProviderId_fkey";

-- DropForeignKey
ALTER TABLE "hands_worker_profile" DROP CONSTRAINT "hands_worker_profile_serviceAssociateId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "app_user";

-- DropTable
DROP TABLE "basics_individual_profile";

-- DropTable
DROP TABLE "basics_organisation_profile";

-- DropTable
DROP TABLE "basics_service_area";

-- DropTable
DROP TABLE "basics_service_associate";

-- DropTable
DROP TABLE "bridge_contractor_profile";

-- DropTable
DROP TABLE "bridge_organisation_profile";

-- DropTable
DROP TABLE "bridge_portfolio";

-- DropTable
DROP TABLE "bridge_portfolio_project";

-- DropTable
DROP TABLE "bridge_professional_profile";

-- DropTable
DROP TABLE "bridge_service_area";

-- DropTable
DROP TABLE "bridge_service_provider";

-- DropTable
DROP TABLE "hands_contractor_profile";

-- DropTable
DROP TABLE "hands_service_area";

-- DropTable
DROP TABLE "hands_service_associate";

-- DropTable
DROP TABLE "hands_worker_profile";

-- DropTable
DROP TABLE "payment_bank_account";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "user";

-- DropTable
DROP TABLE "verification";

-- DropEnum
DROP TYPE "BasicsAssociateType";

-- DropEnum
DROP TYPE "BusinessProofType";

-- DropEnum
DROP TYPE "GovernmentIdType";

-- DropEnum
DROP TYPE "HandsAssociateType";

-- DropEnum
DROP TYPE "OrganisationType";

-- DropEnum
DROP TYPE "ProjectScope";

-- DropEnum
DROP TYPE "ProjectType";

-- DropEnum
DROP TYPE "ServiceAssociateStatus";

-- DropEnum
DROP TYPE "ServiceProviderStatus";

-- DropEnum
DROP TYPE "ServiceProviderType";

-- DropEnum
DROP TYPE "ServiceTypes";

-- DropEnum
DROP TYPE "SkillTypes";

-- DropEnum
DROP TYPE "UserRole";

-- DropEnum
DROP TYPE "UserStatus";
