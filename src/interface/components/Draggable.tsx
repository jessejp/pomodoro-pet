import React, {
  useState,
  useRef,
  type PropsWithChildren,
  useEffect,
} from "react";

const Draggable: React.FC<PropsWithChildren> = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.PointerEvent) => {
    if (!dragRef.current) return;

    setIsDragging(true);
    const { left, top } = dragRef.current.getBoundingClientRect();
    setPosition({
      x: event.clientX - left,
      y: event.clientY - top,
    });
  };

  const handleMouseMove = (event: React.PointerEvent) => {
    if (!isDragging || !dragRef.current) return;

    const newX = event.clientX - position.x;
    const newY = event.clientY - position.y;
    dragRef.current.style.left = `${newX}px`;
    dragRef.current.style.top = `${newY}px`;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    window.addEventListener("pointerup", handleMouseUp);
    return () => {
      window.removeEventListener("pointerup", handleMouseUp);
    };
  });

  return (
    <div ref={dragRef} className="fixed bottom-1/3 right-5 z-50 h-fit w-fit ">
      <div
        onPointerDown={handleMouseDown}
        onPointerUp={handleMouseUp}
        onPointerMove={handleMouseMove}
        className="absolute right-0 top-0 h-20 w-full bg-transparent text-2xl"
        aria-label="drag-to-move"
      >
        <span className="absolute right-5 top-5">
          {!isDragging ? "✋" : "✊"}
        </span>
      </div>
      {children}
    </div>
  );
};

export default Draggable;
