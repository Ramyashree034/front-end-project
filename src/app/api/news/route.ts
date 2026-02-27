import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || "technology";

  const API_KEY = "49fd4dac4eae491984cb25ee84d7cdc7"; // ← paste your key here

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
  );

  const data = await res.json();

  return NextResponse.json(data.articles);
}