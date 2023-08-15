import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import TimeInterface from "./interface/TimeInterface";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const notificationPermission = async () => {
      await Notification.requestPermission();
    };
    notificationPermission();
  });
  return (
    <>
      <TimeInterface />
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
    </>
  );
}

export default App;
