import { Leva, useControls } from "leva";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import SessionTimeInterface from "../interface/SessionTimeInterface";
import { SessionLog } from "../interface/menuSections/SessionLog";
import Menu from "../interface/ui/Menu";
import { useBoundStore } from "../store/useBoundStore";
import { getRoute } from "../utils/getRoute";
import PetSelectMenu from "../interface/menuSections/PetSelectMenu";
import CosmeticSelectMenu from "../interface/menuSections/CosmeticSelectMenu";
import Button from "../interface/ui/Button";

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
  const { stop } = useBoundStore((state) => ({
    stop: state.stop,
    isRunning: state.isRunning,
  }));

  const location = useLocation();
  const { path, rootLayout } = getRoute(location);

  const ctrls = useControls("Views", {
    startMenu: true,
    timeInterface: true,
    menuBox: true,
    devFeatures: devGUI,
  });

  return (
    <div className="flex h-screen flex-col">
      {!devGUI && <Leva hidden={true} />}
      <header className="flex justify-between bg-primary-100 px-4 py-1">
        {path !== "/customize" && (
          <Link to="../customize">
            <button className="flex gap-1" onClick={stop}>
              <img
                src="/icons/customize-x24-tertiary-800.svg"
                className="h-6"
              />
              Shop
            </button>
          </Link>
        )}
        <LoginButton />
        <LogoutButton />
        {path === "/customize" && (
          <Link to="../">
            <button className="flex gap-1">Start</button>
          </Link>
        )}
        {path === "/focus-session" && (
          <Link to="../">
            <button className="flex gap-1" onClick={stop}>
              <img src="/icons/stop-tertiary-900.svg" className="h-6" />
              Stop
            </button>
          </Link>
        )}
      </header>
      {ctrls.timeInterface && <SessionTimeInterface />}

      <main className="relative flex h-full flex-col items-center justify-between bg-tertiary-300 sm:h-screen">
        <Outlet context={{ ctrls } satisfies ContextType} />
      </main>
      {rootLayout === "default" && (
        <aside className="fixed bottom-0 flex w-full flex-1 flex-col items-center justify-center gap-2 sm:bottom-4">
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
      {rootLayout === "shop" && (
        <aside className="fixed bottom-0 flex w-full flex-1 flex-col items-center justify-center gap-2 sm:bottom-4">
          <Menu
            tabs={[
              {
                icon: "customize-tertiary-800",
                component: <PetSelectMenu />,
              },
              {
                icon: "backpack-tertiary-800",
                component: <CosmeticSelectMenu />,
              },
            ]}
          />
        </aside>
      )}
    </div>
  );
}

function LoginButton() {
  return (
    <a
      href={import.meta.env.VITE_API_BASE_URL + "/auth/google"}
      rel="noreferrer"
    >
      <Button icon="note-tertiary-800" intent="primary" variant="tiny">
        Sign in with Google
      </Button>
    </a>
  );
}

function LogoutButton() {
  const handleLogout = () => {
    fetch(import.meta.env.VITE_API_BASE_URL + "/logout", {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = "/";
        } else {
          console.error("Logout failed");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <Button
      icon="stop-tertiary-900"
      intent="secondary"
      variant="tiny"
      onClick={handleLogout}
    >
      Sign out
    </Button>
  );
}

export function useGUI() {
  return useOutletContext<ContextType>();
}
