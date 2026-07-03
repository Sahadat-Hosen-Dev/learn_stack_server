import authService from "@src/lib/auth";
import { ForgetPasswordInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import error from "@src/utils/error";
import sendVerificationOtp from "@src/utils/sendVerificationOtp";
import { NextFunction, Request, Response } from "express";

const forgetPassword = async (
  req: Request<{}, {}, ForgetPasswordInput>,
  res: Response<MutateResponse>,
  next: NextFunction,
) => {
  const { credential } = req.body;
  try {
    const plainOtp = await authService.forgetPassword({ credential });

    const response = {
      code: 200,
      message: "OTP has been sent to your registered email.",
      links: {
        self: "/api/v1/auth/forgetPassword",
        resendOtp: "/api/v1/auth/resendOtp",
        verifyResetOtp: "/api/v1/auth/verifyResetOtp",
      },
    };

    res.status(200).json(response);

    setImmediate(async () => {
      await sendVerificationOtp({ credential, otp: plainOtp });
    });
  } catch (err: unknown) {
    next(error);
  }
};

export default forgetPassword;
