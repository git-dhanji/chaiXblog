import { Link } from "react-router-dom";
import {
  BoltIcon,
  ShieldCheckIcon,
  SparklesIcon,
  GlobeAltIcon,
  ChartBarSquareIcon,
  PencilSquareIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import PostCard from "../PostCard";
import FeaturedPost from "../FeaturedPost";
import Button from "../Button";
import Container from "../container/Container";

const FEATURES = [
  {
    icon: BoltIcon,
    title: "Lightning fast",
    desc: "Built on Vite and React for instant navigation and buttery-smooth reading.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Secure by default",
    desc: "Authentication and storage powered by Appwrite, so your data stays yours.",
  },
  {
    icon: PencilSquareIcon,
    title: "Rich editor",
    desc: "Write with a full-featured editor — images, formatting, and code blocks.",
  },
  {
    icon: GlobeAltIcon,
    title: "Read anywhere",
    desc: "A fully responsive experience that looks great on every screen size.",
  },
  {
    icon: ChartBarSquareIcon,
    title: "Reading insights",
    desc: "Reading-time estimates and progress tracking keep readers engaged.",
  },
  {
    icon: SparklesIcon,
    title: "Beautifully themed",
    desc: "A cohesive light & dark design system tuned for long-form reading.",
  },
];

const STATS = [
  { value: "10k+", label: "Monthly readers" },
  { value: "500+", label: "Articles published" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "Reader rating" },
];

export default function Landing({ posts = [], authStatus = false }) {
  const featured = posts[0];
  const latest = posts.slice(1, 7);

  return (
    <div>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

        <Container className="relative py-20 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow animate-fade-in">
              <SparklesIcon className="h-4 w-4" />
              Fresh perspectives, brewed daily
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-fg sm:text-6xl animate-fade-up">
              Stories worth
              <br className="hidden sm:block" /> savouring, on{" "}
              <span className="text-accent">Inkwell</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-fg-muted animate-fade-up">
              Deep dives on technology, design, and ideas — thoughtfully written
              and beautifully presented. Pour a cup and start reading.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
              <Link to={authStatus ? "/all-posts" : "/signup"}>
                <Button size="lg">
                  {authStatus ? "Browse articles" : "Get started free"}
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/all-posts">
                <Button size="lg" variant="outline">
                  Explore the blog
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-surface px-4 py-6 text-center">
                <div className="font-display text-2xl font-bold text-fg sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-fg-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------- Published articles (public) ---------------- */}
      {featured && (
        <section className="py-16">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow">From the blog</span>
                <h2 className="mt-2 font-display text-3xl font-bold text-fg">
                  Latest published stories
                </h2>
              </div>
              <Link
                to="/all-posts"
                className="hidden items-center gap-1 text-sm font-semibold text-accent hover:gap-2 sm:inline-flex transition-all"
              >
                View all <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Featured newest post */}
            <div className="mt-8">
              <FeaturedPost {...featured} />
            </div>

            {/* Remaining recent posts */}
            {latest.length > 0 && (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latest.map((post) => (
                  <PostCard key={post.$id} {...post} />
                ))}
              </div>
            )}

            <div className="mt-10 flex justify-center sm:hidden">
              <Link to="/all-posts">
                <Button variant="outline">
                  View all articles <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* ---------------- Features ---------------- */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Why Inkwell</span>
            <h2 className="mt-2 font-display text-3xl font-bold text-fg sm:text-4xl">
              Everything a modern blog should be
            </h2>
            <p className="mt-4 text-fg-muted">
              Thoughtfully engineered from the ground up for writers and readers
              alike.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-fg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------------- CTA band ---------------- */}
      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-14 text-center shadow-lift sm:px-12">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold text-accent-fg sm:text-4xl">
                Have a story to tell?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-accent-fg/90">
                Join a community of curious writers and share your ideas with
                readers around the world.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link to={authStatus ? "/add-post" : "/signup"}>
                  <Button
                    size="lg"
                    className="!bg-accent-fg !text-accent hover:!opacity-90"
                  >
                    {authStatus ? "Write a post" : "Create your account"}
                    <ArrowRightIcon className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
