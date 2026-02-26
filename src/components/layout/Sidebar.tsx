"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "@/features/preferences/preferencesSlice";
import { RootState } from "@/store/store";

const categories = ["technology", "sports", "business"];

export default function Sidebar() {
  const dispatch = useDispatch();
  const selected = useSelector((s: RootState) => s.preferences.categories);

  return (
    <div className="w-60 p-5 bg-gray-100 border-r min-h-screen">
      <h2 className="font-semibold text-gray-700 mb-4">Categories</h2>

      <div className="space-y-1">
        {categories.map((c) => {
          const active = selected.includes(c);

          return (
            <button
              key={c}
              onClick={() => dispatch(toggleCategory(c))}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition
                ${
                  active
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}