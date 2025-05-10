import clsx from "clsx";
import React, { type PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren, React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  intent: "primary" | "primary-light" | "secondary";
  variant: "big" | "tiny";
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  intent,
  icon,
  onClick,
  children,
  variant,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center justify-center whitespace-nowrap font-semibold leading-none",
        {
          "bg-accent-500 text-tertiary-900": intent === "primary",
          "bg-accent-400 text-tertiary-900": intent === "primary-light",
          "bg-secondary-500 text-tertiary-900": intent === "secondary",
          "w-full gap-4 rounded-xl py-3 pl-4 pr-5 text-xl thin:text-lg":
            variant === "big",
          "w-fit gap-2 rounded-lg py-1.5 pl-2 pr-3 text-sm": variant === "tiny",
        }
      )}
    >
      <img
        className={clsx({
          "h-8 w-8": variant === "big",
          "h-[1.125rem] w-[1.125rem]": variant === "tiny",
        })}
        src={`/icons/${icon}.svg`}
        alt={`${children} button icon`}
      />
      <span>{children}</span>
    </button>
  );
};

export default Button;
