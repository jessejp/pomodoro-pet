/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useAnimations, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { ObjectMap, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import { useBoundStore } from "../../../store/useBoundStore";

type ActionName = "page_none" | "page_flip";
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;

export interface FurnitureGLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF &
  ObjectMap & {
    nodes: {
      book_page001: THREE.SkinnedMesh;
      book001: THREE.SkinnedMesh;
      book_root: THREE.Bone;
    };
    animations: FurnitureGLTFAction[];
  };

// type ActionName = "page_flip" | "page_none";
// type GLTFActions = Record<ActionName, THREE.AnimationAction>;

const material = new THREE.MeshBasicMaterial();
const filePath = "models/room/book.glb";

export function Book(props: JSX.IntrinsicElements["group"]) {
  const { pomodoroPhase } = useBoundStore((state) => ({
    pomodoroPhase: state.pomodoroPhase,
  }));

  const group = useRef<THREE.Group>(null);
  const { nodes, animations } = useGLTF(filePath, true) as GLTFResult;

  const { actions } = useAnimations<FurnitureGLTFAction>(animations, group);

  useEffect(() => {
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
  }, [pomodoroPhase, actions]);

  const texture = useLoader(TextureLoader, "textures/room_texture.png");
  texture.flipY = false;
  texture.channel = 1;
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="book_armature" position={[-0.87, 0.62, -0.01]}>
          <skinnedMesh
            name="book_page001"
            geometry={nodes.book_page001.geometry}
            material={material}
            material-map={texture}
            skeleton={nodes.book_page001.skeleton}
          />
          <skinnedMesh
            name="book001"
            geometry={nodes.book001.geometry}
            material={material}
            material-map={texture}
            skeleton={nodes.book001.skeleton}
          />
          <primitive object={nodes.book_root} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(filePath);
