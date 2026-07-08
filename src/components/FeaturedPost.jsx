import { Link } from "react-router-dom";
import { ClockIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import { excerpt, readingTime, formatDate, coverImage } from "../utils";

/** Large horizontal hero card for the newest / featured post. */
export default function FeaturedPost(post) {
  const { $id, title, Author, content, $createdAt } = post;
  return (
    <Link
      to={`/post/${$id}`}
      className="group grid overflow-hidden rounded-3xl border border-border bg-surface
        shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/40
        hover:shadow-lift lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2 lg:aspect-auto">
        <img
          src={coverImage(post)}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 chip !bg-accent !text-accent-fg !border-transparent">
          Featured
        </span>
      </div>

      <div className="flex flex-col justify-center p-7 sm:p-10">
        <span className="chip mb-4 w-fit">
          <ClockIcon className="h-3.5 w-3.5" />
          {readingTime(content)} min read
        </span>
        <h3 className="font-display text-2xl font-bold leading-tight text-fg transition-colors group-hover:text-accent sm:text-3xl">
          {title}
        </h3>
        {content && (
          <p className="mt-3 line-clamp-3 text-fg-muted">
            {excerpt(content, 220)}
          </p>
        )}
        <div className="mt-6 flex items-center gap-3">
          <Avatar name={Author || "Anonymous"} />
          <div>
            <p className="text-sm font-semibold text-fg">
              {Author || "Anonymous"}
            </p>
            {$createdAt && (
              <p className="text-xs text-fg-subtle">{formatDate($createdAt)}</p>
            )}
          </div>
        </div>
        <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all group-hover:gap-2">
          Read article <ArrowRightIcon className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
