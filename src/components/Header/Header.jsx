import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Bars3Icon, XMarkIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import LogoutBtn from "./LogoutBtn";
import Button from "../Button";
import Logo from "../Logo";
import ThemeToggle from "../ThemeToggle";

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen]);

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Articles", slug: "/all-posts", active: true },
    { name: "Write", slug: "/add-post", active: authStatus },
  ];

  const linkClass = ({ isActive }) =>
    `relative px-1 py-1 text-sm font-medium transition-colors ${
      isActive ? "text-accent" : "text-fg-muted hover:text-fg"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 glass transition-shadow ${
        scrolled ? "border-b border-border shadow-soft" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" aria-label="Inkwell home">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems
            .filter((i) => i.active)
            .map((item) => (
              <li key={item.name}>
                <NavLink to={item.slug} className={linkClass} end={item.slug === "/"}>
                  {({ isActive }) => (
                    <>
                      {item.name}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-accent" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
        </ul>

        {/* Right cluster */}
        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:grid" />
          <div className="hidden md:block">
            {authStatus ? (
              <LogoutBtn />
            ) : (
              <Link to="/login">
                <Button size="sm">Sign in</Button>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setNavOpen(true)}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-border text-fg md:hidden"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${navOpen ? "" : "pointer-events-none"}`}
        aria-hidden={!navOpen}
      >
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${
            navOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setNavOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-4/5 max-w-xs flex-col bg-surface p-6 shadow-lift transition-transform duration-300 ${
            navOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              onClick={() => setNavOpen(false)}
              aria-label="Close menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-fg"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <ul className="mt-8 flex flex-col gap-1">
            {navItems
              .filter((i) => i.active)
              .map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    end={item.slug === "/"}
                    onClick={() => setNavOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-lg font-medium transition ${
                        isActive
                          ? "bg-accent-soft text-accent"
                          : "text-fg hover:bg-surface-2"
                      }`
                    }
                  >
                    {item.name === "Write" && <PencilSquareIcon className="h-5 w-5" />}
                    {item.name}
                  </NavLink>
                </li>
              ))}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-6">
            <ThemeToggle />
            <div className="flex-1">
              {authStatus ? (
                <LogoutBtn />
              ) : (
                <Link to="/login" onClick={() => setNavOpen(false)}>
                  <Button className="w-full">Sign in</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
