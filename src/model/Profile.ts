import { IProfile } from "@src/types/auth";
import { Schema, model } from "mongoose";

const profileSchema = new Schema<IProfile>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    avator: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      default: "",
    },
    designation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const Profile = model<IProfile>("Profile", profileSchema);

export default Profile;
