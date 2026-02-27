"use client";

import { ContentItem, toggleFavorite } from "@/features/content/contentSlice";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { motion } from "framer-motion";

type DragItem = {
  index: number;
};

export default function ContentCard({
  item,
  index,
  moveCard,
}: {
  item: ContentItem;
  index: number;
  moveCard: (from: number, to: number) => void;
}) {
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);

  // SAFE IMAGE SOURCE
  const imageSrc =
    item.image && item.image.startsWith("http")
      ? item.image.replace("http://", "https://")
      : "/images/fallback.jpg";

  // DROP
  const [, drop] = useDrop<DragItem>({
    accept: "CARD",
    hover(dragItem) {
      if (!ref.current) return;
      if (dragItem.index === index) return;

      moveCard(dragItem.index, index);
      dragItem.index = index;
    },
  });

  // DRAG
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      className="bg-white shadow-md hover:shadow-xl transition-shadow duration-200 rounded-xl overflow-hidden cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <img
        src={imageSrc}
        onError={(e) => {
          e.currentTarget.src = "/images/fallback.jpg";
        }}
        className="w-full h-40 object-cover"
      />

      <div className="p-3 space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3">
          {item.description}
        </p>

        <button
          onClick={() => dispatch(toggleFavorite(item))}
          className="mt-3 text-sm text-red-500 hover:text-red-600"
        >
          ❤️ Favorite
        </button>
      </div>
    </motion.div>
  );
}
