import clsx from "clsx";
import { Leva, useControls } from "leva";
import { Outlet, useOutletContext, useLocation, Link } from "react-router-dom";

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

  const pageIsCustomize = location.pathname === "/customize";

  return (
    <>
      {!devGUI && <Leva hidden={true} />}
      <header>
        <Link to={pageIsCustomize ? "/" : "/customize"}>
          <div
            className={clsx(
              "fixed top-0 z-10 mr-8 mt-8 grid place-content-center self-end rounded-full  p-4 hover:scale-105  thin:p-3",
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
        </Link>
      </header>
      <main>
        <Outlet context={{ ctrls } satisfies ContextType} />
        <footer>
          <div>hello hello</div>
        </footer>
      </main>
    </>
  );
}

export function useGUI() {
  return useOutletContext<ContextType>();
}
