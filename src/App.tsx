import "./App.css";
import { Canvas } from "@react-three/fiber";
import Scene from "./canvas/Scene";
import TimeInterface from "./interface/TimeInterface";
import { useEffect } from "react";
import SessionLog from "./interface/SessionLog";
import { usePomodoro } from "./utils/usePomodoro";

function App() {
  const { setNotificationsPermission } = usePomodoro();
  useEffect(() => {
    const notificationPermission = async () => {
      const permission = await Notification.requestPermission();

      if (permission === "granted") setNotificationsPermission(permission);
    };
    notificationPermission();
  }, [setNotificationsPermission]);
  return (
    <>
      <TimeInterface />
      <SessionLog />
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
