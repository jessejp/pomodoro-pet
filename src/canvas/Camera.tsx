import { useControls } from "leva";
import { useState, useEffect } from "react";
import { Vector3 } from "three";
import { useBoundStore } from "../store/useBoundStore";
import { useFrame, useThree } from "@react-three/fiber";
import type { PomodoroTimerParams } from "../store/types";

type PomodoroPhases = PomodoroTimerParams["pomodoroPhase"];

type CameraPath = {
  pomodoroPhase: PomodoroPhases;
  from: Vector3;
  to: Vector3;
  lookAt: Vector3;
};

const camPaths: CameraPath[] = [
  {
    pomodoroPhase: "work",
    from: new Vector3(0.1, 0.8, 3.2),
    to: new Vector3(-0.5, 1, 1),
    lookAt: new Vector3(0, 0.66, 0),
  },
  {
    pomodoroPhase: "work",
    from: new Vector3(1, 2, 0.8),
    to: new Vector3(1.5, 1.6, -0.5),
    lookAt: new Vector3(-1, 0.4, 0),
  },
  {
    pomodoroPhase: "work",
    from: new Vector3(-1.48, 1.2, 1),
    to: new Vector3(-2, 1.2, -1.4),
    lookAt: new Vector3(0, 0.6, 0),
  },
  {
    pomodoroPhase: "work",
    from: new Vector3(1, 1.4, -1),
    to: new Vector3(0.5, 0.5, -1),
    lookAt: new Vector3(-1, 0.6, -0.3),
  },
  {
    pomodoroPhase: "break",
    from: new Vector3(1.0, 0.8, 2.5),
    to: new Vector3(-2.0, 1.0, 1.1),
    lookAt: new Vector3(0.3, 0.5, 0),
  },
];

const Camera = () => {
  const { pomodoroPhase } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
  }));
  const { camera } = useThree();
  const [camPathIndex, setCamPathIndex] = useState(0);

  const ctrls = useControls("Scene.animatedCamera", {
    enabled: true,
    isCustomPath: false,
    from: { x: 0.1, y: 1.8, z: 2 },
    to: { x: 0.1, y: 0.2, z: 3 },
    lookAt: { x: 0, y: 1, z: 0 },
  });

  const customPaths: CameraPath[] = [
    {
      pomodoroPhase: "work",
      from: new Vector3(ctrls.from.x, ctrls.from.y, ctrls.from.z),
      to: new Vector3(ctrls.to.x, ctrls.to.y, ctrls.to.z),
      lookAt: new Vector3(ctrls.lookAt.x, ctrls.lookAt.y, ctrls.lookAt.z),
    },
  ];
  // customPaths needs atleast 2 elements to loop
  customPaths.push({ ...customPaths[0], pomodoroPhase: "break" });

  const camPathsSwitch = !ctrls.isCustomPath ? camPaths : customPaths;
  const activeCamPaths = camPathsSwitch.filter(
    (path) => path.pomodoroPhase === pomodoroPhase
  );
  if (activeCamPaths.length === 1) activeCamPaths.push(activeCamPaths[0]);

  useEffect(() => {
    if (!ctrls.enabled || !activeCamPaths.length) return;
    const cameraAnimationInterval = setInterval(() => {
      setCamPathIndex((prev) => ++prev % activeCamPaths.length);
    }, 6000);

    if (pomodoroPhase === "none")
      return () => clearInterval(cameraAnimationInterval);

    return () => {
      clearInterval(cameraAnimationInterval);
    };
  }, [setCamPathIndex, ctrls.enabled, activeCamPaths, pomodoroPhase]);

  const CappedCamPathIndex = camPathIndex % activeCamPaths.length;

  useEffect(() => {
    if (pomodoroPhase === "none") {
      camera.position.set(0, 1.1, 4.2);
      camera.lookAt(0, 0.7, 0);
    } else {
      camera.position.set(
        activeCamPaths[CappedCamPathIndex].from.x,
        activeCamPaths[CappedCamPathIndex].from.y,
        activeCamPaths[CappedCamPathIndex].from.z
      );
      camera.lookAt(
        activeCamPaths[CappedCamPathIndex].lookAt.x,
        activeCamPaths[CappedCamPathIndex].lookAt.y,
        activeCamPaths[CappedCamPathIndex].lookAt.z
      );
    }
  }, [camera, camPathIndex, pomodoroPhase, activeCamPaths, CappedCamPathIndex]);

  useFrame(({ camera }) => {
    if (pomodoroPhase !== "none" && ctrls.enabled)
      camera.position.lerp(activeCamPaths[CappedCamPathIndex].to, 0.0005);
  });

  return null;
};

export default Camera;
