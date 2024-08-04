import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Pet } from "../canvas/pets/Pet";
import Menu from "../interface/ui/Menu";
import { useBoundStore } from "../store/useBoundStore";
import CosmeticSelectMenu from "../interface/menuSections/CosmeticSelectMenu";
import PetSelectMenu from "../interface/menuSections/PetSelectMenu";

const CustomizePet = () => {
  const { pet } = useBoundStore((state) => ({
    pet: state.equippedCosmetic.petModel,
  }));
  return (
    <>
      <div className="w-full max-w-xl px-14 pt-4">
        <Canvas
          className="aspect-square w-full rounded-xl"
          camera={{
            fov: 40,
            near: 0.05,
            far: 15,
            position: [0, 0.3, 3],
          }}
          flat={true}
        >
          <color attach="background" args={["#F9FAFB"]} />
          <Suspense fallback={null}>
            <group position={[0, -0.55, 0.5]}>
              <Pet pet={pet} unanimated={true} />
            </group>
          </Suspense>
        </Canvas>
      </div>
      <Menu
        tabs={[
          {
            icon: "customize-tertiary-800",
            component: <PetSelectMenu />,
          },
          {
            icon: "backpack-tertiary-800",
            component: <CosmeticSelectMenu />,
          },
        ]}
      />
    </>
  );
};

export default CustomizePet;
