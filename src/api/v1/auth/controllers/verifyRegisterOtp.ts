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
    const response: MutateResponse = await authService.verifyRegisterOtp({
      credential,
      otp,
    });

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

export default verifyRegisterOtp;
