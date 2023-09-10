import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import TimeInterface from "./interface/TimeInterface";
import SessionLog from "./interface/SessionLog";
import Menu from "./interface/components/Menu";

function App() {
  return (
    <>
      <TimeInterface />
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
        <Menu
          tabs={[
            {
              icon: "📝",
              component: <SessionLog />,
            },
          ]}
        />
      </div>
    </>
  );
}

export default App;
