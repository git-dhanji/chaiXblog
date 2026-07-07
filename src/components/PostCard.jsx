import { Link } from "react-router-dom";
import { ClockIcon } from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import { excerpt, readingTime, formatDate, coverImage } from "../utils";

function PostCard(post) {
  const { $id, title, Author, content, $createdAt } = post;
  return (
    <Link
      to={`/post/${$id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border
        bg-surface shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift
        hover:border-accent/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        <img
          src={coverImage(post)}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 chip !bg-bg/85 backdrop-blur">
          <ClockIcon className="h-3.5 w-3.5" />
          {readingTime(content)} min read
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-display text-lg font-semibold leading-snug text-fg transition-colors group-hover:text-accent">
          {title}
        </h3>
        {content && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-muted">
            {excerpt(content, 120)}
          </p>
        )}

        <div className="mt-auto flex items-center gap-3 pt-5">
          <Avatar name={Author || "Anonymous"} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fg">
              {Author || "Anonymous"}
            </p>
            {$createdAt && (
              <p className="text-xs text-fg-subtle">{formatDate($createdAt)}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
