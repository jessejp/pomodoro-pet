import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import {
  Center,
  MeshPortalMaterial,
  type PortalMaterialType,
  PresentationControls,
} from "@react-three/drei";
import { usePomodoro } from "../utils/usePomodoro";
import Duck from "./Duck";
import { Room } from "./Room";

function Scene() {
  const { pomodoroPhase } = usePomodoro();
  const portal = useRef<PortalMaterialType>(null);
  const { viewport } = useThree();
  
  const circleScale = viewport.width < 3.4 ? 0.9 : 1.25; 
  const meshZPosition = viewport.width < 3.4 ? -1 : 0;

  useEffect(() => {
    if (pomodoroPhase === "none" && portal.current) {
      portal.current.blend = 0;
    } else if (pomodoroPhase !== "none" && portal.current) {
      portal.current.blend = 1;
    }
  }, [pomodoroPhase]);
  return (
    <>
      <color attach="background" args={["#ffc222"]} />
      <mesh position={[0, 0, meshZPosition]}>
        <circleGeometry args={[circleScale, 32]} />
        <MeshPortalMaterial ref={portal} blend={0} blur={0}>
          <ambientLight intensity={1} />
          <directionalLight position={[0, 5, -10]} intensity={1} />
          <Center>
            <PresentationControls
              enabled={pomodoroPhase !== "none"}
              snap={true}
            >
              <Room />
              <Duck />
            </PresentationControls>
          </Center>
        </MeshPortalMaterial>
      </mesh>
    </>
  );
}

export default Scene;
