import { z } from "zod";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "username too short")
    .max(30, "username too long")
    .trim(),

  credential: z
    .email("Invalid email format")
    .trim()
    .transform((val) => val.toLowerCase()),

  password: z.string().min(6, "password must be at least 6 characters").trim(),
});

const verifyRegisterOtpSchema = z.object({
  credential: z
    .email("Invalid email format")
    .trim()
    .transform((val) => val.toLocaleLowerCase()),

  otp: z.string().min(6, "OTP must be at least 6 characters"),
});

const loginSchema = z.object({
  credential: z
    .email("Invalid email format")
    .trim()
    .transform((val) => val.toLowerCase()),

  password: z.string().min(6, "Password must be at least 6 characters").trim(),
});

const forgetPasswordSchema = z.object({
  credential: z
    .email("Invalid email format")
    .trim()
    .transform((val) => val.toLowerCase()),
});

const verifyResetOtpSchema = z.object({
  credential: z
    .email("Invalid email format")
    .trim()
    .transform((val) => val.toLowerCase()),

  otp: z.string().min(6, "OTP must be at least 6 characters"),
});

const resetPasswordSchema = z.object({
  credential: z
    .email("Invalid email format")
    .trim()
    .transform((val) => val.toLowerCase()),

  newPassword: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .trim(),
});

const resendOtpSchema = z.object({
  credential: z
    .email("Invalid email format")
    .trim()
    .transform((val) => val.toLowerCase()),
});

const authValidations = {
  registerSchema,
  verifyRegisterOtpSchema,
  loginSchema,
  forgetPasswordSchema,
  verifyResetOtpSchema,
  resetPasswordSchema,
  resendOtpSchema,
};

export default authValidations;
