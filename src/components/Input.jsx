import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="mb-1.5 block text-sm font-medium text-fg-muted"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-fg
          placeholder:text-fg-subtle outline-none transition
          focus:border-accent focus:ring-2 focus:ring-accent/25
          file:mr-3 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-1.5
          file:text-sm file:font-semibold file:text-accent-fg ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
