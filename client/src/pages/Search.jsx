import { useState } from "react";
import Header from "../components/Header";
import SearchContent from "./main_components/SearchContent";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import usePlayer from "../hooks/usePlayer";

function Search() {
  const [search, setSearch] = useState("");

  const { data: songs, isLoading } = useQuery({ queryKey: ["allSongs"] });

  const player = usePlayer();

  return (
    <div
      className={`bg-neutral-900 overflow-hidden overflow-y-auto w-full sm:rounded-lg h-full ${
        player.activeId && "pb-[80px]"
      }`}
    >
      <Header>
        <div className="flex flex-col gap-y-5">
          <h1 className="text-white text-2xl">Search songs</h1>
          <div>
            <input
              type="text"
              placeholder="What song do you want to listen to?"
              className="h-12 bg-white/15 outline-none font-normal w-full rounded-lg px-3 ellipsis"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
        <SearchContent search={search} songs={songs} />
      )}
    </div>
  );
}

export default Search;
