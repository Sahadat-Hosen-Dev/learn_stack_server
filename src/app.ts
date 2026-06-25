import express, { Request, Response, NextFunction } from "express";

import applyMiddleware from "./middleware";
import { ErrorResponse } from "./types/common";
import { isCustomError, isError, isZodError } from "./utils/commonTypeGuards";
import routes from "./routes";
import { ZodError } from "zod";
const app = express();
applyMiddleware(app);

app.use(routes);
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
    if (isZodError(err)) {
      return res.status(400).json({
        code: 400,
        error: "Bad request",
        data: err.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

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
