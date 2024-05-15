import type { Config, Context } from "@netlify/functions"
import { getStore } from "@netlify/blobs"
import { defaultFetchOptions } from './defaults.ts'

import invitees from '../../src/data/invitees.ts'


export default async (request: Request, context: Context) => {
    console.log('starting')
    const store = getStore({
      name: "katarinas-8th",
      consistency: "strong",
    })
    console.log('got store')
  
    console.log('Looping over:', invitees)
  
    const votes: object = {}

    for (var invitee of invitees) {
        const vote = await store.get(invitee, { type: 'json'})
        console.log(invitee, vote)
        if(vote && typeof vote.movie !== undefined) {
		    votes[vote.movie] = (votes[vote.movie] || 0) + 1
        }
	}
    console.log('got data!', votes)
  
    return new Response(JSON.stringify(votes), defaultFetchOptions)
}

export const config: Config = {
  path: "/api/votes"
}