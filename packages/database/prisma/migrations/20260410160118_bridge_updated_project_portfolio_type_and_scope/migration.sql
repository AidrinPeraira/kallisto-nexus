/*
  Warnings:

  - The `scope` column on the `bridge_portfolio_project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `projectType` on the `bridge_portfolio_project` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "app_user" ALTER COLUMN "userCode" SET DEFAULT concat('USR-', nextval('app_user_code_seq'));

-- AlterTable
ALTER TABLE "basics_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-B', nextval('app_sab_code_seq'));

-- AlterTable
ALTER TABLE "bridge_portfolio_project" DROP COLUMN "projectType",
ADD COLUMN     "projectType" "ProjectType" NOT NULL,
DROP COLUMN "scope",
ADD COLUMN     "scope" "ProjectScope"[];

-- AlterTable
ALTER TABLE "bridge_service_provider" ALTER COLUMN "spCode" SET DEFAULT concat('SP-', nextval('app_sp_code_seq'));

-- AlterTable
ALTER TABLE "hands_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-H', nextval('app_sah_code_seq'));
