import { GoGear, GoSearch } from "react-icons/go";
import {
  IoArrowBack,
  IoArrowForward,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "../hooks/useAuthModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";
import useUploadModal from "../hooks/useUploadModal";

function Header({ children, className }) {
  const authModal = useAuthModal();

  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const queryClient = useQueryClient();

  const { mutate: signout, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/auth/signout", {});

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
        queryClient.invalidateQueries({ queryKey: ["mySongs"] });
      }
    },
  });

  const handleLogout = () => {
    signout();
    window.location.reload();
  };

  const navigate = useNavigate();

  const uploadModal = useUploadModal();

  const handleUpload = () => {
    if (!user) {
      return authModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 px-4 py-6`,
        className
      )}
    >
      <div className="w-full flex items-center justify-between mb-4">
        <div className="hidden md:flex items-center gap-x-3">
          <button
            className="size-8 bg-black flex items-center justify-center rounded-full"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack size={15} color="white" />
          </button>
          <button
            className="size-8 bg-black flex items-center justify-center rounded-full"
            onClick={() => navigate(1)}
          >
            <IoArrowForward size={15} color="white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-3 items-center">
          <button
            className="size-8 bg-white flex items-center justify-center rounded-full hover:opacity-75 transition"
            onClick={() => navigate("/")}
          >
            <GoGear size={21} color="black" />
          </button>
          <button
            className="size-8 bg-white flex items-center justify-center rounded-full hover:opacity-75 transition"
            onClick={() => navigate("/search")}
          >
            <GoSearch size={19} color="black" />
          </button>
          {user && (
            <button
              className="size-8 bg-white flex items-center justify-center rounded-full hover:opacity-75 transition"
              onClick={handleUpload}
            >
              <IoCloudUploadOutline size={18} color="black" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-x-3">
          {user ? (
            <>
              <Button
                className="bg-transparent text-white px-0 py-0 text-lg font-normal"
                onClick={handleLogout}
              >
                Sign out
              </Button>
              {/* {user && (
                <div>
                  <div className="size-10">
                    <img
                      src={`https://avatar.iran.liara.run/username?username=${
                        user.fullName.split(" ")[0][0]
                      }+${user.fullName.split(" ")[1][0]}`}
                      alt=""
                      className="size-10 rounded-full"
                    />
                  </div>
                </div>
              )} */}
            </>
          ) : (
            <>
              <div>
                <Button
                  className="bg-transparent text-[#22c55e] px-0 py-0 text-lg font-normal"
                  onClick={authModal.onOpen}
                >
                  Sign in
                </Button>
              </div>
              <div>
                <Button
                  className="bg-transparent text-neutral-300 px-0 py-0 text-lg font-normal"
                  onClick={authModal.onOpen}
                >
                  Sign up
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default Header;
