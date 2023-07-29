import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import {
  PresentationControls,
} from "@react-three/drei";
import { usePomodoro } from "../utils/usePomodoro";
import { Room } from "./Room";
import Monkey from "./Monkey";

function Scene() {
  const { pomodoroPhase } = usePomodoro();
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0.1, 0.8, 3.2);
    camera.lookAt(0, 0.66, 0);
  });

  return (
    <>
      {/* <color attach="background" args={["#ffc222"]} /> */}
      <ambientLight intensity={0.8} />
      <PresentationControls enabled={pomodoroPhase !== "none"} snap={true}>
        <directionalLight position={[0, 1.6, -2]} intensity={0.15} />
        <Room />
        <Monkey />
      </PresentationControls>
    </>
  );
}

export default Scene;
