import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

const WorkTimeInput: React.FC<{
  selectedMinutes: number;
  onWorkTimeSelected: (minutes: number) => void;
}> = (props) => {
  const buttonCount = 12;
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the button container
  const [radius, setRadius] = useState(0); // State variable for the adjusted radius
  const angleIncrement = (2 * Math.PI) / buttonCount; // Angle increment for each button

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth =
        containerRef.current.offsetWidth +
        containerRef.current.offsetWidth / buttonCount; // Width of the button container, divided by button count
      const adjustedRadius = (containerWidth / 2) * 0.8; // Adjusted radius based on container width
      setRadius(adjustedRadius);
    };

    handleResize(); // Call once initially to set the initial radius

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-96 w-96 sm:h-128 sm:w-128">
      {Array.from({ length: buttonCount }).map((_, index) => {
        const angleOffset = Math.PI * -0.33;
        const angle = index * angleIncrement + angleOffset;
        const top = Math.sin(angle) * radius + radius;
        const left = Math.cos(angle) * radius + radius;

        const minuteSelectionValue = index * 5 + 5; //minimun of 5
        return (
          <button
            key={index}
            className={clsx(
              "absolute flex h-12 w-12 items-center justify-center rounded-full border-4 border-transparent bg-violet-600 text-2xl hover:bg-violet-500 sm:h-16 sm:w-16 sm:text-4xl",
              {
                "border-violet-600 bg-orange-300 hover:bg-orange-300":
                  props.selectedMinutes === minuteSelectionValue,
              }
            )}
            style={{ top: `${top}px`, left: `${left}px` }}
            onClick={() => {
              props.onWorkTimeSelected(minuteSelectionValue);
            }}
          >
            {minuteSelectionValue}
          </button>
        );
      })}
    </div>
  );
};

export default WorkTimeInput;
