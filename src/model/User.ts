import { IUser } from "@src/types/auth";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    credential: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      length: 6,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    expiryOtp: {
      type: Date,
      default: null,
    },
    resetPasswordRequested: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    accessType: {
      type: String,
      enum: ["free", "basic", "premium"],
      default: "free",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual("profile", {
  ref: "Profile",
  localField: "_id",
  foreignField: "user_id",
  justOne: true,
});

const User = model<IUser>("User", userSchema);

export default User;
