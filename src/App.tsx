import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import SessionTimeInterface from "./interface/SessionTimeInterface";
import { SessionLog } from "./interface/SessionLog";
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

  const ctrls = useControls("Views", {
    startMenu: true,
    timeInterface: true,
    menuBox: true,
    devFeatures: true,
  });

  console.log("App", "pomodoroPhase:", pomodoroPhase);

  return (
    <>
      {!devGUI && <Leva hidden={true} />}
      {(pomodoroPhase === "none") === ctrls.startMenu && (
        <StartSessionMainMenu />
      )}

      {pomodoroPhase !== "none" && (
        <>
          {ctrls.timeInterface && <SessionTimeInterface />}

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
                {devGUI && ctrls.devFeatures && <Perf position="top-left" />}
                {devGUI && ctrls.devFeatures && <axesHelper args={[1]} />}
                <Scene pomodoroPhase={pomodoroPhase} />
              </Canvas>
            </Suspense>
            {ctrls.menuBox && (
              <div className="fixed bottom-4 flex w-full items-end justify-center gap-2 thin:flex-col thin:items-center">
                <Menu
                  tabs={[
                    {
                      icon: "note-tertiary-800",
                      component: <SessionLog />,
                    },
                  ]}
                />
                <div className="absolute right-4 flex w-fit shrink thin:relative">
                  <Button
                    variant="big"
                    intent="secondary"
                    onClick={stop}
                    icon="stop-tertiary-900"
                  >
                    Stop
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;
