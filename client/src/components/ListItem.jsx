import { useQuery } from "@tanstack/react-query";
import { GoHeartFill } from "react-icons/go";
import { IoPlay } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuthModal from "../hooks/useAuthModal";

function ListItem({ image, name, href }) {
  const navigate = useNavigate();

  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const authModal = useAuthModal();

  const handleClick = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return navigate(href);
  };

  return (
    <button
      className="relative flex items-center rounded-md overflow-hidden gap-x-4 group bg-neutral-100/10 hover:bg-neutral-100/20 transition"
      onClick={handleClick}
    >
      <div className="relative h-[64px] w-[64px] bg-gradient-to-b from-[#22c55e] flex items-center justify-center">
        <GoHeartFill size={25} color="white" />
      </div>
      <p className="text-xl line-clamp-1">{name}</p>
      <div className="absolute opacity-0 transition flex items-center justify-center bg-[#22c55e] size-10 drop-shadow-md right-4 group-hover:opacity-100 hover:scale-105 rounded-full">
        <IoPlay size={17} color="white" />
      </div>
    </button>
  );
}

export default ListItem;
