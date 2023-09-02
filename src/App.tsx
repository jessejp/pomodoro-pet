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
      await Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          return setNotificationsPermission(permission);
        }
      });
    };
    notificationPermission();
  });
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
