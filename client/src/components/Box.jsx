import { twMerge } from "tailwind-merge";

function Box({ children, className }) {
  return (
    <div
      className={twMerge(`bg-neutral-900 h-fit w-full rounded-lg`, className)}
    >
      {children}
    </div>
  );
}

export default Box;
