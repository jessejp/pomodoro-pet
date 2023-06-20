/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import * as THREE from "three";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    cabinet: THREE.Mesh;
    room: THREE.Mesh;
    table: THREE.Mesh;
    chair: THREE.Mesh;
    outsidePlane: THREE.Mesh;
    windowtop: THREE.Mesh;
    curtain: THREE.Mesh;
    curtain001: THREE.Mesh;
  };
};

const material = new THREE.MeshBasicMaterial();

export function Room(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("/pomodoropet_layout_0.glb") as GLTFResult;
  const texture = useTexture("/texture.jpg");
  texture.flipY = false;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.cabinet.geometry}
        material={material}
        material-map={texture}
        position={[-1.16, 0.01, -1.5]}
        scale={[1, 0.71, 0.71]}
      />
      <mesh
        geometry={nodes.room.geometry}
        material={material}
        material-map={texture}
      />
      <mesh
        geometry={nodes.table.geometry}
        material={material}
        material-map={texture}
        position={[-1.27, 0.68, 0.21]}
      />
      <mesh
        geometry={nodes.chair.geometry}
        material={material}
        material-map={texture}
        position={[-0.47, 0.44, 0.21]}
        rotation={[0, 0.49, 0]}
      />
      <mesh
        geometry={nodes.outsidePlane.geometry}
        material-color={"#ffffff"}
      />
      <mesh
        geometry={nodes.windowtop.geometry}
        material={material}
        material-map={texture}
        position={[0.23, 2.09, -2]}
      />
      <mesh
        geometry={nodes.curtain.geometry}
        material={material}
        material-map={texture}
        position={[-0.22, 0.57, -1.89]}
      />
      <mesh
        geometry={nodes.curtain001.geometry}
        material={material}
        material-map={texture}
        position={[0.79, 0.57, -1.89]}
      />
    </group>
  );
}

useGLTF.preload("/pomodoropet_layout_0.glb");
