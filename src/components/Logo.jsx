/**
 * Brand mark: a solid accent tile + wordmark.
 * The mark is a fountain-pen nib — the classic writing/ink symbol behind the
 * "Inkwell" name. On load it writes itself in once, then holds still (see the
 * .logo-mark rules in index.css). Respects prefers-reduced-motion.
 */
function Logo({ size = "md", showText = true, className = "" }) {
  const tile = {
    sm: "h-8 w-8 rounded-lg",
    md: "h-9 w-9 rounded-xl",
    lg: "h-12 w-12 rounded-2xl",
  }[size];
  const text = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  }[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className={`grid place-items-center bg-accent text-accent-fg ${tile}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="logo-mark h-1/2 w-1/2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Nib body */}
          <path
            className="nib-body"
            pathLength="1"
            d="M12 3C9 3 7 5.4 7 8.6V12l5 8 5-8V8.6C17 5.4 15 3 12 3Z"
          />
          {/* Center slit */}
          <path className="nib-slit" pathLength="1" d="M12 11.5V19" />
          {/* Breather hole */}
          <circle cx="12" cy="9.8" r="1.05" fill="currentColor" stroke="none" />
        </svg>
      </span>
      {showText && (
        <span className={`font-display tracking-tight ${text}`}>
          <span className="text-accent font-bold">Ink</span>
          <span className="text-fg font-bold">well</span>
        </span>
      )}
    </span>
  );
}

export default Logo;
