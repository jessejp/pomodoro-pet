import { useCosmetic } from "../stores/useCosmetic";
import type { HeadSlot } from "../stores/useCosmetic";

const Customization = () => {
  const { cosmetic, updateCosmetic } = useCosmetic();
  return (
    <div className="min-h-[83%] w-full ">
      <select
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          const selection: HeadSlot = event.target.value
            ? (event.target.value as HeadSlot)
            : undefined;

          updateCosmetic({ ...cosmetic, head_slot: selection });
        }}
      >
        <option value="">None</option>
        <option value="beanie">beanie</option>
      </select>
    </div>
  );
};

export default Customization;
