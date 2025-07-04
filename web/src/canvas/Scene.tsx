import { OrbitControls, PresentationControls } from "@react-three/drei";
import { Room } from "./world/Room";
import { Pet } from "./pets/Pet";
import Chair from "./world/furniture/ChairSoft1";
import { useBoundStore } from "../store/useBoundStore";
import { useControls } from "leva";
import Camera from "./Camera";
import { Book } from "./world/furniture/Book";
import { Suspense } from "react";
import { PomodoroTimerParams } from "../store/types";

const Scene: React.FC<{
  pomodoroPhase: PomodoroTimerParams["pomodoroPhase"];
}> = ({pomodoroPhase}) => {
  const ctrls = useControls("Scene", {
    presentationMode: true,
    orbitControls: false,
    showAxes: true,
  });

  const { pet } = useBoundStore((state) => ({
    pet: state.equippedCosmetic.petModel,
  }));

  return (
    <>
      <OrbitControls enabled={ctrls.orbitControls} />
      <PresentationControls
        enabled={(pomodoroPhase !== "none") === ctrls.presentationMode}
        snap={true}
        polar={[0, 0.1]}
        azimuth={[-1.4, 1.4]}
      >
        <Camera />
        <Room />
        <Book />
        <Chair />
        <Suspense fallback={null}>
          <Pet pet={pet} />
        </Suspense>
      </PresentationControls>
    </>
  );
};

export default Scene;
