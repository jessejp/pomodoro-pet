import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import SessionTimeInterface from "./interface/SessionTimeInterface";
import SessionLog from "./interface/SessionLog";
import Menu from "./interface/components/Menu";
import { usePomodoro } from "./utils/usePomodoro";
import StartSessionMainMenu from "./interface/StartSessionMainMenu";

function App() {
  const { pomodoroPhase } = usePomodoro();
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
        {pomodoroPhase !== "none" && (
          <Menu
            tabs={[
              {
                icon: "📝",
                component: <SessionLog />,
              },
            ]}
          />
        )}
      </div>
    </>
  );
}

export default App;
