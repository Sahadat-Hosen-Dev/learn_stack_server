import express, { Request, Response, NextFunction } from "express";

import applyMiddleware from "./middleware";
import { ErrorResponse } from "./types/common";
import { isCustomError, isError } from "./utils/commonTypeGuards";

const app = express();
applyMiddleware(app);

app.get(
  "/api/v1/health",
  (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json({
        code: 200,
        health: "OK!",
      });
    } catch (error) {
      next(error);
    }
  },
);

app.use(
  (
    err: any,
    _req: Request,
    res: Response<ErrorResponse>,
    _next: NextFunction,
  ) => {
    if (isCustomError(err)) {
      const response: ErrorResponse = {
        code: err.code,
        error: err.error,
        message: err.message,
      };

      return res.status(err.code).json(response);
    }

    if (isError(err)) {
      const response: ErrorResponse = {
        code: 500,
        error: "Internal Server Error",
        message: err.message,
      };

      return res.status(500).json(response);
    }

    const response: ErrorResponse = {
      code: 500,
      error: "Internal Server Error",
      message: "Server error occurred",
    };

    return res.status(500).json(response);
  },
);

export default app;
