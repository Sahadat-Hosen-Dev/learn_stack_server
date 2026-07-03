import authService from "@src/lib/auth";
import { ResetPasswordInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import { NextFunction, Request, Response } from "express";

const resetPassword = async (
  req: Request<{}, {}, ResetPasswordInput>,
  res: Response<MutateResponse>,
  next: NextFunction,
) => {
  const { credential, newPassword } = req.body;
  try {
    await authService.resetPassword({ credential, newPassword });

    const response = {
      code: 200,
      message: "Password reset successfully. Please log in!",
      links: {
        self: "/api/v1/auth/resetPassword",
        login: "/api/v1/auth/login",
      },
    };

    res.status(200).json(response);
  } catch (err: unknown) {
    next(err);
  }
};

export default resetPassword;
