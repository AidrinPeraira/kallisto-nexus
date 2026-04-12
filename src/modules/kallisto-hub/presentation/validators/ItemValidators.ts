import { z } from "zod";
import { MaterialCategory, UnitOfMeasure } from "@packages/common/enums";

const SpecificationSchema = z.object({
  id: z.string().optional(),
  specName: z.string().min(1, "Specification name is required"),
  specValues: z
    .array(z.string())
    .min(1, "At least one specification value is required"),
});

export const CreateItemSchema = z.object({
  name: z.string().min(2, "Item name is required"),
  category: z.enum(MaterialCategory),
  hsnCode: z.string().optional(),
  imageUrl: z.url("Invalid image URL").optional(),
  unitOfMeasure: z.enum(UnitOfMeasure),
  description: z.string().optional(),
  specifications: z
    .array(SpecificationSchema)
    .min(1, "At least one specification is required"),
});

export const UpdateItemSchema = CreateItemSchema.partial().extend({
  isActive: z.boolean().optional(),
});
