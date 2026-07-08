import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import {
  ArrowLeftIcon,
  ClockIcon,
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";
import appwriteService from "../appwrite/config";
import {
  Button,
  Container,
  Spinner,
  Avatar,
  PostCard,
  GlobalSpinner,
  ReadingProgress,
  useDynamicTitle,
} from "../components";
import { formatDate, readingTime, coverImage, stripImages } from "../utils";
import { SAMPLE_POSTS } from "../data/samplePosts";

export default function Post() {
  useDynamicTitle();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }
    setLoading(true);
    appwriteService.getPost(slug).then((p) => {
      if (p) {
        setPost(p);
      } else {
        // Fall back to a built-in demo article when the backend has none
        const sample = SAMPLE_POSTS.find((s) => s.$id === slug);
        if (sample) setPost(sample);
        else navigate("/");
      }
      setLoading(false);
    });
  }, [slug, navigate]);

  useEffect(() => {
    if (!post) return;
    appwriteService.getPosts().then((res) => {
      const docs =
        res && Array.isArray(res.documents) && res.documents.length
          ? res.documents
          : SAMPLE_POSTS;
      setRelated(docs.filter((p) => p.$id !== post.$id).slice(0, 3));
    });
  }, [post]);

  const deletePost = () => {
    if (!confirm("Delete this post permanently?")) return;
    setDelLoading(true);
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      } else {
        setDelLoading(false);
      }
    });
  };

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  if (loading) return <GlobalSpinner />;
  if (!post) return null;

  return (
    <article className="pb-16">
      <ReadingProgress />

      <Container className="max-w-3xl pt-10">
        {/* Back */}
        <Link
          to="/all-posts"
          className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition hover:text-accent"
        >
          <ArrowLeftIcon className="h-4 w-4" /> Back to articles
        </Link>

        {/* Title + meta */}
        <header className="mt-6">
          <h1 className="font-display text-3xl font-bold leading-tight text-fg sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-3">
              <Avatar name={post.Author || "Anonymous"} />
              <div>
                <p className="text-sm font-semibold text-fg">
                  {post.Author || "Anonymous"}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-fg-muted">
                  <CalendarDaysIcon className="h-3.5 w-3.5" />
                  {formatDate(post.$createdAt)}
                </p>
              </div>
            </div>
            <span className="chip">
              <ClockIcon className="h-3.5 w-3.5" />
              {readingTime(post.content)} min read
            </span>

            <div className="ml-auto flex items-center gap-2">
              <Button variant="secondary" size="sm" onClick={share}>
                <LinkIcon className="h-4 w-4" />
                {copied ? "Copied!" : "Share"}
              </Button>
              {isAuthor && (
                <>
                  <Link to={`/edit-post/${post.$id}`}>
                    <Button variant="outline" size="sm">
                      <PencilSquareIcon className="h-4 w-4" /> Edit
                    </Button>
                  </Link>
                  <Button variant="danger" size="sm" onClick={deletePost}>
                    {delLoading ? (
                      <Spinner className="h-4 w-4" />
                    ) : (
                      <TrashIcon className="h-4 w-4" />
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </header>
      </Container>

      {/* Cover (kept compact — one small hero image) */}
      <Container className="max-w-2xl">
        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-soft">
          <img
            src={coverImage(post)}
            alt={post.title}
            className="h-52 w-full object-cover sm:h-64"
          />
        </div>
      </Container>

      {/* Body */}
      <Container className="max-w-3xl">
        <div className="browser-css mt-12">
          {parse(stripImages(String(post.content)))}
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <Container className="mt-20 max-w-6xl">
          <div className="border-t border-border pt-12">
            <span className="eyebrow">Keep reading</span>
            <h2 className="mt-2 font-display text-2xl font-bold text-fg">
              More stories
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.$id} {...p} />
              ))}
            </div>
          </div>
        </Container>
      )}
    </article>
  );
}
