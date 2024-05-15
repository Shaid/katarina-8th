import type { Config, Context } from "@netlify/functions"
import { getStore } from "@netlify/blobs"
import { defaultFetchOptions } from './defaults.ts'


export default async (request: Request, context: Context) => {
    const { who } = context.params
    const store = getStore({
      name: "katarinas-8th",
    })
    const { data } = await store.list()
    console.log(data)
  
    return new Response(data, defaultFetchOptions)
}

export const config: Config = {
  path: "/api/votes/"
}