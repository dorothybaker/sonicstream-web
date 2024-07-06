function Loading() {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-neutral-400/5 h-[64px] w-[100px] animate-ping rounded-s-sm transition" />
      <div className="bg-neutral-400/5 h-[64px] w-full animate-ping rounded-e-sm transition" />
    </div>
  );
}

export default Loading;
