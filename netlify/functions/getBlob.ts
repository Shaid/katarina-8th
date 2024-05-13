import type { Config, Context } from "@netlify/functions"
import { getStore } from "@netlify/blobs";

export default async (request: Request, context: Context) => {
    const { who } = context.params
    const store = getStore("katarinas-8th");
    const data = await store.get(who);
  
    return new Response(data);
}

export const config: Config = {
  path: "/api/get/:who"
}