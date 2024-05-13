import type { Config, Context } from "@netlify/functions"
import { getStore } from "@netlify/blobs";
import { defaultFetchOptions } from './defaults.ts'

export default async (request: Request, context: Context) => {
    const { who } = context.params  
    const payload = await request.json()
    const store = getStore("katarinas-8th")

    await store.setJSON(who, payload)

    return new Response(`Userdata for ${who} updated successfully.`, defaultFetchOptions)
};

export const config: Config = {
  path: "/api/set/:who"
}