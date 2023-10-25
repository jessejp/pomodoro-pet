import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

const WorkTimeButtonsCircle: React.FC<{
  selectedMinutes: number;
  onWorkTimeSelected: (minutes: number) => void;
}> = (props) => {
  const buttonCount = 12;
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  // State variable for the adjusted radius
  const [radius, setRadius] = useState(0);

  // Angle increment for each button
  const angleIncrement = (2 * Math.PI) / buttonCount;

  useEffect(() => {
    const handleResize = () => {
      if (!buttonContainerRef.current) return 0;

      // Calculate the adjusted radius based on the minimum of window width and height
      const containerWidth = buttonContainerRef.current.offsetWidth;
      const containerHeight = buttonContainerRef.current.offsetHeight;

      // Adjusted radius based on the smaller dimension
      const smallerDimension = Math.min(containerWidth, containerHeight);

      // Tweakable factor (0.865)
      return (smallerDimension / 2) * 0.865;
    };

    setRadius(handleResize());

    window.addEventListener("resize", () => {
      setRadius(handleResize());
    });

    return () => {
      window.removeEventListener("resize", () => {
        setRadius(handleResize());
      });
    };
  }, []);

  const gridTemplateAreas = `" .  .  .  B12  .  .  . "
                             " .  .  B11  .  B1  .  . "
                             " .  B10  .  .  .  B2  . "
                             " B9  .  .  .  .  .  B3 "
                             " .  B8  .  .  .  B4  . "
                             " .  .  B7  .  B5  .  . "
                             " .  .  .  B6  .  .  . "`;

  return (
    <div className="flex w-full items-center justify-center">
      <div
        ref={buttonContainerRef}
        className="relative grid h-full w-full grid-cols-7 grid-rows-7 gap-2"
        style={{
          gridTemplateAreas,
        }}
      >
        {Array.from({ length: buttonCount }).map((_, index) => {
          const minuteSelectionValue = index * 5 + 5; // minimum of 5
          const gridArea = `B${(index + 1).toString()}`;

          return (
            <button
              key={index}
              className={clsx(
                "flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold",
                {
                  "bg-secondary-500 hover:bg-secondary-200":
                    props.selectedMinutes !== minuteSelectionValue,
                },
                {
                  "bg-accent-500 hover:bg-accent-400":
                    props.selectedMinutes === minuteSelectionValue,
                }
              )}
              style={{ gridArea }} // Place in the specified grid area
              onClick={() => {
                props.onWorkTimeSelected(minuteSelectionValue);
              }}
            >
              {minuteSelectionValue}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default WorkTimeButtonsCircle;
