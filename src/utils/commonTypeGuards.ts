import { ZodError } from "zod";
import { CustomError } from "./error";

export function isCustomError(err: unknown): err is CustomError {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    typeof err.code === "number" &&
    "error" in err &&
    typeof (err as any).error === "string" &&
    "message" in err &&
    typeof (err as any).message === "string"
  );
}

export const isError = (err: unknown): err is Error => {
  return err instanceof Error;
};

export const isZodError = (err: unknown): err is ZodError => {
  return err instanceof ZodError;
};
