import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import SessionTimeInterface from "./interface/SessionTimeInterface";
import SessionLog from "./interface/SessionLog";
import Menu from "./interface/components/Menu";
import StartSessionMainMenu from "./interface/StartSessionMainMenu";
import { useBoundStore } from "./store/useBoundStore";
import Button from "./interface/ui/Button";
import { useControls, Leva } from "leva";
import { Perf } from "r3f-perf";
import { Suspense } from "react";

const devGUI = window.location.search === "?dev=1";

function App() {
  const { pomodoroPhase, stop } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
    stop: state.stop,
  }));

  const ctrls = useControls("App", {
    showStartMenu: true,
    showSessionTimeInterface: true,
    showMenu: true,
  });

  return (
    <>
      {!devGUI && <Leva hidden={true} />}
      {(pomodoroPhase === "none") === ctrls.showStartMenu && (
        <StartSessionMainMenu />
      )}

      {pomodoroPhase !== "none" && (
        <>
          {ctrls.showSessionTimeInterface && <SessionTimeInterface />}

          <div className="relative flex h-screen flex-col items-center bg-white">
            <Suspense
              fallback={
                <div className="flex h-screen w-screen items-center">
                  <div className="flex flex-col items-center">
                    <img
                      className="h-20 w-20"
                      src="/pomodoropet-logo-2-large.png"
                      alt="loading icon"
                    />
                    <div className="text-lg text-tertiary-800">LOADING</div>
                  </div>
                </div>
              }
            >
              <Canvas
                camera={{
                  fov: 50,
                  near: 0.025,
                  far: 15,
                }}
                flat={true}
              >
                {devGUI && <Perf position="top-left" />}
                <Scene devGUI={devGUI} />
              </Canvas>
            </Suspense>
            <div className="flex w-full flex-col items-center gap-2">
              <Menu
                isFixed={true}
                tabs={[
                  {
                    icon: "note-tertiary-800",
                    component: <SessionLog />,
                  },
                ]}
              />
              <Button
                position="bottom-right"
                intent="secondary"
                onClick={stop}
                icon="stop-tertiary-900"
              >
                Stop
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
