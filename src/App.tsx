import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import SessionTimeInterface from "./interface/SessionTimeInterface";
import SessionLog from "./interface/SessionLog";
import Menu from "./interface/components/Menu";
import StartSessionMainMenu from "./interface/StartSessionMainMenu";
import Customization from "./interface/Customization";
import { useBoundStore } from "./store/useBoundStore";
import Button from "./interface/ui/Button";

function App() {
  const { pomodoroPhase, isModelLoaded, stop } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
    isModelLoaded: state.isModelLoaded,
    stop: state.stop,
  }));

  return (
    <>
      {pomodoroPhase === "none" && <StartSessionMainMenu />}
      {pomodoroPhase !== "none" && <SessionTimeInterface />}

      <div className="relative flex h-screen flex-col items-center bg-white">
        <Canvas
          camera={{
            fov: 50,
            near: 0.05,
            far: 15,
          }}
          flat={true}
        >
          <Scene />
        </Canvas>
        {!isModelLoaded && (
          <div className="absolute z-20 flex h-screen w-full items-center justify-center">
            <div>
              <img src="/pomodoropet-logo-2-large.png" />
            </div>
          </div>
        )}
        {pomodoroPhase !== "none" && (
          <div className="w-full flex flex-col items-center gap-2">
            <Menu
              tabs={[
                {
                  icon: "note-tertiary-800",
                  component: <SessionLog />,
                },
                {
                  icon: "customize-tertiary-800",
                  component: <Customization />,
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
        )}
      </div>
    </>
  );
}

export default App;
