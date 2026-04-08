-- AlterTable
ALTER TABLE "app_user" ALTER COLUMN "userCode" SET DEFAULT concat('USR-', nextval('app_user_code_seq'));

-- AlterTable
ALTER TABLE "basics_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-B', nextval('app_sab_code_seq'));

-- AlterTable
ALTER TABLE "bridge_organisation_profile" ALTER COLUMN "yearOfEstablishment" DROP NOT NULL;

-- AlterTable
ALTER TABLE "bridge_service_provider" ALTER COLUMN "spCode" SET DEFAULT concat('SP-', nextval('app_sp_code_seq'));

-- AlterTable
ALTER TABLE "hands_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-H', nextval('app_sah_code_seq'));
