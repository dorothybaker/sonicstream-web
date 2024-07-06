import { useEffect, useRef } from "react";

function UploadSong({ song, setSong }) {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "djin7iczh",
        uploadPreset: "e3xcyubv",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setSong(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm">Select a song file</label>
      <button
        className="h-12 w-full bg-neutral-700 px-3 outline-none rounded-lg text-gray-400 text-start"
        onClick={() => widgetRef.current?.open()}
        type="button"
      >
        <span className="line-clamp-1 truncate">
          {song ? song : "Choose a file : No file chosen"}
        </span>
      </button>
    </div>
  );
}

export default UploadSong;
