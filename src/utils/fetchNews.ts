import axios from "axios";

export async function fetchNews(category: string) {
  const res = await axios.get(`/api/news?category=${category}`);
  return res.data;
}
