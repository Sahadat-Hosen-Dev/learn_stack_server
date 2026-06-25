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

const authValidations = {
  registerSchema,
};

export default authValidations;
