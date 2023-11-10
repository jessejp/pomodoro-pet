import { useControls } from "leva";
import { useState, useEffect, useRef, useCallback } from "react";
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
    from: new Vector3(1.3, 2.3, 0.8),
    to: new Vector3(2.0, 1.6, -2.0),
    lookAt: new Vector3(-1.0, 0.4, -0.1),
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
    to: new Vector3(-3.0, 1.0, 1.1),
    lookAt: new Vector3(0.3, 0.5, 0),
  },
  {
    pomodoroPhase: "break",
    from: new Vector3(-0.3, 1.4, 2.4),
    to: new Vector3(-0.3, 0.2, 3.0),
    lookAt: new Vector3(0.2, 0.7, 0.0),
  },
];

const Camera = () => {
  const { pomodoroPhase } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
  }));
  const { camera } = useThree();
  const [camPathIndex, setCamPathIndex] = useState(0);
  const activeCamPaths = useRef<CameraPath[]>([]);
  const cappedIndex = useRef(camPathIndex % activeCamPaths.current.length || 0);

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

  /* Leva DevGUI use Custom Camera Path */
  const camPathsSwitch = !ctrls.isCustomPath ? camPaths : customPaths;

  const setupActiveCamPaths = useCallback(
    (camPathsSwitch: CameraPath[]): CameraPath[] => {
      const camPaths = camPathsSwitch.filter(
        (path) => path.pomodoroPhase === pomodoroPhase
      );
      if (camPaths.length === 1) camPaths.push(camPaths[0]);

      return camPaths;
    },
    [pomodoroPhase]
  );

  useEffect(() => {
    activeCamPaths.current = setupActiveCamPaths(camPathsSwitch);

    if (!ctrls.enabled || !activeCamPaths.current.length) return;
    const cameraAnimationInterval = setInterval(() => {
      setCamPathIndex((prev) => ++prev % activeCamPaths.current.length);
    }, 6000);

    if (pomodoroPhase === "none")
      return () => clearInterval(cameraAnimationInterval);

    return () => {
      clearInterval(cameraAnimationInterval);
    };
  }, [
    setCamPathIndex,
    ctrls.enabled,
    activeCamPaths,
    pomodoroPhase,
    setupActiveCamPaths,
    camPathsSwitch,
  ]);

  useEffect(() => {
    if (pomodoroPhase === "none" || activeCamPaths.current.length === 0) {
      camera.position.set(0, 1.1, 4.2);
      camera.lookAt(0, 0.7, 0);
    } else {
      cappedIndex.current = camPathIndex % activeCamPaths.current.length || 0;
      camera.position.set(
        activeCamPaths.current[cappedIndex.current].from.x,
        activeCamPaths.current[cappedIndex.current].from.y,
        activeCamPaths.current[cappedIndex.current].from.z
      );
      camera.lookAt(
        activeCamPaths.current[cappedIndex.current].lookAt.x,
        activeCamPaths.current[cappedIndex.current].lookAt.y,
        activeCamPaths.current[cappedIndex.current].lookAt.z
      );
    }
  }, [
    camera,
    camPathIndex,
    pomodoroPhase,
    activeCamPaths,
    cappedIndex,
    setupActiveCamPaths,
    camPathsSwitch,
  ]);

  useFrame(({ camera }) => {
    if (
      pomodoroPhase !== "none" &&
      ctrls.enabled &&
      activeCamPaths.current.length
    ) {
      camera.position.lerp(
        activeCamPaths.current[cappedIndex.current].to,
        0.0005
      );
      camera.lookAt(
        activeCamPaths.current[cappedIndex.current].lookAt.x,
        activeCamPaths.current[cappedIndex.current].lookAt.y,
        activeCamPaths.current[cappedIndex.current].lookAt.z
      );
    }
  });

  return null;
};

export default Camera;
