import LikeButton from "../../components/LikeButton";
import MediaItem from "../../components/MediaItem";
import useOnPlay from "../../hooks/useOnPlay";

function SearchContent({ songs, search }) {
  const filteredSongs = songs?.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.author.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredSongs?.length === 0) {
    return <div className="text-neutral-400 px-4">No songs found!</div>;
  }

  const onPlay = useOnPlay(filteredSongs);

  return (
    <div className="px-4 flex flex-col gap-y-4 pb-2">
      {filteredSongs?.map((song) => (
        <div key={song._id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id) => onPlay(id)} song={song} />
          </div>

          <LikeButton songId={song._id} />
        </div>
      ))}
    </div>
  );
}

export default SearchContent;
