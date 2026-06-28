import authValidations from "@src/validations/auth";
import { Document, Types } from "mongoose";
import { Type } from "typescript";
import z from "zod";

export interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  credential: string;
  password: string;
  otp: string;
  isVerified: boolean;
  expiryOtp: Date;
  resetPasswordRequested: boolean;
  role: "user" | "admin";
  accessType: "free" | "basic" | "premium";
  profile?: IProfile;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProfile extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  avator: string;
  bio: string;
  designation: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RegisterInput = z.infer<typeof authValidations.registerSchema>;

export type RegisterServiceResponse = {
  user: IUser;
  plainOtp: string;
};

export type VerifyRegisterOtpInput = z.infer<
  typeof authValidations.verifyRegisterOtpSchema
>;
