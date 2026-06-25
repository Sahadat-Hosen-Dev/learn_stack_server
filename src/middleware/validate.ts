import { ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
import { isZodError } from "@src/utils/commonTypeGuards";
import { ErrorResponse } from "@src/types/common";

type RequestPart = "body" | "query" | "params";

const validate =
  (schema: ZodObject<any>, part: RequestPart = "body") =>
  (req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
    try {
      // Validate the specified part (body, query, or params)
      const parsed = schema.parse((req as any)[part]);

      if (part === "query" || part === "params") {
        // merge parsed values into existing object
        Object.assign((req as any)[part], parsed);
      } else {
        // body can be replaced safely
        (req as any).body = parsed;
      }
      next();
    } catch (err) {
      console.log("validate error", err);
      next(err);
    }
  };

export default validate;
