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
router.post(
  "/verifyRegisterOtp",
  validate(authValidations.verifyRegisterOtpSchema),
  authControllers.verifyRegisterOtp,
);
router.post(
  "/login",
  validate(authValidations.loginSchema),
  authControllers.login,
);
router.post(
  "/forgetPassword",
  validate(authValidations.forgetPasswordSchema),
  authControllers.forgetPassword,
);
router.post(
  "/verifyResetOtp",
  validate(authValidations.verifyResetOtpSchema),
  authControllers.verifyRestOtp,
);
router.post(
  "/resetPassword",
  validate(authValidations.resetPasswordSchema),
  authControllers.resetPassword,
);

export default router;
