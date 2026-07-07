const VARIANTS = {
  primary:
    "bg-accent text-accent-fg hover:bg-accent-hover shadow-soft hover:shadow-lift",
  secondary:
    "bg-surface-2 text-fg border border-border hover:border-accent/50 hover:text-accent",
  outline:
    "border border-border text-fg hover:border-accent hover:text-accent bg-transparent",
  ghost: "text-fg-muted hover:text-fg hover:bg-surface-2 bg-transparent",
  danger:
    "bg-transparent text-red-500 border border-red-500/40 hover:bg-red-500 hover:text-white",
};

const SIZES = {
  sm: "px-3.5 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold
        transition-all duration-200 active:scale-[0.97] disabled:opacity-50
        disabled:pointer-events-none ${VARIANTS[variant] ?? VARIANTS.primary} ${
        SIZES[size] ?? SIZES.md
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
