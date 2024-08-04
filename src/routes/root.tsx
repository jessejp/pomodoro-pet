import { Leva, useControls } from "leva";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import SessionTimeInterface from "../interface/SessionTimeInterface";
import { SessionLog } from "../interface/menuSections/SessionLog";
import Menu from "../interface/ui/Menu";
import { getRoute } from "../utils/getRoute";
import { useBoundStore } from "../store/useBoundStore";

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
  const {stop} = useBoundStore((state) => ({
    stop: state.stop
  }));
  const location = useLocation();
  const route = getRoute(location);
  const ctrls = useControls("Views", {
    startMenu: true,
    timeInterface: true,
    menuBox: true,
    devFeatures: devGUI,
  });

  return (
    <div className="flex flex-col h-screen">
      {!devGUI && <Leva hidden={true} />}
      <header className="flex justify-between bg-primary-100 py-1 px-4">
          {route.path !== "/customize" && (
            <Link to="/customize">
              <button
                className="flex gap-1"
                onClick={stop}
              >
                <img src="/icons/customize-x24-tertiary-800.svg" className="h-6" />
                Shop
              </button>
            </Link>
          )}
          {route.path === "/customize" && (
            <Link to="/">
              <button
                className="flex gap-1"
              >
                Start
              </button>
            </Link>
          )}
          {route.path === "/focus-session" && (
              <button
                className="flex gap-1"
                onClick={stop}
              >
                <img src="/icons/stop-tertiary-900.svg" className="h-6" />
                Stop
              </button>
          )}
      </header>
      {ctrls.timeInterface && <SessionTimeInterface />}

      <main className="relative flex h-full sm:h-screen flex-col items-center justify-between bg-tertiary-300">
        <Outlet context={{ ctrls } satisfies ContextType} />
      </main>
      {route.rootLayout === "default" && (
        <aside className="flex w-full flex-1 flex-col items-center justify-center gap-2 fixed bottom-0 sm:bottom-4">
          <Menu
            tabs={[
              {
                icon: "note-tertiary-800",
                component: <SessionLog />,
              },
            ]}
          />
        </aside>
      )}
    </div>
  );
}
// hello
export function useGUI() {
  return useOutletContext<ContextType>();
}
