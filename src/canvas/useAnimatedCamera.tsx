import { useControls } from "leva";
import { useState, useEffect } from "react";
import { Vector3 } from "three";
import { useBoundStore } from "../store/useBoundStore";
import { useFrame, useThree } from "@react-three/fiber";

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

export const useAnimatedCamera = () => {
  const { pomodoroPhase } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
  }));

  const [camPathIndex, setCamPathIndex] = useState(0);
  const animatedCamera = useControls("Scene.animatedCamera", {
    enabled: true,
    enableCustomizePath: false,
    from: { x: 0.1, y: 0.8, z: 3.2 },
    to: { x: -0.5, y: 1, z: 1 },
    lookAt: { x: 0, y: 0.66, z: 0 },
  });
  useEffect(() => {
    if (!animatedCamera.enabled) return;
    const cameraAnimationInterval = setInterval(() => {
      setCamPathIndex((prev) => ++prev % camPaths.length);
    }, 6000);

    return () => {
      clearInterval(cameraAnimationInterval);
    };
  }, [setCamPathIndex, animatedCamera.enabled]);

  const { camera } = useThree();

  useEffect(() => {
    if (pomodoroPhase === "none") {
      camera.position.set(0, 1.1, 4.2);
      camera.lookAt(0, 0.7, 0);
    } else {
      if (!animatedCamera.enableCustomizePath) {
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
      } else {
        camera.position.set(
          animatedCamera.from.x,
          animatedCamera.from.y,
          animatedCamera.from.z
        );
        camera.lookAt(
          animatedCamera.lookAt.x,
          animatedCamera.lookAt.y,
          animatedCamera.lookAt.z
        );
      }
    }
  }, [camera, camPathIndex, pomodoroPhase, animatedCamera]);

  useFrame(({ camera }) => {
    if (pomodoroPhase !== "none" && animatedCamera.enabled)
      camera.position.lerp(camPaths[camPathIndex].to, 0.0005);
  });
};
