import { useQuery } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";
import { useMemo } from "react";

const getSongById = (id) => {
  const { data: song, isLoading } = useQuery({
    queryKey: ["song", id],
    queryFn: async () => {
      try {
        const res = await API.get(`/songs/${id}`);

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return useMemo(() => ({ song, isLoading }), [isLoading, song]);
};

export default getSongById;
