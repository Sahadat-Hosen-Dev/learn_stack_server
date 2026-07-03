import authService from "@src/lib/auth";
import { ResendOtpInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import sendVerificationOtp from "@src/utils/sendVerificationOtp";
import { NextFunction, Request, Response } from "express";

const resendOtp = async (
  req: Request<{}, {}, ResendOtpInput>,
  res: Response<MutateResponse>,
  next: NextFunction,
) => {
  const { credential } = req.body;
  try {
    const plainOtp = await authService.resendOtp({ credential });

    const response = {
      code: 200,
      message: "New OTP send to your credential",
      links: {
        self: "/api/v1/auth/resendOtp",
      },
    };

    res.status(200).json(response);

    setImmediate(async () => {
      await sendVerificationOtp({ otp: plainOtp, credential });
    });
  } catch (err: unknown) {
    next(err);
  }
};

export default resendOtp;
