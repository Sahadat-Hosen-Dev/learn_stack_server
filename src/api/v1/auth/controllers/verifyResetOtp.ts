import authService from "@src/lib/auth";
import { VerifyResetPasswordInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import { NextFunction, Request, Response } from "express";

const verifyRestOtp = async (
  req: Request<{}, {}, VerifyResetPasswordInput>,
  res: Response<MutateResponse>,
  next: NextFunction,
) => {
  const { credential, otp } = req.body;
  try {
    await authService.verifyResetOtp({ credential, otp });

    const response = {
      code: 200,
      message: "OTP verified. Now reset your password",
      links: {
        self: "/api/v1/auth/verifyResetOtp",
        resetPassword: "/api/v1/auth/resetPassword",
      },
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export default verifyRestOtp;
