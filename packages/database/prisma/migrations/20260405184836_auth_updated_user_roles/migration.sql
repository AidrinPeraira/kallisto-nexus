-- AlterTable
ALTER TABLE "app_user" ALTER COLUMN "userCode" SET DEFAULT concat('USR-', nextval('app_user_code_seq'));
