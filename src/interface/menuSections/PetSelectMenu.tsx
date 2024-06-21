import clsx from "clsx";
import type { CosmeticParams, EquippedCosmetic, PetType } from "../../store/types";
import { useBoundStore } from "../../store/useBoundStore";

const characters: PetType[] = ["monkey", "penguin"];

const PetSelectMenu = () => {
  const { equippedCosmetic, updatePetModel } = useBoundStore((state) => ({
    equippedCosmetic: state.equippedCosmetic,
    updatePetModel: state.updatePetModel,
  }));

  return (
    <div className="flex w-full gap-3">
      {characters.map((pet) => (
        <CharacterOption
          key={pet}
          pet={pet}
          equippedCosmetic={equippedCosmetic}
          updatePetModel={updatePetModel}
        />
      ))}
    </div>
  );
};

interface CharacterOptionProps {
  pet: PetType;
  equippedCosmetic: EquippedCosmetic;
  updatePetModel: CosmeticParams["updatePetModel"];
}

const CharacterOption: React.FC<CharacterOptionProps> = ({
  pet,
  equippedCosmetic,
  updatePetModel,
}) => {
  const isEquipped = pet === equippedCosmetic.petModel;
  return (
    <button
      className="relative"
      onClick={() => {
        if (isEquipped) return;
        updatePetModel(pet);
      }}
    >
      {isEquipped && (
        <img
          className="absolute right-1 top-1"
          src="/icons/check-tertiary-900.svg"
          alt="equipped"
        />
      )}
      <img
        className={clsx("rounded-xl border-8", {
          "border-tertiary-200 brightness-[0.95] saturate-[0.25]": !isEquipped,
          "border-accent-500": !!isEquipped,
        })}
        src={`/thumbnails/pet_${pet}.webp`}
        alt={pet}
      />
    </button>
  );
};

export default PetSelectMenu;
