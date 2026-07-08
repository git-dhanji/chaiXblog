import { Link } from "react-router-dom";
import Logo from "./Logo";

/**
 * Shared split-screen shell for the Login / Signup pages:
 * a solid accent brand panel on the left, the form on the right.
 */
export default function AuthShell({ children }) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Brand panel */}
      <div className="relative hidden overflow-hidden bg-accent lg:block">
        <div className="absolute inset-0 bg-grid opacity-[0.12]" />
        <div className="relative flex h-full flex-col justify-between p-12 text-accent-fg">
          <Link to="/">
            <span className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-fg/15 backdrop-blur">
                <span className="font-display text-lg font-bold">c</span>
              </span>
              <span className="font-display text-xl font-bold">Inkwell</span>
            </span>
          </Link>
          <div className="max-w-sm">
            <blockquote className="font-display text-2xl font-medium leading-snug">
              “The scariest moment is always just before you start. After that,
              things can only get better.”
            </blockquote>
            <p className="mt-4 text-sm text-accent-fg/80">— Stephen King</p>
          </div>
          <p className="text-sm text-accent-fg/70">
            Where ideas steep into stories.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo size="lg" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
