import { useState, useEffect, useRef } from "react";

const ROWS = 20;
const SPEED = 40; // ms per tick

const generateBinaryRow = () =>
  Array.from({ length: 120 }, () => Math.random() > 0.5 ? "1" : "0").join(" ");

const ComingSoon = () => {
  const [rows, setRows] = useState(() =>
    Array.from({ length: ROWS }, () => generateBinaryRow())
  );
  const offsets = useRef<number[]>(
    Array.from({ length: ROWS }, (_, i) => (i % 2 === 0 ? 0 : -200))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      offsets.current = offsets.current.map((o, i) =>
        i % 2 === 0 ? o - 0.5 : o + 0.5
      );
      // Regenerate a random row occasionally
      setRows((prev) =>
        prev.map((r, i) => (Math.random() < 0.02 ? generateBinaryRow() : r))
      );
    }, SPEED);
    return () => clearInterval(interval);
  }, []);

  // Force re-render for smooth animation
  const [, setTick] = useState(0);
  useEffect(() => {
    const raf = setInterval(() => setTick((t) => t + 1), SPEED);
    return () => clearInterval(raf);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background">
      {/* Binary background */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between py-4 opacity-[0.07]">
        {rows.map((row, i) => (
          <div
            key={i}
            className="whitespace-nowrap font-mono text-sm leading-tight text-foreground sm:text-base"
            style={{
              transform: `translateX(${offsets.current[i]}px)`,
            }}
          >
            {row}
          </div>
        ))}
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <h1 className="font-mono text-4xl font-bold uppercase tracking-[0.3em] text-foreground sm:text-6xl">
          Coming Soon
        </h1>
        <div className="h-px w-16 bg-foreground opacity-30" />
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Something is being built
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
