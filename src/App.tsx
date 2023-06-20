import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import Timer from "./interface/Timer";

function App() {
  return (
    <>
      <Timer />
      <Canvas camera={
        {
          fov: 50,
          near: 0.05,
          far: 1000,
          position: [0.8, 0.9, 3]
        }
      }>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
