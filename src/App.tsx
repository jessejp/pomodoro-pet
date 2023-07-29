import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import TimeInterface from "./interface/TimeInterface";

function App() {
  return (
    <>
      <TimeInterface />
      <Canvas
        camera={{
          fov: 50,
          near: 0.05,
          far: 15,
        }}
        flat
      >
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
