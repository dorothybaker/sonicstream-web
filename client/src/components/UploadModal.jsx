import { useState } from "react";
import useUploadModal from "../hooks/useUploadModal";
import Modal from "./Modal";
import UploadSong from "./UploadSong";
import UploadImage from "./UploadImage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "../utils/makeRequest";

function UploadModal() {
  const { isOpen, onClose } = useUploadModal();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [song, setSong] = useState(null);
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");

  const onChange = (open) => {
    if (!open) {
      onClose();
    }
  };

  const queryClient = useQueryClient();

  const { mutate: createSong, isPending: creatingSong } = useMutation({
    mutationFn: async () => {
      try {
        const res = await API.post("/songs/create", {
          title,
          author,
          song,
          image,
        });

        if (res.status === 201) {
          const data = res.data;

          setAuthor("");
          setImage(null);
          setSong(null);
          setTitle("");
          setError("");

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: (data) => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ["allSongs"] });
        queryClient.invalidateQueries({ queryKey: ["mySongs"] });
        onClose();
      }
    },
  });

  const uploadSong = () => {
    // Upload song
    createSong();
  };

  return (
    <Modal
      title={"Add a new song"}
      description={"Upload a [.mp3] file to create a new song."}
      isOpen={isOpen}
      onChange={onChange}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          uploadSong();
        }}
        className="flex flex-col gap-y-5"
      >
        {error && (
          <span className="text-sm font-normal text-rose-500">{error}</span>
        )}
        <div>
          <input
            type="text"
            placeholder="Song title"
            id="title"
            className="h-12 w-full bg-neutral-700 px-3 outline-none rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Song author"
            id="title"
            className="h-12 w-full bg-neutral-700 px-3 outline-none rounded-lg"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <UploadSong song={song} setSong={setSong} />
        <UploadImage image={image} setImage={setImage} />

        <button
          type="submit"
          className="h-12 bg-[#22c55e] text-black font-medium flex items-center justify-center rounded-lg"
          disabled={creatingSong}
        >
          {creatingSong ? (
            <span className="text-white/80 animate-pulse">
              Creating new song
            </span>
          ) : (
            "Create new song"
          )}
        </button>
      </form>
    </Modal>
  );
}

export default UploadModal;
