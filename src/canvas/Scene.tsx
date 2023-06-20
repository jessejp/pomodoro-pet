import { Room } from "./Room";
import { PresentationControls } from "@react-three/drei";

function Scene() {
  return (
    <PresentationControls>
      <Room position={[0.6, -0.4, 0]} />
    </PresentationControls>
  );
}

export default Scene;
