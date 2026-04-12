/*
  Warnings:

  - You are about to drop the column `maskedAccountNumber` on the `bridge_service_provider` table. All the data in the column will be lost.
  - You are about to drop the column `isBankDetailsAdded` on the `hub_vendors` table. All the data in the column will be lost.
  - You are about to drop the column `maskedAccountNumber` on the `hub_vendors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "app_user" ALTER COLUMN "userCode" SET DEFAULT concat('USR-', nextval('app_user_code_seq'));

-- AlterTable
ALTER TABLE "basics_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-B', nextval('app_sab_code_seq'));

-- AlterTable
ALTER TABLE "bridge_service_provider" DROP COLUMN "maskedAccountNumber",
ADD COLUMN     "IFSCCode" TEXT,
ADD COLUMN     "UPIId" TEXT,
ADD COLUMN     "accountHolderName" TEXT,
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "bankBranch" TEXT,
ALTER COLUMN "spCode" SET DEFAULT concat('SP-', nextval('app_sp_code_seq'));

-- AlterTable
ALTER TABLE "hands_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-H', nextval('app_sah_code_seq'));

-- AlterTable
ALTER TABLE "hub_materials" ALTER COLUMN "itemCode" SET DEFAULT concat('ITM-', nextval('item_code_seq'));

-- AlterTable
ALTER TABLE "hub_vendors" DROP COLUMN "isBankDetailsAdded",
DROP COLUMN "maskedAccountNumber",
ADD COLUMN     "GSTIN" TEXT,
ADD COLUMN     "IFSCCode" TEXT,
ADD COLUMN     "UPIId" TEXT,
ADD COLUMN     "accountHolderName" TEXT,
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "bankBranch" TEXT,
ALTER COLUMN "vendorCode" SET DEFAULT concat('VEN-', nextval('vendor_code_seq'));

-- AlterTable
ALTER TABLE "vendor_products" ALTER COLUMN "productCode" SET DEFAULT concat('VP-', nextval('vendor_product_code_seq'));
