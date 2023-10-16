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

      // You can adjust the factor (0.865) as needed
      return (smallerDimension / 2) * 0.865;
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
    <div className="flex aspect-square w-full items-center justify-center">
      <div
        ref={buttonContainerRef}
        className="relative h-[29rem] w-[29rem] thin:h-96 thin:w-96 short:scale-[70%]"
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
                "absolute flex h-16 w-16 items-center justify-center rounded-full text-xl font-semibold",
                {
                  "bg-secondary-500 hover:bg-secondary-200":
                    props.selectedMinutes !== minuteSelectionValue,
                },
                {
                  "bg-accent-500 hover:bg-accent-400":
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
    </div>
  );
};

export default WorkTimeButtonsCircle;
