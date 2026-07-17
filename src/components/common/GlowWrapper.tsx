import type { ReactNode } from "react";

interface GlowWrapperProps {
  children: ReactNode;
  className?: string;
  color?: "violet" | "cyan" | "emerald";
}

const glowColors = {
  violet: "from-cyber-violet/20",
  cyan: "from-electric-cyan/20",
  emerald: "from-radiant-emerald/20",
};

export default function GlowWrapper({
  children,
  className = "",
  color = "violet",
}: GlowWrapperProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden
        className={`pointer-events-none absolute -inset-20 bg-gradient-radial ${glowColors[color]} via-transparent to-transparent blur-3xl`}
      />
      {children}
    </div>
  );
}
