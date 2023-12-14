/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useRef, Suspense, useEffect } from "react";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { GLTF } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import HeadSlot from "../cosmetics/HeadSlot";
import { useBoundStore } from "../../store/useBoundStore";
import type { PetType, PetMeshType } from "../../store/types";

type ActionName =
  | "continue_study"
  | "none"
  | "page_flip"
  | "page_none"
  | "pause"
  | "start_break"
  | "start_study"
  | "study"
  | "study_v2"
  | "study_v3";
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export interface PetGLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    root: THREE.Bone;
    ["MCH-torsoparent"]: THREE.Bone;
    ["MCH-hand_ikparentL"]: THREE.Bone;
    ["MCH-upper_arm_ik_targetparentL"]: THREE.Bone;
    ["MCH-hand_ikparentR"]: THREE.Bone;
    ["MCH-upper_arm_ik_targetparentR"]: THREE.Bone;
    ["MCH-foot_ikparentL"]: THREE.Bone;
    ["MCH-thigh_ik_targetparentL"]: THREE.Bone;
    ["MCH-foot_ikparentR"]: THREE.Bone;
    ["MCH-thigh_ik_targetparentR"]: THREE.Bone;
  } & PetMeshType;
  animations: PetGLTFAction[];
};

const material = new THREE.MeshBasicMaterial();

export const Pet = (
  props: JSX.IntrinsicElements["group"] & { pet: PetType; unanimated?: boolean }
) => {
  const { pet, unanimated = false } = props;
  const { equippedCosmetic, pomodoroPhase } = useBoundStore((state) => ({
    equippedCosmetic: state.equippedCosmetic,
    pomodoroPhase: state.pomodoroPhase,
  }));

  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF(
    `/models/pomodoro_pets_${pet}.glb`,
    true,
    undefined
  ) as GLTFResult;

  const { actions } = useAnimations<PetGLTFAction>(animations, group);

  useEffect(() => {
    if (unanimated) return;
    if (pomodoroPhase === "none") {
      actions.none?.reset().fadeIn(0.5).play();
      return () => actions.none?.reset().stop();
    } else if (pomodoroPhase === "work") {
      actions.study_v3?.reset().fadeIn(0).play();
      return () => {
        actions.study_v3?.reset().stop();
      };
    } else if (pomodoroPhase === "break") {
      actions.pause?.reset().fadeIn(0).play();
      return () => {
        actions.pause?.reset().stop();
      };
    }
  }, [pomodoroPhase, actions, pet, unanimated]);

  const texture = useLoader(TextureLoader, `textures/pets/${pet}.png`);
  texture.flipY = false;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;

  const headSlotItem = equippedCosmetic.cosmetics.find(
    (cosmetic) => cosmetic.slot === "head"
  );

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name={`${pet}_rig`}>
          <skinnedMesh
            name={pet}
            geometry={nodes[pet].geometry}
            material={material}
            material-map={texture}
            skeleton={nodes[pet].skeleton}
          />
          {!!headSlotItem && (
            <Suspense fallback={null}>
              <HeadSlot
                pet={pet}
                cosmetic={headSlotItem.name}
                skeleton={nodes[pet].skeleton}
              />
            </Suspense>
          )}
          <primitive object={nodes.root} />
          <primitive object={nodes["MCH-torsoparent"]} />
          <primitive object={nodes["MCH-hand_ikparentL"]} />
          <primitive object={nodes["MCH-upper_arm_ik_targetparentL"]} />
          <primitive object={nodes["MCH-hand_ikparentR"]} />
          <primitive object={nodes["MCH-upper_arm_ik_targetparentR"]} />
          <primitive object={nodes["MCH-foot_ikparentL"]} />
          <primitive object={nodes["MCH-thigh_ik_targetparentL"]} />
          <primitive object={nodes["MCH-foot_ikparentR"]} />
          <primitive object={nodes["MCH-thigh_ik_targetparentR"]} />
        </group>
      </group>
    </group>
  );
};
