import { GoMultiSelect, GoPlay, GoTasklist } from "react-icons/go";
import { IoCloudUploadOutline } from "react-icons/io5";
import useAuthModal from "../hooks/useAuthModal";
import { useQuery } from "@tanstack/react-query";
import useUploadModal from "../hooks/useUploadModal";
import { API } from "../utils/makeRequest";
import Loading from "./Loading";
import MediaItem from "./MediaItem";
import useOnPlay from "../hooks/useOnPlay";
import usePlayer from "../hooks/usePlayer";

function Library() {
  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const handleUpload = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  const { data: songs, isLoading } = useQuery({
    queryKey: ["mySongs"],
    queryFn: async () => {
      try {
        const res = await API.get("/songs/mySongs");

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onPlay = useOnPlay(songs);

  const player = usePlayer();

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row items-center justify-between gap-x-4 px-4 pt-4">
        <div className="inline-flex items-center gap-x-3 text-neutral-300">
          <GoTasklist size={22} />
          <span className="text-neutral-100 text-lg">Your Library</span>
        </div>
        <button
          className="size-7 rounded-full bg-neutral-400 hover:bg-white transition flex items-center justify-center"
          onClick={handleUpload}
        >
          <IoCloudUploadOutline size={17} className="text-black" />
        </button>
      </div>

      <div
        className={`flex flex-col gap-y-3 ${
          player.activeId ? "pb-[88px]" : "pb-[8px]"
        } px-3 h-full`}
      >
        {isLoading ? (
          <div className="flex flex-col gap-2 overflow-x-hidden overflow-y-hidden">
            {[1, 2, 3, 4].map((idx) => (
              <Loading key={idx} />
            ))}
          </div>
        ) : user ? (
          songs?.map((song) => (
            <MediaItem
              key={song._id}
              song={song}
              onClick={(id) => onPlay(id)}
            />
          ))
        ) : (
          <div className="text-neutral-400">No songs available!</div>
        )}
      </div>
    </div>
  );
}

export default Library;
