import { Room } from "./Room";
import { Center, PresentationControls } from "@react-three/drei";
import Duck from "./Duck";
import { usePomodoro } from "../utils/usePomodoro";

function Scene() {
  const { pomodoroPhase } = usePomodoro();
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 5, -10]} intensity={1} />
      <Center>
        <PresentationControls enabled={pomodoroPhase !== "none"} snap={true}>
          <Room />
          <Duck />
        </PresentationControls>
      </Center>
    </>
  );
}

export default Scene;
