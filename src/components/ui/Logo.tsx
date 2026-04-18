interface LogoProps {
  size?: "nav" | "md" | "lg";
  className?: string;
}

export function Logo({ size = "nav", className = "" }: LogoProps) {
  const sizes = {
    nav: "text-[17px]",
    md:  "text-2xl",
    lg:  "text-4xl",
  };

  return (
    <span
      className={`font-serif tracking-[-0.03em] leading-none ${sizes[size]} ${className}`}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      <span style={{ fontWeight: 300, color: "var(--color-warm)" }}>Rev</span>
      <span style={{ fontWeight: 500 }}>Cognition</span>
    </span>
  );
}
