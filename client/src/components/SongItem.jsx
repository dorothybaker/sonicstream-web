import { IoPlay } from "react-icons/io5";

function SongItem({ song, onClick }) {
  return (
    <div
      onClick={() => onClick(song._id)}
      className="flex items-center gap-x-2.5 cursor-pointer relative group"
    >
      <div>
        <div className="relative w-[64px]">
          <img
            src={song.image}
            alt=""
            className="w-[64px] h-[64px] object-cover rounded-lg"
          />
          <div className="absolute opacity-0 transition flex items-center justify-center bg-[#22c55e] size-10 drop-shadow-md left-3 top-3 group-hover:opacity-100 rounded-full">
            <IoPlay size={17} color="white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col pr-2 gap-0.5">
        <p className="text-white line-clamp-1 lg:text-lg md:text-base text-lg  font-normal">
          {song.title}
        </p>
        <p className="line-clamp-1 text-sm text-neutral-400 font-normal">
          {song.author}
        </p>
      </div>
    </div>
  );
}

export default SongItem;
