export async function fetchSpaceNews() {
  const res = await fetch(
    "https://api.spaceflightnewsapi.net/v4/articles/?limit=10"
  );

  const data = await res.json();

  return data.results.map((item: any) => ({
    id: item.id.toString(),
    title: item.title,
    description: item.summary,
    image: item.image_url,
    url: item.url,
    source: "space",
  }));
}