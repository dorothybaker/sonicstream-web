import { GoHeartFill } from "react-icons/go";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import LikedContent from "./main_components/LikedContent";
import usePlayer from "../hooks/usePlayer";

function Liked() {
  const { data: user, isLoading } = useQuery({ queryKey: ["authUser"] });

  const player = usePlayer();

  return (
    <div
      className={`bg-neutral-900 overflow-hidden overflow-y-auto w-full rounded-lg h-full ${
        player.activeId && "pb-[80px]"
      }`}
    >
      <Header>
        <div className="mt-7 flex items-center gap-x-3">
          <div className="h-[70px] w-[70px] bg-gradient-to-b from-[#22c55e] flex items-center justify-center rounded-lg">
            <GoHeartFill size={30} color="white" />
          </div>
          <div>
            <p className="text-neutral-400 font-normal text-base">Playlist</p>
            <p className="sm:text-3xl text-2xl text-white">Liked Songs</p>
          </div>
        </div>
      </Header>
      {isLoading ? (
        <div className="flex flex-col gap-4 px-4">
          {[1, 2, 3, 4, 5].map((idx) => (
            <Loading key={idx} />
          ))}
        </div>
      ) : (
        <LikedContent songs={user.likedSongs} />
      )}
    </div>
  );
}

export default Liked;
