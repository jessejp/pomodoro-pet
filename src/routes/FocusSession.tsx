import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Scene from "../canvas/Scene";
import { useGUI } from "./root";
import { Color } from "three";
import { useLocation, useNavigate } from "react-router-dom";
import { getRoute } from "../utils/getRoute";
import { useBoundStore } from "../store/useBoundStore";

export function FocusSession() {
  const { ctrls } = useGUI();

  const {isRunning} = useBoundStore((state) => ({
    isRunning: state.isRunning,
  }));

  const location = useLocation();
  const { path } = getRoute(location);
  const navigate = useNavigate();

  if(path === "/focus-session" && !isRunning) {
    navigate('/')
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center">
            <div className="flex flex-col items-center">
              <img
                className="h-20 w-20"
                src="/pomodoropet-logo-2-large.png"
                alt="loading icon"
              />
              <div className="text-lg text-tertiary-800">LOADING</div>
            </div>
          </div>
        }
      >
        <Canvas
          camera={{
            fov: 50,
            near: 0.025,
            far: 15,
          }}
          flat={true}
          scene={{
            background: new Color("white")
          }}
        >
          {ctrls.devFeatures && <Perf position="top-left" />}
          {ctrls.devFeatures && <axesHelper args={[1]} />}
          <Scene pomodoroPhase={"work"} />
        </Canvas>
      </Suspense>
    </>
  );
}
