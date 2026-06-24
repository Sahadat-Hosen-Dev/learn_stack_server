export type CustomError = Error & {
  code: number;
  error: string;
};

function error(
  code = 500,
  error: string,
  msg: string = "Something went wrong",
): CustomError {
  const e = new Error(msg) as CustomError;
  e.code = code;
  e.error = error;
  return e;
}

export default error;
