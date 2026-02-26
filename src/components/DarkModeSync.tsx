"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function DarkModeSync() {
  const dark = useSelector((s: RootState) => s.preferences.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
  }, [dark]);

  return null;
}