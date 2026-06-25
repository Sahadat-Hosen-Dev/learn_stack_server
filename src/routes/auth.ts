import authControllers from "@src/api/v1/auth";
import validate from "@src/middleware/validate";
import authValidations from "@src/validations/auth";
import { Router } from "express";

const router = Router();

router.post(
  "/register",
  validate(authValidations.registerSchema),
  authControllers.register,
);

export default router;
