import Logo from "./Logo";

export default function GlobalSpinner() {
  return (
    <div className="grid min-h-[60vh] w-full place-items-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <span className="animate-float">
          <Logo size="lg" showText={false} />
        </span>
        <div className="h-1 w-28 overflow-hidden rounded-full bg-surface-2">
          <div className="h-full w-1/2 animate-[shimmer_1.2s_infinite] rounded-full bg-accent" />
        </div>
        <p className="text-sm text-fg-muted">Brewing your content…</p>
      </div>
    </div>
  );
}
