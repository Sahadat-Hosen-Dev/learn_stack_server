import authService from "@src/lib/auth";
import { VerifyRegisterOtpInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import { NextFunction, Request, Response } from "express";

const verifyRegisterOtp = async (
  req: Request<{}, {}, VerifyRegisterOtpInput>,
  res: Response<MutateResponse>,
  next: NextFunction,
) => {
  const { credential, otp } = req.body;
  console.log(credential, otp);
  try {
    const access_token: string = await authService.verifyRegisterOtp({
      credential,
      otp,
    });

    const response: MutateResponse = {
      code: 200,
      message: "Email verified successfully. You are now login!",
      data: {
        access_token,
      },
      links: {
        self: `/api/v1/auth/verifyRegisterOtp`,
        login: "/api/v1/auth/login",
      },
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export default verifyRegisterOtp;
