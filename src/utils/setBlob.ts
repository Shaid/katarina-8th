import { getStore } from "@netlify/blobs";

export default async (who: string, payload: object) => {
  try { 
    const store = getStore("katarinas-8th");

    await store.setJSON(who, payload);

    return new Response("User blob set in JSON");
  } catch (MissingBlobsEnvironmentError) {
    console.error("Not netlifying!")
  }
};