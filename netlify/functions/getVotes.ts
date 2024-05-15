import type { Config, Context } from "@netlify/functions"
import { getStore } from "@netlify/blobs"
import { defaultFetchOptions } from './defaults.ts'


export default async (request: Request, context: Context) => {
    console.log('starting')
    const store = getStore({
      name: "katarinas-8th",
    })
    console.log('got store')
  
    let blobCount = 0;

    for await (const entry of store.list({ paginate: true })) {
      blobCount += entry.blobs.length;
  
      console.log(entry.blobs);
    }
  
    return new Response(`Found ${blobCount} blobs`);
  
    const { blobs } = await store.list()
    console.log('got data!', blobs)
  
    return new Response(blobs, defaultFetchOptions)
}

export const config: Config = {
  path: "/api/votes"
}