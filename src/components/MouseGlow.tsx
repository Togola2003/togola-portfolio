"use client";

import { useEffect, useState } from "react";

export function MouseGlow() {
  const [pos, setPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundImage: `radial-gradient(240px circle at ${pos.x}px ${pos.y}px, rgba(16,185,129,0.20), transparent 65%)`,
      }}
    />
  );
}
