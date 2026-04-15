import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  href?: string;
  target?: string;
  rel?: string;
}

export function Button({ variant = "primary", href, target, rel, className, children, ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-base transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const variants = {
    primary: "bg-[--color-warm] text-white hover:bg-[--color-warm-hover] focus-visible:ring-[--color-warm]",
    secondary:
      "border border-[--color-ink] text-[--color-ink] hover:bg-[--color-ink] hover:text-[--color-paper] focus-visible:ring-[--color-ink]",
  };

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
