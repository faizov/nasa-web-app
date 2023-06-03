export default async function (url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    console.log("response.ok", res.ok);
    throw new Error("Network response was not ok");
  }
  return await res.json();
}
