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
      <Canvas>
        <Scene />
      </Canvas>
    </>
  );
}

export default App;
