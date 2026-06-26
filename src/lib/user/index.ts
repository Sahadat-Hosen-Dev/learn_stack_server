import User from "@src/model/User";
import { IUser } from "@src/types/auth";
import error from "@src/utils/error";
import { string } from "zod";

const findUserByEmail = async (credential: string): Promise<IUser | null> => {
  const user = await User.findOne({
    credential,
    isVerified: true,
  });

  return user ? user : null;
};

const userExit = async (credential: string): Promise<boolean> => {
  const user: IUser | null = await findUserByEmail(credential);

  return user ? true : false;
};

const unverifiedAttemps = async (credential: string): Promise<IUser[]> => {
  const unverifiedAttemps = await User.find({ credential, isVerified: false });

  return unverifiedAttemps;
};

const createUser = async ({
  credential,
  hashedOtp,
  password,
  username,
}: {
  username: string;
  credential: string;
  password: string;
  hashedOtp: string;
}): Promise<IUser> => {
  if (!username || !credential || !password || !hashedOtp) {
    throw error(400, "Invalid parameters", "Please provide valid inputs");
  }

  const user = new User({
    username,
    credential,
    password,
    otp: hashedOtp,
  });

  await user.save();
  return user;
};

const userService = {
  userExit,
  findUserByEmail,
  unverifiedAttemps,
  createUser,
};

export default userService;
