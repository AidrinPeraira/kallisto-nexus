/*
  Warnings:

  - You are about to drop the column `wageCurrency` on the `hands_worker_profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "app_user" ALTER COLUMN "userCode" SET DEFAULT concat('USR-', nextval('app_user_code_seq'));

-- AlterTable
ALTER TABLE "basics_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-B', nextval('app_sab_code_seq'));

-- AlterTable
ALTER TABLE "bridge_service_provider" ALTER COLUMN "spCode" SET DEFAULT concat('SP-', nextval('app_sp_code_seq'));

-- AlterTable
ALTER TABLE "hands_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-H', nextval('app_sah_code_seq'));

-- AlterTable
ALTER TABLE "hands_worker_profile" DROP COLUMN "wageCurrency";

-- AlterTable
ALTER TABLE "hub_materials" ALTER COLUMN "itemCode" SET DEFAULT concat('ITM-', nextval('item_code_seq'));

-- AlterTable
ALTER TABLE "hub_vendors" ALTER COLUMN "vendorCode" SET DEFAULT concat('VEN-', nextval('vendor_code_seq'));

-- AlterTable
ALTER TABLE "vendor_products" ALTER COLUMN "productCode" SET DEFAULT concat('VP-', nextval('vendor_product_code_seq'));
