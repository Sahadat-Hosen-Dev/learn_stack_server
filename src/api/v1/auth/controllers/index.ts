import forgetPassword from "./forgetPassword";
import login from "./login";
import register from "./register";
import resendOtp from "./resendOtp";
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
  resendOtp,
};

export default authControllers;
