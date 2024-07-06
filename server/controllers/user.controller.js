import User from "../models/user.model.js";

export const likeAndDislikeSong = async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) return res.status(404).json("User not found!");

    const isLiked = user.likedSongs.includes(id);

    if (isLiked) {
      await User.findByIdAndUpdate(
        userId,
        { $pull: { likedSongs: id } },
        { new: true }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        { $push: { likedSongs: id } },
        { new: true }
      );
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};
