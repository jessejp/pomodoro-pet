import { Canvas } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { Suspense } from "react";
import Scene from "../canvas/Scene";
import SessionTimeInterface from "../interface/SessionTimeInterface";
import { useGUI } from "./Root";
import { SessionLog } from "../interface/menuSections/SessionLog";
import Button from "../interface/ui/Button";
import Menu from "../interface/ui/Menu";
import { Link } from "react-router-dom";

export function FocusSession() {
  const { ctrls } = useGUI();

  return (
    <>
      {ctrls.timeInterface && <SessionTimeInterface />}

      <div className="relative flex h-screen flex-col items-center bg-white">
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
          >
            {ctrls.devFeatures && <Perf position="top-left" />}
            {ctrls.devFeatures && <axesHelper args={[1]} />}
            <Scene pomodoroPhase={"work"} />
          </Canvas>
        </Suspense>
        {ctrls.menuBox && (
          <div className="fixed bottom-4 flex w-full items-end justify-center gap-2 thin:flex-col thin:items-center">
            <Menu
              tabs={[
                {
                  icon: "note-tertiary-800",
                  component: <SessionLog />,
                },
              ]}
            />
            <div className="absolute right-4 flex w-fit shrink thin:relative">
              <Link to="/">
                <Button
                  variant="big"
                  intent="secondary"
                  onClick={stop}
                  icon="stop-tertiary-900"
                >
                  Stop
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
