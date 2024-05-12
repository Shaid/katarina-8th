import { getStore } from "@netlify/blobs";

export default async (who: string) => {
  const store = getStore("katarinas-8th");
  const data = await store.get(who);

  return new Response(data);
};