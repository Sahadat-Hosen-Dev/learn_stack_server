import authService from "@src/lib/auth";
import { LoginInput } from "@src/types/auth";
import { MutateResponse } from "@src/types/common";
import { NextFunction, Request, Response } from "express";

const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response<MutateResponse>,
  next: NextFunction,
) => {
  const { credential, password } = req.body;
  console.log(credential, password);
  try {
    const access_token = await authService.login({ credential, password });

    const response = {
      code: 200,
      message: "Login successfully",
      data: {
        access_token,
      },
      links: {
        self: "/api/v1/auth/login",
        register: "/api/v1/auth/register",
        forgetPassword: "/api/v1/auth/forgetPassword",
      },
    };

    res.status(200).json(response);
  } catch (err: unknown) {
    next(err);
  }
};

export default login;
