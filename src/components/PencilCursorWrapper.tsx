import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

export default function PencilCursorWrapper({ children }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative"
    >
      {children}
      {hovering && (
        <Pencil
          className="fixed pointer-events-none text-gray-500 w-5 h-5"
          style={{
            left: pos.x + 4,
            top: pos.y + 4,
            transition: "transform 0.05s linear",
          }}
        />
      )}
    </div>
  );
}
