import * as React from "react";
import { cn } from "@/src/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, id, type = "text", ...props }, ref) => {
    return (
      <div className="w-60 h-12 relative flex rounded-xl">
        <input
          id={id}
          type={type}
          className={cn(
            "peer w-full outline-none px-4 text-base rounded-xl bg-secondary border border-[#4070f4] focus:shadow-md",
            className,
          )}
          ref={ref}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute top-1/2 -translate-y-1/2 bg-secondary left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
        >
          {props.placeholder}
        </label>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
