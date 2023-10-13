import clsx from "clsx";
import React, { type PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
  icon: string;
  intent: "secondary" | "accent";
  onClick?: () => void;
  position?: "bottom-right";
}

const Button: React.FC<ButtonProps> = ({
  intent,
  icon,
  onClick,
  children,
  position,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-4 rounded-xl py-3 pl-4 pr-5 text-xl font-semibold leading-none",
        {
          "bg-accent-500 text-tertiary-900": intent === "accent",
          "bg-secondary-500 text-tertiary-900": intent === "secondary",
          "fixed bottom-4 right-16 thin:relative thin:bottom-0 thin:right-0":
            position === "bottom-right",
        }
      )}
    >
      <img src={`/icons/${icon}.svg`} alt={`${children} button icon`} />
      <span>{children}</span>
    </button>
  );
};

export default Button;
