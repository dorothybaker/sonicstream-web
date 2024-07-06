import useOnPlay from "../hooks/useOnPlay";
import SongItem from "./SongItem";

function PageContent({ songs }) {
  const onPlay = useOnPlay(songs);

  return (
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
      {songs?.map((song) => (
        <SongItem key={song._id} song={song} onClick={(id) => onPlay(id)} />
      ))}
    </div>
  );
}

export default PageContent;
