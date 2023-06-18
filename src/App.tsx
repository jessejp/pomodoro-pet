import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import Timer from "./interface/Timer";

function App() {
  const [count, setCount] = useState(0);

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
