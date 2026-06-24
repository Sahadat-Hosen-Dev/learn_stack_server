import { Document, Types } from "mongoose";
import { Type } from "typescript";

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
