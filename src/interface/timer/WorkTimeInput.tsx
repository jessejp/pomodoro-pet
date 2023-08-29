import React, { useEffect, useRef, useState } from "react";

const WorkTimeInput: React.FC<{
  onWorkTimeSelected: (minutes: number) => void;
}> = (props) => {
  const buttonCount = 12; // Total number of buttons
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the button container
  const [radius, setRadius] = useState(0); // State variable for the adjusted radius
  const angleIncrement = (2 * Math.PI) / buttonCount; // Angle increment for each button

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth =
        containerRef.current.offsetWidth +
        containerRef.current.offsetWidth / 12; // Width of the button container, divided by magic number
      const adjustedRadius = (containerWidth / 2) * 0.8; // Adjusted radius based on container width
      setRadius(adjustedRadius);
    };

    handleResize(); // Call once initially to set the initial radius

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("rerender worktimeinput");

  return (
    <div ref={containerRef} className="relative w-96 h-96 sm:w-128 sm:h-128">
      {Array.from({ length: buttonCount }).map((_, index) => {
        const angleOffset = Math.PI * -0.33;
        const angle = index * angleIncrement + angleOffset;
        const top = Math.sin(angle) * radius + radius;
        const left = Math.cos(angle) * radius + radius;

        return (
          <button
            key={index}
            className="absolute flex items-center justify-center bg-violet-600 w-10 h-10 sm:w-16 sm:h-16 text-2xl sm:text-4xl rounded-full"
            style={{ top: `${top}px`, left: `${left}px` }}
            onClick={() => {
              props.onWorkTimeSelected(index * 5 + 5);
            }}
          >
            {index * 5 + 5}
          </button>
        );
      })}
    </div>
  );
};

export default WorkTimeInput;
