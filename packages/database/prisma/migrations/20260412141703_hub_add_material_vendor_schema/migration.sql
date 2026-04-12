CREATE SEQUENCE IF NOT EXISTS vendor_code_seq START WITH 1000;
CREATE SEQUENCE IF NOT EXISTS item_code_seq START WITH 1000;
CREATE SEQUENCE IF NOT EXISTS vendor_product_code_seq START WITH 1000;

-- CreateEnum
CREATE TYPE "VendorType" AS ENUM ('AUTHORIZED_DEALER', 'DISTRIBUTOR', 'WHOLESALER', 'RETAILER', 'STOCKIST');

-- CreateEnum
CREATE TYPE "MaterialCategory" AS ENUM ('DOOR', 'WINDOW', 'STRUCTURAL_STEEL', 'CEMENT_AND_CONCRETE', 'AGGREGATES', 'BRICKS_AND_MASONRY', 'ROOFING', 'FLOORING', 'PLUMBING', 'ELECTRICAL', 'INSULATION', 'HARDWARE_AND_FITTINGS', 'GLASS', 'TIMBER_AND_WOOD', 'PAINTS_AND_COATINGS', 'WATERPROOFING', 'SAFETY_AND_PPE');

-- CreateEnum
CREATE TYPE "UnitOfMeasure" AS ENUM ('NOS', 'SQM', 'SQFT', 'RMT', 'KG', 'TON', 'BAG', 'LITRE', 'BUNDLE', 'BOX', 'SET');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'DISCONTINUED', 'OUT_OF_STOCK', 'COMING_SOON');

-- AlterTable
ALTER TABLE "app_user" ALTER COLUMN "userCode" SET DEFAULT concat('USR-', nextval('app_user_code_seq'));

-- AlterTable
ALTER TABLE "basics_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-B', nextval('app_sab_code_seq'));

-- AlterTable
ALTER TABLE "bridge_service_provider" ALTER COLUMN "spCode" SET DEFAULT concat('SP-', nextval('app_sp_code_seq'));

-- AlterTable
ALTER TABLE "hands_service_associate" ALTER COLUMN "saCode" SET DEFAULT concat('SA-H', nextval('app_sah_code_seq'));

-- CreateTable
CREATE TABLE "hub_vendors" (
    "id" TEXT NOT NULL,
    "vendorCode" TEXT NOT NULL DEFAULT concat('VEN-', nextval('vendor_code_seq')),
    "vendorType" "VendorType" NOT NULL DEFAULT 'AUTHORIZED_DEALER',
    "companyName" TEXT NOT NULL,
    "brandName" TEXT,
    "profilePicture" TEXT,
    "financeAccountId" TEXT,
    "maskedAccountNumber" TEXT,
    "bankName" TEXT,
    "isBankDetailsAdded" BOOLEAN NOT NULL DEFAULT false,
    "officeAddress" TEXT,
    "city" TEXT,
    "district" TEXT,
    "state" TEXT NOT NULL DEFAULT 'Kerala',
    "pincode" TEXT,
    "country" TEXT NOT NULL DEFAULT 'India',
    "phone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "representativeName" TEXT,
    "representativePhone" TEXT,
    "contactNumber" TEXT,
    "whatsappNumber" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "logoUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hub_vendors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub_materials" (
    "id" TEXT NOT NULL,
    "itemCode" TEXT NOT NULL DEFAULT concat('ITM-', nextval('item_code_seq')),
    "name" TEXT NOT NULL,
    "category" "MaterialCategory" NOT NULL,
    "hsnCode" TEXT,
    "imageUrl" TEXT,
    "unitOfMeasure" "UnitOfMeasure" NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hub_materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_specifications" (
    "id" TEXT NOT NULL,
    "specName" TEXT NOT NULL,
    "specValues" TEXT[],
    "itemId" TEXT NOT NULL,

    CONSTRAINT "material_specifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_products" (
    "id" TEXT NOT NULL,
    "productCode" TEXT DEFAULT concat('VP-', nextval('vendor_product_code_seq')),
    "productName" TEXT NOT NULL,
    "brandName" TEXT,
    "description" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'ACTIVE',
    "vendorId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor_product_variants" (
    "id" TEXT NOT NULL,
    "sku" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "stockQuantity" INTEGER DEFAULT 0,
    "vendorProductId" TEXT NOT NULL,

    CONSTRAINT "vendor_product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "variant_selections" (
    "id" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "specId" TEXT NOT NULL,
    "selectedValue" TEXT NOT NULL,

    CONSTRAINT "variant_selections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hub_service_area" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "centerPoint" geography(Point, 4326) NOT NULL,
    "radiusKm" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hub_service_area_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hub_vendors_vendorCode_key" ON "hub_vendors"("vendorCode");

-- CreateIndex
CREATE UNIQUE INDEX "hub_vendors_email_key" ON "hub_vendors"("email");

-- CreateIndex
CREATE INDEX "hub_vendors_vendorType_idx" ON "hub_vendors"("vendorType");

-- CreateIndex
CREATE UNIQUE INDEX "hub_materials_itemCode_key" ON "hub_materials"("itemCode");

-- CreateIndex
CREATE INDEX "hub_materials_category_idx" ON "hub_materials"("category");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_products_productCode_key" ON "vendor_products"("productCode");

-- CreateIndex
CREATE INDEX "vendor_products_vendorId_idx" ON "vendor_products"("vendorId");

-- CreateIndex
CREATE INDEX "vendor_products_status_idx" ON "vendor_products"("status");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_products_vendorId_productCode_key" ON "vendor_products"("vendorId", "productCode");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_product_variants_sku_key" ON "vendor_product_variants"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "variant_selections_variantId_specId_key" ON "variant_selections"("variantId", "specId");

-- AddForeignKey
ALTER TABLE "material_specifications" ADD CONSTRAINT "material_specifications_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "hub_materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_products" ADD CONSTRAINT "vendor_products_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "hub_vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_products" ADD CONSTRAINT "vendor_products_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "hub_materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_product_variants" ADD CONSTRAINT "vendor_product_variants_vendorProductId_fkey" FOREIGN KEY ("vendorProductId") REFERENCES "vendor_products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_selections" ADD CONSTRAINT "variant_selections_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "vendor_product_variants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_selections" ADD CONSTRAINT "variant_selections_specId_fkey" FOREIGN KEY ("specId") REFERENCES "material_specifications"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hub_service_area" ADD CONSTRAINT "hub_service_area_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "hub_vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
