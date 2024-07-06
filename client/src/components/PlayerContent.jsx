import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import {
  AiFillBackward,
  AiFillForward,
  AiOutlineLoading,
} from "react-icons/ai";
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

import { useEffect, useState } from "react";
import useSound from "use-sound";

import usePlayer from "../hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";

function PlayerContent({ song, isLoading }) {
  const player = usePlayer();

  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? IoVolumeMute : IoVolumeHigh;

  const onPlayNext = () => {
    if (player.ids.length === 0) return;

    const currentIdx = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIdx + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.ids.length === 0) return;

    const currentIdx = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIdx - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  };

  const [play, { pause, sound }] = useSound(song?.song, {
    volume: volume,
    onplay: () => setIsPlaying(true),
    onend: () => {
      setIsPlaying(false);
      onPlayNext(9);
    },
    onpause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    sound?.play();

    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-x-7 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem song={song} />
          <LikeButton songId={song?._id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center gap-x-3">
        <div>
          <AiFillBackward
            onClick={onPlayPrevious}
            size={25}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
        <div>
          <div
            onClick={handlePlay}
            className="size-9 flex items-center justify-center bg-white p-1 cursor-pointer rounded-full"
          >
            <Icon size={25} color="black" />
          </div>
        </div>
        <div>
          <AiFillForward
            onClick={onPlayNext}
            size={25}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>
      </div>

      <div className="hidden h-full md:flex justify-center items-center w-full max-w-[722px] gap-x-6">
        <AiFillBackward
          onClick={onPlayPrevious}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={!isLoading && handlePlay}
          aria-disabled={isLoading}
          className="size-10 flex items-center justify-center bg-white p-1 cursor-pointer rounded-full"
        >
          {isLoading ? (
            <AiOutlineLoading
              className="animate-spin"
              size={24}
              color="black"
            />
          ) : (
            <Icon size={28} color="black" />
          )}
        </div>
        <AiFillForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer"
            size={25}
          />
          <Slider value={volume} onChange={(value) => setVolume(value)} />
        </div>
      </div>
    </div>
  );
}

export default PlayerContent;
