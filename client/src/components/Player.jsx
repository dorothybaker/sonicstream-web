import usePlayer from "../hooks/usePlayer";
import useGetSongById from "../hooks/useGetSongById";
import PlayerContent from "./PlayerContent";

function Player() {
  const player = usePlayer();

  const { song, isLoading } = useGetSongById(player.activeId);

  if (!song || !player.activeId) {
    return null;
  }

  return (
    <div className="max-w-[1500px] mx-auto w-full py-2 h-[80px] px-4 fixed bg-black bottom-0">
      {isLoading ? (
        "loading"
      ) : (
        <PlayerContent key={song?.song} song={song} isLoading={isLoading} />
      )}
    </div>
  );
}

export default Player;
