import { initials } from "../utils";

const SIZES = {
  sm: "h-7 w-7 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-12 w-12 text-sm",
};

export default function Avatar({ name = "", size = "md", className = "" }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-accent-soft
        font-bold uppercase text-accent ring-1 ring-inset ring-accent/15
        ${SIZES[size]} ${className}`}
      title={name}
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  );
}
