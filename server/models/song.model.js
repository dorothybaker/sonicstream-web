import { Schema, model } from "mongoose";

const SongSchema = new Schema(
  {
    title: String,
    song: String,
    image: String,
    author: String,
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

const Song = model("Song", SongSchema);

export default Song;
