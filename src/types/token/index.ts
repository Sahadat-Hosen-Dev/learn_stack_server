import { Types } from "mongoose";
import { Algorithm, SignOptions, Secret } from "jsonwebtoken";
export type AuthPayload = {
  _id: Types.ObjectId;
  username: string;
  credential: string;
  role: "user" | "admin";
  accessType: "free" | "basic" | "premium";
};

export interface GenerateTokenOptions<T extends object> {
  payload: T;
  algorithm?: Algorithm;
  secret?: Secret;
  expiresIn?: SignOptions["expiresIn"];
}
