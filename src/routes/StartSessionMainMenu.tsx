import { useState } from "react";
import ConfigSession from "./ConfigSession";
import clsx from "clsx";
import CustomizePet from "./CustomizePet";

const StartSessionMainMenu = () => {
  const [showCharacterCustomization, setShowCharacterCustomization] =
    useState(false);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center gap-16 bg-tertiary-300 short:justify-end short:gap-8 xshort:gap-4">
      <button
        className={clsx(
          "fixed top-0 z-10 mr-8 mt-8 grid place-content-center self-end rounded-full  p-4 hover:scale-105  thin:p-3",
          {
            "bg-primary-200 hover:bg-primary-100": !showCharacterCustomization,
            "hover:bg-cool-100 bg-cool-150": showCharacterCustomization,
          }
        )}
        onClick={() => {
          setShowCharacterCustomization(!showCharacterCustomization);
        }}
      >
        {!showCharacterCustomization && (
          <img
            className="h-8 w-8"
            src={`/icons/customize-x24-tertiary-800.svg`}
            alt={`customize character button`}
          />
        )}
        {showCharacterCustomization && (
          <img
            className="h-8 w-8"
            src={`/icons/close-x24-tertiary-800.svg`}
            alt={`close character customization button`}
          />
        )}
      </button>
      {!!showCharacterCustomization && <CustomizePet />}
      {!showCharacterCustomization && <ConfigSession />}
    </div>
  );
};

export default StartSessionMainMenu;
