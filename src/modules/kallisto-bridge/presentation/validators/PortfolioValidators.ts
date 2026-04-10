import { z } from "zod";
import { ProjectType, ProjectScope } from "@packages/database/generated/prisma/enums";

export const CreatePortfolioSchema = z.object({
  serviceProviderId: z.string().min(1, "Service Provider ID is required"),
  portfolioWebsite: z.string().url("Invalid portfolio website URL").optional().or(z.string().length(0)),
  isPublic: z.boolean().optional(),
  
  // First project details
  projectName: z.string().min(1, "Project name is required"),
  location: z.string().optional(),
  projectType: z.enum(Object.values(ProjectType) as [string, ...string[]]),
  scope: z.array(z.enum(Object.values(ProjectScope) as [string, ...string[]])).min(1, "At least one scope is required"),
  completionYear: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  budgetValue: z.number().positive().optional(),
  budgetCurrency: z.string().optional().default("INR"),
  
  thumbnailUrl: z.string().url("Invalid thumbnail URL").optional().or(z.string().length(0)),
  photos: z.array(z.string().url()).optional(),
  
  isKallistoVerified: z.boolean().optional(),
  
  testimonialClientName: z.string().optional(),
  testimonialClientPhone: z.string().optional(),
  testimonialText: z.string().optional(),
});

export const AddPortfolioProjectSchema = z.object({
  portfolioId: z.string().min(1, "Portfolio ID is required"),
  projectName: z.string().min(1, "Project name is required"),
  location: z.string().optional(),
  projectType: z.enum(Object.values(ProjectType) as [string, ...string[]]),
  scope: z.array(z.enum(Object.values(ProjectScope) as [string, ...string[]])).min(1, "At least one scope is required"),
  completionYear: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  budgetValue: z.number().positive().optional(),
  budgetCurrency: z.string().optional().default("INR"),
  
  thumbnailUrl: z.string().url("Invalid thumbnail URL").optional().or(z.string().length(0)),
  photos: z.array(z.string().url()).optional(),
  
  isKallistoVerified: z.boolean().optional(),
  
  testimonialClientName: z.string().optional(),
  testimonialClientPhone: z.string().optional(),
  testimonialText: z.string().optional(),
});
