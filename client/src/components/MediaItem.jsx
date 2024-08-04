function MediaItem({ song, onClick }) {
  const handleClick = () => {
    if (onClick) {
      return onClick(song?._id);
    }

    // TODO: Default turn on player
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-x-3 cursor-pointer"
    >
      <div>
        <div className="w-[52px] h-[52px] relative">
          <img
            src={song?.image}
            alt=""
            className="rounded-lg object-cover size-full"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="font-normal line-clamp-1 text-base">{song?.title}</p>
        <p className="font-normal text-sm line-clamp-1 text-neutral-400">
          {song?.author}
        </p>
      </div>
    </div>
  );
}

export default MediaItem;
