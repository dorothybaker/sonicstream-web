import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const Button = forwardRef(
  ({ className, children, type = "button", disabled, ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `w-full rounded-full hover:opacity-75 text-black transition disabled:opacity-50 bg-[#22c55e] px-3 py-2 disabled:cursor-not-allowed border border-transparent`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
