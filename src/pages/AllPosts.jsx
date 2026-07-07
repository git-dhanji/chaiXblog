import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MagnifyingGlassIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
  Container,
  PostCard,
  useDynamicTitle,
  EmptyState,
} from "../components";
import BlogLoading from "../components/BlogLoading";
import { asyncActions } from "../store/documentList";
import { stripHtml } from "../utils";

const SORTS = {
  newest: { label: "Newest", fn: (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt) },
  oldest: { label: "Oldest", fn: (a, b) => new Date(a.$createdAt) - new Date(b.$createdAt) },
  title: { label: "A → Z", fn: (a, b) => (a.title || "").localeCompare(b.title || "") },
};

function AllPosts() {
  useDynamicTitle();
  const { data, fetched, buffering } = useSelector((state) => state.document);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    if (!fetched) dispatch(asyncActions.fetchDocuments());
  }, [dispatch, fetched]);

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? data.filter(
          (p) =>
            p.title?.toLowerCase().includes(q) ||
            p.Author?.toLowerCase().includes(q) ||
            stripHtml(p.content).toLowerCase().includes(q)
        )
      : [...data];
    return filtered.sort(SORTS[sort].fn);
  }, [data, query, sort]);

  if (buffering) return <BlogLoading />;

  return (
    <div className="min-h-[70vh] py-12">
      <Container>
        {/* Page header */}
        <div className="mb-10">
          <span className="eyebrow">The library</span>
          <h1 className="mt-2 font-display text-4xl font-bold text-fg">
            All Articles
          </h1>
          <p className="mt-2 text-fg-muted">
            {data.length} {data.length === 1 ? "story" : "stories"} to explore.
          </p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-fg-subtle" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles, authors, topics…"
              className="w-full rounded-full border border-border bg-surface py-2.5 pl-11 pr-4 text-fg placeholder:text-fg-subtle outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {Object.entries(SORTS).map(([key, { label }]) => (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                  sort === key
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-fg-muted hover:text-fg"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid / empty states */}
        {posts.length === 0 ? (
          query ? (
            <EmptyState
              icon={<MagnifyingGlassIcon className="h-8 w-8" />}
              title="No matches found"
              description={`Nothing matched “${query}”. Try a different search.`}
            />
          ) : (
            <EmptyState
              icon={<DocumentTextIcon className="h-8 w-8" />}
              title="No articles yet"
              description="Be the first to publish a story on Inkwell."
              actionLabel="Write a post"
              actionTo="/add-post"
            />
          )
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
