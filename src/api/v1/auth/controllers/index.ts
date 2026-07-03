import forgetPassword from "./forgetPassword";
import login from "./login";
import register from "./register";
import resetPassword from "./resetPassword";
import verifyRegisterOtp from "./verifyRegisterOtp";
import verifyRestOtp from "./verifyResetOtp";

const authControllers = {
  register,
  verifyRegisterOtp,
  login,
  forgetPassword,
  verifyRestOtp,
  resetPassword,
};

export default authControllers;
