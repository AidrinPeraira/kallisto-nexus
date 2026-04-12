import { z } from "zod";
import { ProductStatus } from "@packages/common/enums";

const VariantSelectionSchema = z.object({
  id: z.string().optional(),
  specId: z.string().min(1, "Specification ID is required"),
  selectedValue: z.string().min(1, "Selected value is required"),
});

const ProductVariantSchema = z.object({
  id: z.string().optional(),
  sku: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  stockQuantity: z.number().int().min(0, "Stock cannot be negative").optional(),
  selectedSpecs: z
    .array(VariantSelectionSchema)
    .min(1, "At least one specification must be selected for this variant"),
});

export const AddVendorProductSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  brandName: z.string().optional(),
  description: z.string().optional(),
  vendorId: z.string().min(1, "Vendor ID is required"),
  itemId: z.string().min(1, "Item ID is required"),
  status: z.enum(ProductStatus).optional(),
  variants: z
    .array(ProductVariantSchema)
    .min(1, "At least one product variant is required"),
});

export const UpdateVendorProductSchema = AddVendorProductSchema.partial();
