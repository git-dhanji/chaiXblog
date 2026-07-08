import { Link } from "react-router-dom";
import Button from "./Button";

export default function EmptyState({
  icon = null,
  title = "Nothing here yet",
  description = "",
  actionLabel,
  actionTo,
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-3xl border border-dashed border-border bg-surface/60 px-8 py-16 text-center">
      {icon && (
        <div className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-accent-soft text-accent">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-fg">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-fg-muted">{description}</p>
      )}
      {actionLabel && actionTo && (
        <Link to={actionTo} className="mt-6">
          <Button>{actionLabel}</Button>
        </Link>
      )}
    </div>
  );
}
