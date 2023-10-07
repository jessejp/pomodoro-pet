import { useCosmetic } from "../stores/useCosmetic";
import type { HeadSlot } from "../stores/useCosmetic";

const Customization = () => {
  const { cosmetic, updateCosmetic } = useCosmetic();
  console.log(cosmetic);

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
