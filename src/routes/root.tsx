import { Leva, useControls } from "leva";
import { Outlet, useOutletContext } from "react-router-dom";

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
  const ctrls = useControls("Views", {
    startMenu: true,
    timeInterface: true,
    menuBox: true,
    devFeatures: true,
  });

  return (
    <>
      {!devGUI && <Leva hidden={true} />}
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