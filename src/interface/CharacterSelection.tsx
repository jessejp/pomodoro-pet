import clsx from "clsx";
import type { EquippedCosmetic, PetType } from "../store/types";
import { useBoundStore } from "../store/useBoundStore";

const characters: PetType[] = ["monkey", "penguin"];

const CharacterSelection = () => {
  const { equippedCosmetic, updateCosmetic } = useBoundStore(
    (state) => ({
      equippedCosmetic: state.equippedCosmetic,
      updateCosmetic: state.updateCosmetic,
    })
  );

  return (
    <div className="min-h-[83%] w-full">
      {characters.map((pet) => (
        <CharacterOption
          key={pet}
          pet={pet}
          equippedCosmetic={equippedCosmetic}
          updateCosmetic={updateCosmetic}
        />
      ))}
    </div>
  );
};

interface CharacterOptionProps {
  pet: PetType;
  equippedCosmetic: EquippedCosmetic;
  updateCosmetic: (cosmetic: EquippedCosmetic) => void;
}

const CharacterOption: React.FC<CharacterOptionProps> = ({
  pet,
  equippedCosmetic,
  updateCosmetic,
}) => {
  const isEquipped = pet === equippedCosmetic.petModel;
  return (
    <button
      className="relative"
      onClick={() => {
        if (isEquipped) return;
        updateCosmetic({
          cosmetics: equippedCosmetic.cosmetics,
          petModel: pet,
        });
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

export default CharacterSelection;
