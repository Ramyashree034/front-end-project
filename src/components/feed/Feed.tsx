"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "@/utils/fetchNews";
import { setContent, ContentItem } from "@/features/content/contentSlice";
import { RootState } from "@/store/store";
import ContentCard from "../cards/ContentCard";
import { fetchSpaceNews } from "@/utils/fetchSpaceNews";

export default function Feed({ search = "" }: { search?: string }) {
  const dispatch = useDispatch();
  const categories = useSelector(
    (s: RootState) => s.preferences.categories
  );
  const items = useSelector((s: RootState) => s.content.items);

  const [ordered, setOrdered] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch content when category changes
  useEffect(() => {
    async function load() {
  if (!categories.length) return;

  try {
    setLoading(true);
    setError("");

    const news = await fetchNews(categories[0]);
const space = await fetchSpaceNews();

// Normalize NewsAPI
const newsMapped: ContentItem[] = news.map((a: any, i: number) => ({
  id: a.url || `news-${i}`,
  title: a.title || "No title",
  description: a.description || "No description",
  image: a.urlToImage || "",
  url: a.url || "",
  source: a.source?.name || "News",
}));

// Normalize Spaceflight API
const spaceMapped: ContentItem[] = space.map((a: any, i: number) => ({
  id: a.id ? String(a.id) : `space-${i}`,
  title: a.title || "No title",
  description: a.summary || "No description",
  image: a.image_url || "",
  url: a.url || "",
  source: a.news_site || "Space",
}));

const merged = [...newsMapped, ...spaceMapped];

dispatch(setContent(merged));
setOrdered(merged);
  } catch (err) {
    console.error(err);
    setError("Failed to load content. Please try again.");
  } finally {
    setLoading(false);
  }
}

    load();
  }, [categories, dispatch]);

  // Sync local ordered state with Redux items
  useEffect(() => {
    setOrdered(items);
  }, [items]);

  // Drag reorder
  function moveCard(from: number, to: number) {
    const updated = [...ordered];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setOrdered(updated);
  }

  // Search filter
  const filtered = ordered.filter((i) =>
    i.title?.toLowerCase().includes(search.toLowerCase())
  );

  // Loading state
  if (loading) {
    return (
      <div className="p-16 text-center text-gray-500 animate-pulse">
        Loading content...
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-16 text-center text-red-500">
        {error}
      </div>
    );
  }

  // Empty state
  if (!filtered.length) {
    return (
      <div className="p-16 text-center text-gray-400">
        No content found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filtered.map((item, index) => (
        <ContentCard
          key={item.id}
          item={item}
          index={index}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
}
