import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthModal from "../hooks/useAuthModal";
import { useEffect, useState } from "react";

import { GoHeart, GoHeartFill } from "react-icons/go";
import { API } from "../utils/makeRequest";

function LikeButton({ songId }) {
  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const authModal = useAuthModal();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const checkLiked = () => {
      const likedIds = user?.likedSongs?.map((song) => {
        return song._id;
      });

      if (likedIds.includes(songId)) {
        setIsLiked(true);
      }
    };

    checkLiked();
  }, [songId, user]);

  const Icon = isLiked ? GoHeartFill : GoHeart;

  const queryClient = useQueryClient();
  const { mutate: likeFunction, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.put(`/users/${songId}`);

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }
    },
  });

  const handleLike = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      likeFunction();
      setIsLiked(false);
    } else {
      likeFunction();
      setIsLiked(true);
    }
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className="disabled:cursor-not-allowed"
    >
      <Icon size={24} color={isLiked ? "#22c55e" : "white"} />
    </button>
  );
}

export default LikeButton;
