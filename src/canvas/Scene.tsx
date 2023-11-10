import { OrbitControls, PresentationControls } from "@react-three/drei";
import { Room } from "./world/Room";
import Monkey from "./pets/Monkey";
import Chair from "./world/furniture/ChairSoft1";
import { useBoundStore } from "../store/useBoundStore";
import { useControls } from "leva";
import Camera from "./Camera";

const Scene: React.FC<{ devGUI: boolean }> = ({ devGUI }) => {
  const ctrls = useControls("Scene", {
    presentationMode: true,
    orbitControls: false,
    showAxes: true,
  });

  const { pomodoroPhase } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
  }));
  
  return (
    <>
      {devGUI && ctrls.showAxes && <axesHelper args={[1]} />}
      <OrbitControls enabled={ctrls.orbitControls} />
      <PresentationControls
        enabled={(pomodoroPhase !== "none") === ctrls.presentationMode}
        snap={true}
        polar={[0, 0.1]}
        azimuth={[-1.4, 1.4]}
      >
        <Camera />
        <Room />
        <Chair />
        <Monkey />
      </PresentationControls>
    </>
  );
};

export default Scene;
