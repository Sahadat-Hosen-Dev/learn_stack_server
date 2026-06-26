import { RegisterInput, RegisterServiceResponse } from "@src/types/auth";
import userService from "../user";
import error from "@src/utils/error";
import { generateHash } from "@src/utils/hashing";
import generateOtp from "@src/utils/generateOtp";

const register = async ({
  username,
  credential,
  password,
}: RegisterInput): Promise<RegisterServiceResponse> => {
  const isUserExit = await userService.userExit(credential);

  if (isUserExit) {
    throw error(404, "Bad credential", "User already exist");
  }

  const countUnverifiedAttemps =
    await userService.unverifiedAttemps(credential);

  if (countUnverifiedAttemps.length >= 3) {
    throw error(
      400,
      "Wrong attempt",
      "Too many attempt. Please wait at least 30 minuites!",
    );
  }

  const hashedPassword = await generateHash(password);

  const { plainOtp, hashedOtp } = await generateOtp();

  const user = await userService.createUser({
    credential,
    hashedOtp,
    password: hashedPassword,
    username,
  });

  return { user, plainOtp };
};

const authService = {
  register,
};

export default authService;
