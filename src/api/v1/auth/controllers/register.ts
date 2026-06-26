import authService from "@src/lib/auth";
import { RegisterInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import sendVerificationOtp from "@src/utils/sendVerificationOtp";
import { NextFunction, Request, Response } from "express";

const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response<MutateResponse>,
  next: NextFunction,
) => {
  const { username, credential, password } = req.body;
  try {
    const { plainOtp, user } = await authService.register({
      username,
      credential,
      password,
    });

    const response = {
      code: 201,
      message:
        "Registration Received. Please check your email to verification OTP!",
      links: {
        self: `api/v1/auth/${req.url}`,
        login: "api/v1/auth/login",
      },
    };

    res.status(201).json(response);

    setImmediate(async () => {
      await sendVerificationOtp({
        otp: plainOtp,
        credential,
      });
    });
  } catch (err: unknown) {
    next(err);
  }
};

export default register;
