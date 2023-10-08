import React, { useEffect } from "react";
import { GLTFAction } from "../canvas/pets/Monkey";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useBoundStore } from "../store/useBoundStore";

type HookProps = {
  animations: GLTFAction[];
  groupRef: React.RefObject<THREE.Group>;
};

const useAnimPhases: (props: HookProps) => void = ({
  animations,
  groupRef,
}) => {
  const { pomodoroPhase, currentRound } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
    currentRound: state.currentRound,
  }));

  const { actions } = useAnimations<GLTFAction>(animations, groupRef);

  useEffect(() => {
    if (pomodoroPhase === "none") {
      actions.none?.reset().fadeIn(0.5).play();
      return () => actions.none?.fadeOut(0.5);
    } else if (pomodoroPhase === "work" && currentRound === 0) {
      const duration = actions.start_study?.getClip().duration || 2;
      actions.start_study
        ?.reset()
        .fadeIn(0.5)
        .setLoop(THREE.LoopOnce, 0)
        .play();

      if (actions.start_study && !actions.start_study?.clampWhenFinished)
        actions.start_study.clampWhenFinished = true;

      const delayedAction = setTimeout(() => {
        actions.study?.reset().fadeIn(0).play();
      }, duration * 1000);

      return () => {
        actions.start_study?.fadeOut(0.5);
        actions.study?.fadeOut(0.5);
        clearTimeout(delayedAction);
      };
    } else if (pomodoroPhase === "break") {
      const duration = actions.start_break?.getClip().duration || 2;
      actions.start_break
        ?.reset()
        .fadeIn(0.5)
        .setLoop(THREE.LoopOnce, 0)
        .play();

      if (actions.start_break && !actions.start_break?.clampWhenFinished)
        actions.start_break.clampWhenFinished = true;

      const delayedAction = setTimeout(() => {
        actions.break?.reset().fadeIn(0).play();
      }, duration * 1000);

      return () => {
        actions.start_break?.fadeOut(0.5);
        actions.break?.fadeOut(0.5);
        clearTimeout(delayedAction);
      };
    } else if (pomodoroPhase === "work" && currentRound > 0) {
      const duration = actions.continue_study?.getClip().duration || 2;
      actions.continue_study
        ?.reset()
        .fadeIn(0.5)
        .setLoop(THREE.LoopOnce, 0)
        .play();

      if (actions.continue_study && !actions.continue_study?.clampWhenFinished)
        actions.continue_study.clampWhenFinished = true;

      const delayedAction = setTimeout(() => {
        actions.study?.reset().fadeIn(0).play();
      }, duration * 1000);

      return () => {
        actions.continue_study?.fadeOut(0.5);
        actions.study?.fadeOut(0.5);
        clearTimeout(delayedAction);
      };
    }
  }, [pomodoroPhase, currentRound, actions]);
};

export default useAnimPhases;
