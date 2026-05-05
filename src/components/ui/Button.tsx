import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "warm-solid" | "ink-solid";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  target?: string;
  rel?: string;
}

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(to_bottom,var(--color-warm),var(--color-warm-hover))] hover:brightness-105 focus-visible:ring-[var(--color-warm)]",
  secondary:
    "border border-[var(--color-ink)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)] focus-visible:ring-[var(--color-ink)]",
  "warm-solid":
    "bg-[var(--color-warm)] text-white hover:bg-[var(--color-warm-hover)] focus-visible:ring-[var(--color-warm)]",
  "ink-solid":
    "bg-[var(--color-ink)] text-[var(--color-paper)] hover:opacity-90 focus-visible:ring-[var(--color-ink)]",
};

export function Button({ variant = "primary", href, target, rel, className, children, ...props }: ButtonProps) {
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cn(base, variants[variant], className)}>
        {children}
      </a>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
