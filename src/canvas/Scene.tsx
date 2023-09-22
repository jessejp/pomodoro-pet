import { useThree, useFrame } from "@react-three/fiber";
import { PresentationControls } from "@react-three/drei";
import { usePomodoro } from "../utils/usePomodoro";
import { Room } from "./world/Room";
import Monkey from "./pets/Monkey";
import Chair from "./world/furniture/ChairSoft1";
import { Vector3 } from "three";
import { useEffect, useState } from "react";

const camPaths = [
  {
    from: new Vector3(0.1, 0.8, 3.2),
    to: new Vector3(-0.5, 1, 1),
    lookAt: new Vector3(0, 0.66, 0),
  },
  {
    from: new Vector3(1, 2, 0.8),
    to: new Vector3(1.5, 1.6, -0.5),
    lookAt: new Vector3(-1, 0.4, 0),
  },
  {
    from: new Vector3(-1.48, 1.2, 1),
    to: new Vector3(-2, 1.2, -1.4),
    lookAt: new Vector3(0, 0.6, 0),
  },
  {
    from: new Vector3(1, 1.4, -1),
    to: new Vector3(0.5, 0.5, -1),
    lookAt: new Vector3(-1, 0.6, -0.3),
  },
];

function Scene() {
  const [camPathIndex, setCamPathIndex] = useState(0);
  const { pomodoroPhase } = usePomodoro();
  const { camera } = useThree();

  useEffect(() => {
    const cameraAnimationInterval = setInterval(() => {
      setCamPathIndex((prev) => ++prev % camPaths.length);
    }, 6000);

    return () => {
      clearInterval(cameraAnimationInterval);
    };
  }, [setCamPathIndex]);

  useEffect(() => {
    if (pomodoroPhase === "none") {
      camera.position.set(0, 1.1, 4.2);
      camera.lookAt(0, 0.7, 0);
    } else {
      camera.position.set(
        camPaths[camPathIndex].from.x,
        camPaths[camPathIndex].from.y,
        camPaths[camPathIndex].from.z
      );
      camera.lookAt(
        camPaths[camPathIndex].lookAt.x,
        camPaths[camPathIndex].lookAt.y,
        camPaths[camPathIndex].lookAt.z
      );
    }
  }, [camera, camPathIndex, pomodoroPhase]);

  useFrame(({ camera }) => {
    if (pomodoroPhase !== "none")
      camera.position.lerp(camPaths[camPathIndex].to, 0.0005);
  });

  return (
    <>
      {/* <color attach="background" args={["#ffc222"]} /> */}
      <ambientLight intensity={1} />
      <PresentationControls
        enabled={pomodoroPhase !== "none"}
        snap={true}
        polar={[0, 0.1]}
        azimuth={[-1.4, 1.4]}
      >
        <directionalLight position={[0, 1.6, -2]} intensity={0.25} />
        <Room />
        <Chair />
        <Monkey />
      </PresentationControls>
    </>
  );
}

export default Scene;
