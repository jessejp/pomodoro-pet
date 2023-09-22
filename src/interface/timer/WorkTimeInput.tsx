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

      // Width of the button container, divided by button count
      const containerWidth =
        containerRef.current.offsetWidth +
        containerRef.current.offsetWidth / buttonCount;

      // Adjusted radius based on container width
      const adjustedRadius = (containerWidth / 2) * 0.8;
      setRadius(adjustedRadius);
    };

    handleResize(); // Call once initially to set the initial radius

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={clsx("relative h-80 w-80 md:h-128 md:w-128", {
        "-top-2 scale-75":
          (window.innerHeight < 770 && window.innerWidth >= 640) ||
          window.innerWidth < 305,
        "scale-100": window.innerHeight >= 770,
      })}
    >
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
              "absolute flex h-12 w-12 items-center justify-center rounded-full border-4  text-2xl  md:h-16 md:w-16 md:text-4xl",
              {
                "border-transparent bg-violet-600 hover:bg-violet-500":
                  props.selectedMinutes !== minuteSelectionValue,
              },
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
