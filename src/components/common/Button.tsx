import type React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#4ade80] focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none h-10 py-2 px-4 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}