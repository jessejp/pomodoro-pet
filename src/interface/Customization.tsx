import clsx from "clsx";
import type { CosmeticItem, EquippedCosmetic } from "../store/types";
import { useBoundStore } from "../store/useBoundStore";

const cosmetics: CosmeticItem[] = [
  {
    name: "beanie",
    slot: "head",
  },
];

const Customization = () => {
  const { equippedCosmetic, updateCosmetic } = useBoundStore((state) => ({
    equippedCosmetic: state.equippedCosmetic,
    updateCosmetic: state.updateCosmetic,
  }));

  return (
    <div className="min-h-[83%] w-full">
      {cosmetics.map((cosmetic) => (
        <CosmeticOption
          key={cosmetic.name}
          {...cosmetic}
          equippedCosmetic={equippedCosmetic}
          updateCosmetic={updateCosmetic}
        />
      ))}
    </div>
  );
};

interface CosmeticOptionProps extends CosmeticItem {
  equippedCosmetic: EquippedCosmetic;
  updateCosmetic: (cosmetic: EquippedCosmetic) => void;
}

const CosmeticOption: React.FC<CosmeticOptionProps> = ({
  name,
  slot,
  equippedCosmetic,
  updateCosmetic,
}) => {
  const isEquipped = equippedCosmetic.cosmetics.some(
    (cosmetic) => cosmetic.name === name && cosmetic.slot === slot
  );

  return (
    <button
      className="relative"
      onClick={() => {
        updateCosmetic({
          petModel: equippedCosmetic.petModel,
          cosmetics: isEquipped ? [] : [{ name, slot }],
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
          "border-accent-500": isEquipped,
        })}
        src={`/thumbnails/c_${slot}_${name}.webp`}
        alt={name}
      />
    </button>
  );
};

export default Customization;
