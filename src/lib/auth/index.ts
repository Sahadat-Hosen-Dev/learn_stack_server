import {
  IUser,
  RegisterInput,
  RegisterServiceResponse,
  VerifyRegisterOtpInput,
  LoginInput,
} from "@src/types/auth";
import userService from "../user";
import error from "@src/utils/error";
import { generateHash, hashMatched } from "@src/utils/hashing";
import generateOtp from "@src/utils/generateOtp";
import { MutateResponse } from "@src/types/common";
import User from "@src/model/User";
import { differenceInMinutes } from "date-fns";
import { AuthPayload } from "@src/types/token";
import tokenService from "../token";

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

const verifyRegisterOtp = async ({
  credential,
  otp,
}: VerifyRegisterOtpInput): Promise<string> => {
  if (!credential || !otp) {
    throw error(400, "Invalid parameters", "Must be provide valid parameters");
  }

  const existingAllUser: IUser[] = await userService.findAllUser({
    credential,
    isVerified: false,
    sortValue: -1,
  });

  if (existingAllUser.length === 0) {
    throw error(400, "Not Found", "User not found");
  }

  let user: IUser | null = null;

  if (existingAllUser.length > 1) {
    user = existingAllUser[0];
    await User.deleteMany({
      credential,
      isVerified: false,
      _id: { $ne: user._id },
    });
  } else {
    user = existingAllUser[0];
  }

  const isOtpValid = await hashMatched(otp, user.otp);

  if (!isOtpValid) {
    throw error(400, "Invalid OTP", "The OTP you entered is incorrect");
  }

  if (!user.expiryOtp) {
    throw error(400, "Invalid Data", "OTP expiry timestamp missing");
  }

  const minutesPassed = differenceInMinutes(new Date(), user.expiryOtp);

  if (minutesPassed >= 2) {
    throw error(400, "OTP Expired", "The OTP has expired");
  }

  user.isVerified = true;
  user.otp = "";
  await user.save({ validateModifiedOnly: true });

  const payload: AuthPayload = {
    _id: user._id,
    username: user.username,
    credential: user.credential,
    role: user.role,
    accessType: user.accessType,
  };

  const access_token: string = tokenService.generateToken<AuthPayload>({
    payload,
  });

  return access_token;
};

const login = async ({ credential, password }: LoginInput) => {
  if (!credential || !password) {
    throw error(404, "Bad Request", "Invalid credential or password");
  }

  const user = await userService.findUserByEmail(credential);

  if (!user) {
    throw error(401, "Unauthorized", "Invalid credential");
  }

  const isMatchPassword = await hashMatched(password, user.password);

  if (!isMatchPassword) {
    throw error(400, "Not Found", "Invalid credential");
  }

  const payload: AuthPayload = {
    _id: user._id,
    username: user.username,
    credential: user.credential,
    role: user.role,
    accessType: user.accessType,
  };

  const access_token: string = tokenService.generateToken<AuthPayload>({
    payload,
  });

  return access_token;
};

const authService = {
  register,
  verifyRegisterOtp,
  login,
};

export default authService;
