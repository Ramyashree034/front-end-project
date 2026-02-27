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

  const [, drop] = useDrop<DragItem>({
    accept: "CARD",
    hover(dragItem) {
      if (!ref.current) return;
      if (dragItem.index === index) return;
      moveCard(dragItem.index, index);
      dragItem.index = index;
    },
  });

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
      className="bg-white shadow-md hover:shadow-xl transition rounded-xl overflow-hidden cursor-move"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
     <img
  src={
    item.image?.replace("http://", "https://") ||
    "https://via.placeholder.com/400x200"
  }
  onError={(e) => {
    (e.currentTarget as HTMLImageElement).src =
      "https://via.placeholder.com/400x200";
  }}
  className="w-full h-40 object-cover"
/>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-lg leading-snug line-clamp-2">
          {item.title}
        </h3>

        <p className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </p>

        <button
          onClick={() => dispatch(toggleFavorite(item))}
          className="pt-1 text-sm text-red-500 hover:text-red-600 transition"
        >
          ❤️ Favorite
        </button>
      </div>
    </motion.div>
  );
}
