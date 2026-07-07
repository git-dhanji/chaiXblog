// Shared helpers used across the blog UI.
import appwriteService from "../appwrite/config";

/**
 * Resolve a post's cover image URL. Demo posts carry a direct `cover` URL;
 * real posts store an Appwrite file id in `featuredImage`.
 */
export const coverImage = (post = {}) =>
  post.cover
    ? post.cover
    : post.featuredImage
    ? appwriteService.getFilePreview(post.featuredImage)
    : "";

/** Strip HTML tags from rich-text content and collapse whitespace. */
export const stripHtml = (html = "") =>
  html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Remove inline <img> (and empty <figure>) tags from rich-text.
 * The blog view shows a single hero cover image, so we strip any images
 * embedded in the body to keep just one image on screen at a time.
 */
export const stripImages = (html = "") =>
  html
    .replace(/<img[^>]*>/gi, "")
    .replace(/<figure[^>]*>\s*<\/figure>/gi, "");

/** A short plain-text excerpt from rich-text content. */
export const excerpt = (html = "", length = 140) => {
  const text = stripHtml(html);
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
};

/** Estimated reading time in minutes (~200 wpm), min 1. */
export const readingTime = (html = "") => {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

/** Format an Appwrite/ISO date like "Jul 7, 2026". */
export const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/** Deterministic initials for an author avatar. */
export const initials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() || "")
    .join("") || "?";
