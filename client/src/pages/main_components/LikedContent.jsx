import LikeButton from "../../components/LikeButton";
import MediaItem from "../../components/MediaItem";
import useOnPlay from "../../hooks/useOnPlay";

function LikedContent({ songs }) {
  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400 px-4">
        No liked songs available!
      </div>
    );
  }

  const onPlay = useOnPlay(songs);

  return (
    <div className="flex flex-col gap-y-4 px-4">
      {songs?.map((song) => (
        <div key={song._id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem song={song} onClick={(id) => onPlay(id)} />
          </div>
          <LikeButton songId={song._id} />
        </div>
      ))}
    </div>
  );
}

export default LikedContent;
