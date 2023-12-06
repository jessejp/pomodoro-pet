import React, { useEffect } from "react";
import { PetGLTFAction } from "../canvas/pets/Pet";
import { useAnimations } from "@react-three/drei";
import * as THREE from "three";
import { useBoundStore } from "../store/useBoundStore";
import { FurnitureGLTFAction } from "../canvas/world/furniture/Book";

type HookProps = {
  animations: PetGLTFAction[] | FurnitureGLTFAction[];
  groupRef: React.RefObject<THREE.Group>;
  isPet: boolean;
};

const useAnimPhases: (props: HookProps) => void = ({
  animations,
  groupRef,
  isPet = true,
}) => {
  const { pomodoroPhase, currentRound } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
    currentRound: state.currentRound,
  }));

  const { actions } = useAnimations<HookProps["animations"][0]>(
    animations,
    groupRef
  );

  useEffect(() => {
    if (!isPet) return;
    if (pomodoroPhase === "none") {
      actions.none?.reset().fadeIn(0.5).play();
      return () => actions.none?.fadeOut(0.5);
    } else if (pomodoroPhase === "work" && currentRound === 0) {
      actions.start_study
        ?.reset()
        .fadeIn(0.5)
        .setLoop(THREE.LoopOnce, 0)
        .play();

      if (actions.start_study && !actions.start_study?.clampWhenFinished)
        actions.start_study.clampWhenFinished = true;

      actions.study_v3?.reset().fadeIn(0).play();

      return () => {
        actions.start_study?.fadeOut(0.5);
        actions.study_v3?.fadeOut(0.5);
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
        actions.pause?.reset().fadeIn(0).play();
      }, duration * 1000);

      return () => {
        actions.start_break?.fadeOut(0.5);
        actions.pause?.fadeOut(0.5);
        clearTimeout(delayedAction);
      };
    } else if (pomodoroPhase === "work" && currentRound > 0) {
      actions.continue_study
        ?.reset()
        .fadeIn(0.5)
        .setLoop(THREE.LoopOnce, 0)
        .play();

      if (actions.continue_study && !actions.continue_study?.clampWhenFinished)
        actions.continue_study.clampWhenFinished = true;

      actions.study_v3?.reset().fadeIn(0).play();

      return () => {
        actions.continue_study?.fadeOut(0.5);
        actions.study_v3?.fadeOut(0.5);
      };
    }
  }, [pomodoroPhase, currentRound, actions, isPet]);

  useEffect(() => {
    if (isPet) return;
    if (pomodoroPhase !== "work") {
      actions.page_none?.reset().fadeIn(0.5).play();
      return () => {
        actions.page_none?.fadeOut(0.5);
      };
    } else {
      actions.page_flip?.reset().fadeIn(0).play();
      return () => {
        actions.page_flip?.fadeOut(0);
      };
    }
  }, [pomodoroPhase, actions, isPet]);
};

export default useAnimPhases;
