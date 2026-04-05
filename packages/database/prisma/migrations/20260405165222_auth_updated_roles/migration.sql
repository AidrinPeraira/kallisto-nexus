/*
  Warnings:

  - The values [owner,contractor,labourer,admin] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('project_owner', 'sp_organization', 'sp_professional', 'sp_contractor', 'sa_contractor', 'sa_worker', 'system_admin');
ALTER TABLE "app_user" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "public"."UserRole_old";
COMMIT;

-- AlterTable
ALTER TABLE "app_user" ALTER COLUMN "userCode" SET DEFAULT concat('USR-', nextval('app_user_code_seq'));
