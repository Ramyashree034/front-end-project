"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ContentCard from "../cards/ContentCard";

export default function Favorites() {
  const favorites = useSelector(
    (state: RootState) => state.content.favorites
  );

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-gray-500">
        No favorites yet ❤️
      </div>
    );
  }

  // dummy move function (no reorder needed here)
  function moveCard() {}

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {favorites.map((item, index) => (
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