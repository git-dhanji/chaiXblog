/**
 * Built-in demo articles.
 *
 * These render automatically whenever the Appwrite backend returns no posts
 * (e.g. before you've published anything, or without configured env vars), so
 * the site never looks empty. As soon as real posts exist, they replace these.
 *
 * Each article is written as a full "blog template": lead intro, section
 * headings (h2) and subheadings (h3), bullet + numbered lists, a pull-quote,
 * inline images, code blocks, links, and a closing takeaway — so they exercise
 * every style in `.browser-css` (see src/index.css) and read like real posts.
 *
 * `cover` is a direct image URL (used instead of an Appwrite file id) so the
 * samples work with no storage bucket. See `coverImage()` in src/utils.
 */
export const SAMPLE_POSTS = [
  {
    $id: "designing-with-intention",
    title: "Designing With Intention: Building Interfaces People Trust",
    Author: "Aarav Mehta",
    status: "active",
    $createdAt: "2026-06-28T09:30:00.000Z",
    cover: "https://picsum.photos/seed/inkwell-design/1200/800",
    content: `
      <p><strong>Great design isn't loud.</strong> It's the quiet confidence of an
      interface that does exactly what you expect, exactly when you expect it.
      When every colour, spacing decision, and interaction serves a purpose,
      people stop noticing the UI and start trusting the product.</p>

      <p>In this article we'll walk through a practical, repeatable approach to
      intentional design — from tokens to motion — that scales from a weekend
      side-project to a product used by thousands.</p>

      <h2>1. Start with a system, not a screen</h2>
      <p>The fastest route to a cohesive product is to decide your foundations
      <em>once</em> and reuse them everywhere. Designers call these
      <strong>design tokens</strong>: named values for colour, type, spacing, and
      radius. They turn a thousand tiny decisions into a handful of good ones.</p>

      <h3>What belongs in your token set</h3>
      <ul>
        <li><strong>Semantic colours</strong> — <code>surface</code>,
        <code>foreground</code>, <code>accent</code> — never raw hex in components.</li>
        <li><strong>A type scale</strong> — one family, a few deliberate sizes.</li>
        <li><strong>Spacing &amp; radius steps</strong> — a consistent rhythm.</li>
      </ul>

      <p>Because the values are named, theming becomes trivial. Here's the entire
      idea behind a light/dark system expressed as CSS variables:</p>

      <pre><code>:root {
  --bg: 255 255 255;
  --fg: 17 24 21;
  --accent: 4 120 87;
}
.dark {
  --bg: 11 13 12;
  --fg: 237 242 239;
  --accent: 62 207 142;
}</code></pre>

      <p>Flip one class on the root element and the whole interface re-themes.
      No duplicated styles, no drift between modes.</p>

      <img src="https://picsum.photos/seed/inkwell-tokens/1200/700" alt="A design system colour palette" />

      <h2>2. Establish a clear visual hierarchy</h2>
      <p>Readers don't read screens — they scan them. Your job is to guide the eye
      to the most important thing first, then the next, and the next.</p>
      <ol>
        <li><strong>Contrast</strong> pulls attention to what matters.</li>
        <li><strong>Scale</strong> signals importance before a word is read.</li>
        <li><strong>Whitespace</strong> gives every element room to breathe.</li>
      </ol>

      <blockquote>If everything is emphasised, nothing is. Restraint is the most
      underrated design skill.</blockquote>

      <h2>3. Motion with meaning</h2>
      <p>Animation should <em>explain</em> a change, not decorate it. A card that
      lifts slightly on hover tells you it's clickable. A progress bar tells you
      where you are. Anything else is noise that slows people down.</p>
      <p>Keep transitions short (150–300ms), ease them naturally, and always
      respect <code>prefers-reduced-motion</code> for accessibility.</p>

      <h2>Wrapping up</h2>
      <p>Intentional design isn't about adding more — it's about removing until
      only the meaningful remains. Start with a system, guide the eye, and let
      motion do real work. Do that consistently, and polish stops being something
      you chase; it becomes a by-product of good decisions.</p>
      <p><strong>Your turn:</strong> pick one screen in your product and remove
      every element that isn't earning its place. You'll be surprised how much
      better it looks.</p>
    `,
  },
  {
    $id: "the-quiet-power-of-dark-mode",
    title: "The Quiet Power of a Well-Built Dark Mode",
    Author: "Sara Kapoor",
    status: "active",
    $createdAt: "2026-06-24T14:10:00.000Z",
    cover: "https://picsum.photos/seed/inkwell-dark/1200/800",
    content: `
      <p><strong>Dark mode is more than an inverted colour scheme.</strong> Done
      well, it reduces eye strain, saves battery on OLED screens, and gives a
      product a premium, focused feel. Done poorly, it's a muddy mess of
      low-contrast greys that nobody enjoys reading.</p>

      <p>Let's look at what separates a thoughtful dark theme from a lazy one.</p>

      <h2>Contrast is everything</h2>
      <p>The most common mistake is taking pure black text on pure white and
      simply flipping it to pure white on pure black. The result is harsh and
      hard to read for long stretches.</p>
      <p>Instead:</p>
      <ul>
        <li>Use a <strong>near-black</strong> background, not <code>#000000</code>.</li>
        <li>Use a <strong>soft off-white</strong> for body text.</li>
        <li>Reserve your <strong>brightest values</strong> for accents and CTAs.</li>
      </ul>

      <blockquote>A good dark theme feels like dusk, not a power cut.</blockquote>

      <h2>One source of truth</h2>
      <p>Drive both themes from the same set of variables. Then switching is a
      single class toggle, and you persist the user's choice:</p>

      <pre><code>function toggleTheme() {
  const root = document.documentElement;
  const next = root.classList.toggle("dark") ? "dark" : "light";
  localStorage.setItem("theme", next);
}</code></pre>

      <h3>Don't flash the wrong theme</h3>
      <p>Read the saved preference in a tiny inline script <em>before</em> your
      app renders, so the first paint is already correct. A flash of the wrong
      theme is the tell-tale sign of a rushed implementation.</p>

      <img src="https://picsum.photos/seed/inkwell-contrast/1200/700" alt="Light and dark theme side by side" />

      <h2>Respect the reader</h2>
      <ol>
        <li>Default to the user's <strong>system preference</strong>.</li>
        <li>Let them <strong>override</strong> it explicitly.</li>
        <li><strong>Remember</strong> their choice next visit.</li>
      </ol>

      <h2>Wrapping up</h2>
      <p>A thoughtful dark mode signals craftsmanship before a user reads a single
      word. Get contrast right, keep one source of truth, and never flash the
      wrong theme — and your product will feel considered in the dark as much as
      in the light.</p>
    `,
  },
  {
    $id: "react-performance-that-matters",
    title: "React Performance That Actually Matters",
    Author: "Dev Sharma",
    status: "active",
    $createdAt: "2026-06-19T11:00:00.000Z",
    cover: "https://picsum.photos/seed/inkwell-react/1200/800",
    content: `
      <p><strong>Premature optimization wastes time; ignored optimization loses
      users.</strong> The trick is knowing which performance work actually moves
      the needle — and which is just busywork that makes you feel productive.</p>

      <h2>Measure before you optimize</h2>
      <p>Never guess. Use the React Profiler and your browser's performance panel
      to find the real bottleneck. A component re-rendering 200 times is only a
      problem if it's expensive or on a hot path.</p>

      <blockquote>You can't improve what you don't measure. Profile first, optimise second.</blockquote>

      <h2>The high-leverage wins</h2>
      <p>In practice, most React apps get faster from a small set of techniques:</p>
      <ul>
        <li><strong>Code-split routes</strong> with <code>React.lazy</code> and <code>Suspense</code>.</li>
        <li><strong>Memoize</strong> expensive derived values with <code>useMemo</code>.</li>
        <li><strong>Virtualize</strong> long lists instead of rendering thousands of nodes.</li>
        <li><strong>Ship less JavaScript</strong> — the fastest code is the code you never send.</li>
      </ul>

      <h3>Example: memoizing a costly calculation</h3>
      <pre><code>const sortedPosts = useMemo(() => {
  return [...posts].sort((a, b) =>
    new Date(b.createdAt) - new Date(a.createdAt)
  );
}, [posts]);</code></pre>
      <p>Now the sort only re-runs when <code>posts</code> actually changes — not
      on every unrelated render.</p>

      <img src="https://picsum.photos/seed/inkwell-profiler/1200/700" alt="A performance profiler flame chart" />

      <h2>Perceived speed wins</h2>
      <p>Here's the secret most benchmarks miss: users judge <em>perceived</em>
      speed, not milliseconds. These often matter more than raw numbers:</p>
      <ol>
        <li><strong>Skeleton loaders</strong> so the layout appears instantly.</li>
        <li><strong>Optimistic updates</strong> so actions feel immediate.</li>
        <li><strong>Instant navigation</strong> with prefetching.</li>
      </ol>
      <p>Users forgive <em>slow</em>. They don't forgive <em>frozen</em>.</p>

      <h2>Wrapping up</h2>
      <p>Measure, fix the few things that matter, and optimise for what users
      actually feel. Do that and you'll spend less time chasing micro-benchmarks
      and more time shipping an app that feels genuinely fast.</p>
    `,
  },
  {
    $id: "writing-that-people-finish",
    title: "How to Write Articles People Actually Finish",
    Author: "Aarav Mehta",
    status: "active",
    $createdAt: "2026-06-12T08:45:00.000Z",
    cover: "https://picsum.photos/seed/inkwell-writing/1200/800",
    content: `
      <p><strong>Anyone can start an article. The real skill is keeping a reader
      with you to the last line.</strong> Attention isn't given — it's earned,
      sentence by sentence. Here's how to earn it.</p>

      <h2>Earn the first ten seconds</h2>
      <p>Most readers decide whether to continue within a sentence or two. So open
      with a concrete promise or a sharp observation — never a slow warm-up.</p>
      <ul>
        <li>❌ "In today's fast-paced world, writing is important…"</li>
        <li>✅ "Most articles lose the reader in the first paragraph. Yours won't."</li>
      </ul>

      <h2>Write in short, scannable blocks</h2>
      <p>Dense walls of text scare readers off before they begin. Break ideas into
      small paragraphs, use headings as signposts, and let whitespace breathe.</p>

      <blockquote>Clarity is a kindness. Respect your reader's time and they'll
      give you their attention in return.</blockquote>

      <h3>A simple structure that always works</h3>
      <ol>
        <li><strong>Hook</strong> — promise something worth their time.</li>
        <li><strong>Body</strong> — deliver it in clear, ordered sections.</li>
        <li><strong>Takeaway</strong> — end with one line worth remembering.</li>
      </ol>

      <img src="https://picsum.photos/seed/inkwell-desk/1200/700" alt="A writing desk with notebook and coffee" />

      <h2>Edit like a reader, not a writer</h2>
      <p>Your first draft is for you. Every draft after is for the reader. Read it
      aloud, cut every word that doesn't earn its place, and delete your favourite
      sentence if it's slowing things down. It probably is.</p>

      <h2>Wrapping up</h2>
      <p>Hook fast, write in blocks, and end with something quotable. Do that and
      readers won't just start your articles — they'll finish them, and come back
      for the next one.</p>
    `,
  },
  {
    $id: "shipping-side-projects",
    title: "Shipping Side Projects Without Burning Out",
    Author: "Sara Kapoor",
    status: "active",
    $createdAt: "2026-06-05T17:20:00.000Z",
    cover: "https://picsum.photos/seed/inkwell-ship/1200/800",
    content: `
      <p><strong>The graveyard of unfinished side projects is vast.</strong> The
      difference between a project you finish and one you abandon is rarely talent
      — it's scope, momentum, and a little bit of psychology.</p>

      <h2>Cut the idea in half — then again</h2>
      <p>Your first version should be almost embarrassingly small. Ship the
      tiniest thing that delivers real value, then grow it based on what you
      actually learn from real use.</p>

      <blockquote>A finished tiny project beats a perfect imaginary one every single time.</blockquote>

      <h2>Make momentum easy</h2>
      <p>Motivation is unreliable; systems aren't. Design your project so the next
      step is always obvious:</p>
      <ul>
        <li>Work in <strong>small, finishable sessions</strong> — 30 focused minutes beats a vague afternoon.</li>
        <li>Keep a <strong>visible list</strong> of next actions.</li>
        <li><strong>Deploy early</strong> so progress feels real.</li>
      </ul>

      <h3>Leave a breadcrumb for tomorrow</h3>
      <p>Before you stop for the day, write down the very next thing to do — even
      mid-sentence. Starting again is the hardest part, and this removes the
      friction entirely.</p>

      <img src="https://picsum.photos/seed/inkwell-launch/1200/700" alt="A laptop showing a project being deployed" />

      <h2>Protect the joy</h2>
      <p>Side projects are supposed to be fun. The moment it feels like a second
      job, shrink the scope, not your rest. Burnout finishes nothing.</p>

      <h2>Wrapping up</h2>
      <p>Cut scope ruthlessly, build momentum deliberately, and guard the joy that
      made you start. Ship the small version this week — you can always make it
      bigger once it's real.</p>
    `,
  },
  {
    $id: "a-cup-of-chai-and-clean-code",
    title: "A Cup of Chai and the Art of Clean Code",
    Author: "Dev Sharma",
    status: "active",
    $createdAt: "2026-05-30T10:05:00.000Z",
    cover: "https://picsum.photos/seed/inkwell-code/1200/800",
    content: `
      <p><strong>Clean code, like a good cup of chai, is about balance.</strong>
      Too clever and it turns bitter to maintain; too loose and it falls apart.
      The goal is code the next person — often future you — can read without a
      headache.</p>

      <h2>Name things like you mean it</h2>
      <p>A well-named function needs no comment. Compare these two:</p>
      <pre><code>// unclear
function doStuff(d) { /* ... */ }

// obvious
function calculateReadingTime(html) { /* ... */ }</code></pre>
      <p>The second one documents itself. Good names are the cheapest documentation you'll ever write.</p>

      <h2>Small pieces, loosely joined</h2>
      <p>Prefer many small, focused functions over one that does everything. Each
      should do a single thing and be easy to test in isolation.</p>
      <ul>
        <li><strong>One responsibility</strong> per function.</li>
        <li><strong>Side effects at the edges</strong>, pure logic in the middle.</li>
        <li><strong>Delete</strong> code you don't need — less is faster and safer.</li>
      </ul>

      <blockquote>The best code isn't the cleverest. It's the code the next person understands in one read.</blockquote>

      <h3>Optimise for reading, not writing</h3>
      <p>You write a line of code once but read it dozens of times. A few extra
      seconds spent on a clear name or a simpler structure pays for itself many
      times over.</p>

      <img src="https://picsum.photos/seed/inkwell-cleancode/1200/700" alt="A tidy code editor with clean syntax" />

      <h2>A quick checklist before you commit</h2>
      <ol>
        <li>Would a teammate understand this without you explaining it?</li>
        <li>Is there a simpler version hiding inside?</li>
        <li>Did you remove everything you no longer need?</li>
      </ol>

      <h2>Wrapping up</h2>
      <p>Write code the way you'd pour chai for a friend — with care, a little
      warmth, and no unnecessary complications. Your future self, reading it at
      2&nbsp;a.m. six months from now, will thank you.</p>
    `,
  },
];

export default SAMPLE_POSTS;
