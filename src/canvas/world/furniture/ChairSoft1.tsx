/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

type GLTFResult = GLTF & {
  nodes: {
    Chair_Pillows: THREE.Mesh;
    Chair_Frame: THREE.Mesh;
  };
};

const material = new THREE.MeshBasicMaterial();

const Model = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes } = useGLTF("models/room/chair_soft_1.glb") as GLTFResult;

  const texture = useLoader(
    TextureLoader,
    "textures/chair_soft_1_514x514.png"
  );
  texture.flipY = false;
  texture.channel = 1;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair_Pillows.geometry}
        material={material}
        material-map={texture}
        position={[-0.4, 0.34, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Chair_Frame.geometry}
        material={material}
        material-map={texture}
        position={[-0.4, 0.34, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
};

useGLTF.preload("models/room/chair_soft_1.glb");

export default Model;
