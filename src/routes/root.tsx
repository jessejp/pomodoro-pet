import clsx from "clsx";
import { Leva, useControls } from "leva";
import { Outlet, useOutletContext, useLocation, Link } from "react-router-dom";
import SessionTimeInterface from "../interface/SessionTimeInterface";
import { SessionLog } from "../interface/menuSections/SessionLog";
import Button from "../interface/ui/Button";
import Menu from "../interface/ui/Menu";
import SessionSetup from "../interface/menuSections/SessionSetup";
import { Routes } from "../main";

const devGUI = window.location.search === "?dev=1";

type ContextType = {
  ctrls: {
    startMenu: boolean;
    timeInterface: boolean;
    menuBox: boolean;
    devFeatures: boolean;
  };
};

export function Root() {
  const location = useLocation();
  const ctrls = useControls("Views", {
    startMenu: true,
    timeInterface: true,
    menuBox: true,
    devFeatures: devGUI,
  });

  const pathname = location.pathname as Routes;
  console.log(pathname);

  return (
    <>
      {!devGUI && <Leva hidden={true} />}
      <header>
        {/* <Link to={pageIsCustomize ? "/" : "/customize"}>
          <div
            className={clsx(
              "fixed top-0 z-10 mr-8 mt-8 grid place-content-center self-end rounded-full p-4 hover:scale-105  thin:p-3",
              {
                "bg-primary-200 hover:bg-primary-100": !pageIsCustomize,
                "hover:bg-cool-100 bg-cool-150": pageIsCustomize,
              }
            )}
          >
            {!pageIsCustomize && (
              <img
                className="h-8 w-8"
                src={`/icons/customize-x24-tertiary-800.svg`}
                alt={`customize character button`}
              />
            )}
            {pageIsCustomize && (
              <img
                className="h-8 w-8"
                src={`/icons/close-x24-tertiary-800.svg`}
                alt={`close character customization button`}
              />
            )}
          </div>
        </Link> */}
      </header>
      {ctrls.timeInterface && <SessionTimeInterface />}

      <main className="relative flex h-screen flex-col items-center justify-between bg-white md:justify-start">
        <Outlet context={{ ctrls } satisfies ContextType} />

        {ctrls.menuBox && (
          <div className="relative flex w-full flex-col items-center justify-center gap-2 sm:fixed sm:bottom-4">
            <Menu
              tabs={[
                {
                  icon: "note-tertiary-800",
                  component: <SessionSetup />,
                },
                {
                  icon: "note-tertiary-800",
                  component: <SessionLog />,
                },
              ]}
            />
            {/* <div className="absolute right-4 flex w-fit shrink thin:relative">
              <Link to="/">
                <Button
                  variant="big"
                  intent="secondary"
                  onClick={stop}
                  icon="stop-tertiary-900"
                >
                  Stop
                </Button>
              </Link>
            </div> */}
          </div>
        )}
      </main>
    </>
  );
}

export function useGUI() {
  return useOutletContext<ContextType>();
}
