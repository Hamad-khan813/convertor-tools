"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export interface HistoryItem {
  id: string; // timestamp
  categorySlug: string;
  categoryName: string;
  toolId?: string;
  toolName?: string;
  value: number;
  fromUnit: string;
  toUnit: string;
  result: number;
  timestamp: number;
}

export interface FavoriteItem {
  categorySlug: string;
  toolId: string;
  toolName: string;
}

// Utility functions that pages can import to append history
export function saveToHistory(item: Omit<HistoryItem, "id" | "timestamp">) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem("convertly_history") || "[]";
    const history: HistoryItem[] = JSON.parse(raw);
    const newItem: HistoryItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    // Prepend and limit to 15 items
    const updated = [newItem, ...history].slice(0, 15);
    localStorage.setItem("convertly_history", JSON.stringify(updated));
    // Dispatch a custom event to notify listeners
    window.dispatchEvent(new Event("convertly_history_updated"));
  } catch (e) {
    console.error("Failed to save history", e);
  }
}

export function toggleFavorite(fav: FavoriteItem): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("convertly_favorites") || "[]";
    let favorites: FavoriteItem[] = JSON.parse(raw);
    const exists = favorites.some((f) => f.toolId === fav.toolId);
    let updated: FavoriteItem[] = [];
    let added = false;

    if (exists) {
      updated = favorites.filter((f) => f.toolId !== fav.toolId);
    } else {
      updated = [...favorites, fav];
      added = true;
    }

    localStorage.setItem("convertly_favorites", JSON.stringify(updated));
    window.dispatchEvent(new Event("convertly_favorites_updated"));
    return added;
  } catch (e) {
    console.error("Failed to toggle favorite", e);
    return false;
  }
}

export function isFavorite(toolId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem("convertly_favorites") || "[]";
    const favorites: FavoriteItem[] = JSON.parse(raw);
    return favorites.some((f) => f.toolId === toolId);
  } catch (e) {
    return false;
  }
}

export default function HistoryAndFavorites() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [activeTab, setActiveTab] = useState<"history" | "favorites">("history");

  const loadData = () => {
    try {
      const rawHistory = localStorage.getItem("convertly_history") || "[]";
      const rawFavorites = localStorage.getItem("convertly_favorites") || "[]";
      setHistory(JSON.parse(rawHistory));
      setFavorites(JSON.parse(rawFavorites));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();

    // Listen to custom updates from other pages
    window.addEventListener("convertly_history_updated", loadData);
    window.addEventListener("convertly_favorites_updated", loadData);

    return () => {
      window.removeEventListener("convertly_history_updated", loadData);
      window.removeEventListener("convertly_favorites_updated", loadData);
    };
  }, []);

  const clearHistory = () => {
    localStorage.setItem("convertly_history", "[]");
    setHistory([]);
  };

  const removeFavoriteItem = (toolId: string) => {
    const updated = favorites.filter((f) => f.toolId !== toolId);
    localStorage.setItem("convertly_favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  const getItemHref = (categorySlug: string, toolId?: string) => {
    if (!toolId || toolId === categorySlug || toolId.endsWith("-converter")) {
      return `/${categorySlug}`;
    }
    return `/${categorySlug}/${toolId}`;
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 shadow-sm">
      {/* Tabs */}
      <div className="flex border-b border-zinc-100 dark:border-zinc-800 pb-3 mb-4">
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 text-center py-1.5 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === "history"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
          }`}
        >
          Recent Activity
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex-1 text-center py-1.5 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
            activeTab === "favorites"
              ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
              : "border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
          }`}
        >
          My Favorites ({favorites.length})
        </button>
      </div>

      {/* Tab Panel: History */}
      {activeTab === "history" && (
        <div>
          {history.length > 0 ? (
            <div className="space-y-3">
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {history.map((item) => (
                  <Link
                    key={item.id}
                    href={getItemHref(item.categorySlug, item.toolId) as any}
                    className="block p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500/20 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {item.categoryName}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        {new Date(item.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="mt-1 text-sm font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors">
                      {item.value} {item.fromUnit} = {item.result.toLocaleString(undefined, { maximumFractionDigits: 4 })} {item.toUnit}
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={clearHistory}
                className="w-full text-center py-2 text-xs font-semibold text-zinc-400 hover:text-red-500 transition-colors border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl mt-3 cursor-pointer"
              >
                Clear History
              </button>
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-zinc-400 dark:text-zinc-500">
              No recent conversions. They will show up here as you convert.
            </div>
          )}
        </div>
      )}

      {/* Tab Panel: Favorites */}
      {activeTab === "favorites" && (
        <div>
          {favorites.length > 0 ? (
            <div className="max-h-[340px] overflow-y-auto space-y-2 pr-1">
              {favorites.map((item) => {
                const favoriteHref = getItemHref(item.categorySlug, item.toolId);
                return (
                  <div
                    key={item.toolId}
                    className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-emerald-500/20 hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-all group"
                  >
                    <Link
                      href={favoriteHref as any}
                      className="flex-1 font-semibold text-sm text-zinc-800 dark:text-zinc-200 group-hover:text-emerald-500 transition-colors"
                    >
                      {item.toolName}
                    </Link>
                    <button
                      onClick={() => removeFavoriteItem(item.toolId)}
                      className="text-zinc-400 hover:text-red-500 p-1 cursor-pointer"
                      aria-label="Remove favorite"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} className="w-4 h-4 text-emerald-500 hover:text-zinc-400 fill-emerald-500 hover:fill-none transition-colors">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-zinc-400 dark:text-zinc-500">
              No favorites saved yet. Click the heart icon on any converter page to bookmark it!
            </div>
          )}
        </div>
      )}
    </div>
  );
}
