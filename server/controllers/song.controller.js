import Song from "../models/song.model.js";

export const createSong = async (req, res) => {
  const userId = req.user._id;
  const { title, song, image, author } = req.body;

  try {
    const newSong = new Song({ title, song, image, author, userId });

    if (newSong) {
      await newSong.save();

      res.status(201).json("Song successfully created!");
    } else {
      res.status(400).json("Invalid song data provided!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });

    if (songs) {
      res.status(200).json(songs);
    } else {
      res.status(400).json("Error occured while trying to fetch songs!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getMySongs = async (req, res) => {
  const userId = req.user._id;

  try {
    const mySongs = await Song.find({ userId }).sort({ createdAt: -1 });

    if (mySongs) {
      res.status(200).json(mySongs);
    } else {
      res.status(400).json("Error occured while trying to fetch songs!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};

export const getSong = async (req, res) => {
  const { id } = req.params;

  try {
    const song = await Song.findById(id);

    if (song) {
      res.status(200).json(song);
    } else {
      res.status(400).json("Error while fetching song by id!");
    }
  } catch (error) {
    res.status(500).json(error.message || "Internal Server Error!");
  }
};
