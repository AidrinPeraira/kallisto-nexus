import { UserRole } from "@packages/common/enums";
import { z } from "zod";

export const RegisterUserSchema = z
  .object({
    email: z.string().email("Invalid email format"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must include uppercase, lowercase, number, and special character",
      ),

    confirmPassword: z.string(),

    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .max(50, "Full name too long")
      .regex(/^[a-zA-Z\s.'-]+$/, "Full name contains invalid characters"),

    contactNumber: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),

    role: z.enum(UserRole),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterUserData = z.infer<typeof RegisterUserSchema>;

export const LoginUserSchema = z.object({
  email: z.string().email("Invalid email format"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Password must include uppercase, lowercase, number, and special character",
    ),
});

export type LoginUserData = z.infer<typeof LoginUserSchema>;

export const RefreshTokenSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  sessionToken: z.string().min(1, "Session token is required"),
});

export type RefreshTokenData = z.infer<typeof RefreshTokenSchema>;
