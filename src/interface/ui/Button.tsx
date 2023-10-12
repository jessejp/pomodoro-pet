import React, { type PropsWithChildren } from "react";

interface ButtonProps extends PropsWithChildren {
    icon: string;
    intent: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = () => {
  return <div>Button</div>;
};

export default Button;
