import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import SessionTimeInterface from "./interface/SessionTimeInterface";
import SessionLog from "./interface/SessionLog";
import Menu from "./interface/components/Menu";
import StartSessionMainMenu from "./interface/StartSessionMainMenu";
import Customization from "./interface/Customization";
import { useBoundStore } from "./store/useBoundStore";

function App() {
  const { pomodoroPhase, isModelLoaded } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
    isModelLoaded: state.isModelLoaded,
  }));

  return (
    <>
      {pomodoroPhase === "none" && <StartSessionMainMenu />}
      {pomodoroPhase !== "none" && <SessionTimeInterface />}

      <div className="flex h-screen flex-col flex-wrap">
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
          <Menu
            tabs={[
              { icon: "➖", component: <div className="hidden"></div> },
              {
                icon: "📝",
                component: <SessionLog />,
              },
              {
                icon: "👕",
                component: <Customization />,
              },
            ]}
          />
        )}
      </div>
    </>
  );
}

export default App;
