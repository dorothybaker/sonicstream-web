import usePlayer from "./usePlayer";

const useOnPlay = (songs) => {
  const player = usePlayer();

  const onPlay = (id) => {
    player.setId(id);
    player.setIds(songs.map((song) => song._id));
  };

  return onPlay;
};

export default useOnPlay;
