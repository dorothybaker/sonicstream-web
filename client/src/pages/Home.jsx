import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import { API } from "../utils/makeRequest";
import PageContent from "../components/PageContent";
import Loading from "../components/Loading";
import usePlayer from "../hooks/usePlayer";

function Home() {
  const { data: songs, isLoading } = useQuery({
    queryKey: ["allSongs"],
    queryFn: async () => {
      try {
        const res = await API.get("/songs/all");

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const player = usePlayer();

  return (
    <div
      className={`bg-neutral-900 overflow-hidden overflow-y-auto w-full rounded-lg h-full ${
        player.activeId && "pb-[80px]"
      }`}
    >
      <Header>
        <div className="mb-2">
          <h1 className="text-white sm:text-3xl text-2xl">
            Welcome to Sonicstream!
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItem
              image={
                "https://github.com/ajfm88/spotify-clone/blob/main/public/images/liked.png?raw=true"
              }
              name={"Liked Songs"}
              href={"/liked"}
            />
          </div>
        </div>
      </Header>
      <div className="my-2 px-4 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="sm:text-2xl text-xl text-white">Latest top songs</h1>
          </div>
          {isLoading ? (
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <Loading key={idx} />
              ))}
            </div>
          ) : (
            <PageContent songs={songs?.slice(0, 6)} />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h1 className="sm:text-2xl text-xl text-white">
              Throwbacks for you
            </h1>
          </div>
          {isLoading ? (
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <Loading key={idx} />
              ))}
            </div>
          ) : (
            <PageContent songs={songs?.slice(6)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
