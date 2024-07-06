import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    likedSongs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

export default User;
