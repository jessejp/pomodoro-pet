import clsx from "clsx";
import React, { type PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  icon: string;
  intent: "primary" | "secondary" | "accent";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ intent, icon, onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-4 rounded-xl px-4 py-3 text-xl font-semibold leading-none",
        {
          "bg-accent-500 text-tertiary-900": intent === "accent",
        }
      )}
    >
      <img src={`/icons/${icon}.svg`} alt={`${children} button icon`} />
      <span>{children}</span>
    </button>
  );
};

export default Button;
