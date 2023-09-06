import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { usePomodoro } from "../utils/usePomodoro";
import { Room } from "./world/Room";
import Monkey from "./pets/Monkey";
import Chair from "./world/furniture/ChairSoft1"

function Scene() {
  const { pomodoroPhase } = usePomodoro();
  const { camera } = useThree();

  useEffect(() => {
    if (pomodoroPhase === "none") {
      camera.position.set(0, 1.1, 4.2);
      camera.lookAt(0, 0.7, 0);
    } else {
      camera.position.set(0.1, 0.8, 3.2);
      camera.lookAt(0, 0.66, 0);
    }
  });

  return (
    <>
      {/* <color attach="background" args={["#ffc222"]} /> */}
      <ambientLight intensity={1} />
      <PresentationControls enabled={pomodoroPhase !== "none"} snap={true}>
        <directionalLight position={[0, 1.6, -2]} intensity={0.25} />
        <Room />
        <Chair />
        <Monkey />
      </PresentationControls>
    </>
  );
}

export default Scene;
