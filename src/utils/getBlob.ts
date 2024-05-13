import { getStore } from "@netlify/blobs";

export default async (who: string) => {
  try {
    const store = getStore("katarinas-8th");
    
    const data = await store.get(who);
  
    return new Response(data);
  } catch (MissingBlobsEnvironmentError) {
    console.error("Not netlifying!")
  }

};