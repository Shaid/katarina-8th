import type { Config, Context } from "@netlify/functions"
import { getStore } from "@netlify/blobs"
import { defaultFetchOptions } from './defaults.ts'


export default async (request: Request, context: Context) => {
    console.log('starting')
    const store = getStore({
      name: "katarinas-8th",
    })
    console.log('got store')
    const data = await store.list()
    console.log('got data!', data)
  
    return new Response(data, defaultFetchOptions)
}

export const config: Config = {
  path: "/api/votes"
}