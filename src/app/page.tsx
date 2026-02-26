"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import Feed from "@/components/feed/Feed";
import Favorites from "@/components/feed/Favorites";

export default function Page() {
  const [tab, setTab] = useState("feed");
  const [search, setSearch] = useState("");

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Header onSearch={setSearch} />

        <div className="flex gap-2 px-6 py-3 border-b">
          <button
            onClick={() => setTab("feed")}
            className={`px-3 py-1.5 rounded-md text-sm transition
              ${
                tab === "feed"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Feed
          </button>

          <button
            onClick={() => setTab("favorites")}
            className={`px-3 py-1.5 rounded-md text-sm transition
              ${
                tab === "favorites"
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
          >
            Favorites
          </button>
        </div>

        {tab === "feed" && <Feed search={search} />}
        {tab === "favorites" && <Favorites />}
      </div>
    </div>
  );
}