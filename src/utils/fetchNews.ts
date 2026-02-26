import axios from "axios";

const API_KEY = "49fd4dac4eae491984cb25ee84d7cdc7";

export async function fetchNews(category: string) {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${API_KEY}`
  );

  return res.data.articles.map((a: any, index: number) => ({
    id: index.toString(),
    title: a.title,
    description: a.description,
    image: a.urlToImage,
    source: a.source.name,
  }));
}