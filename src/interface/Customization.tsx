import type { HeadSlot } from "../store/types";
import { useBoundStore } from "../store/useBoundStore";

const Customization = () => {
  const { cosmetic, updateCosmetic } = useBoundStore((state) => ({
    cosmetic: state.cosmetic,
    updateCosmetic: state.updateCosmetic,
  }));

  return (
    <div className="min-h-[83%] w-full pb-16">
      <select
        className="p-3 text-lg"
        value={cosmetic.head_slot}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const selection: HeadSlot = event.target.value
            ? (event.target.value as HeadSlot)
            : undefined;

          updateCosmetic({ ...cosmetic, head_slot: selection });
        }}
      >
        <option value="">None</option>
        <option value="beanie">Beanie</option>
      </select>
    </div>
  );
};

export default Customization;
