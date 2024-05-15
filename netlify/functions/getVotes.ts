import type { Config, Context } from "@netlify/functions"
import { getStore } from "@netlify/blobs"
import { defaultFetchOptions } from './defaults.ts'


export default async (request: Request, context: Context) => {
    console.log('starting')
    const store = getStore({
      name: "katarinas-8th",
    })
    console.log('got store')
    const { blobs } = await store.list({paginate: true})
    console.log('got data!', blobs)
  
    return new Response(blobs, defaultFetchOptions)
}

export const config: Config = {
  path: "/api/votes"
}