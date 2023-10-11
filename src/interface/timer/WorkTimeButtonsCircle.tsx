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

      // Adjusted radius based on container width
      return (buttonContainerRef.current.offsetWidth / 2) * 0.865;
    };

    // Call once initially to set the initial radius
    setRadius(handleResize());

    // Update the radius on window resize
    window.addEventListener("resize", () => {
      setRadius(handleResize());
    });

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", () => {
        setRadius(handleResize());
      });
    };
  }, []);

  return (
    <div ref={buttonContainerRef} className="relative aspect-square w-[50%] min-w-[26rem] max-w-[30rem]">
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
              "absolute flex h-16 w-16 items-center justify-center rounded-full border-4 text-4xl",
              {
                "border-transparent bg-violet-600 hover:bg-violet-500":
                  props.selectedMinutes !== minuteSelectionValue,
              },
              {
                "border-violet-600 bg-orange-300 hover:bg-orange-300":
                  props.selectedMinutes === minuteSelectionValue,
              }
            )}
            style={{
              top: `calc(50% - 50% + ${top}px)`, // Center vertically
              left: `calc(50% - 50% + ${left}px)`, // Center horizontally
            }}
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

export default WorkTimeButtonsCircle;
