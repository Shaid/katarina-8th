import type { Config, Context } from "@netlify/functions"
import { getStore } from "@netlify/blobs"
import { defaultFetchOptions } from './defaults.ts'

import invitees from '../../src/data/invitees.ts'


export default async (request: Request, context: Context) => {
    console.log('starting')
    const store = getStore({
      name: "katarinas-8th",
    })
    console.log('got store')
  
    console.log('Looping over:', invitees)
  
    const votes: Array<number> = []

    for (var invitee of invitees) {
        const vote = await store.get(invitee, { type: 'json'})
        console.log(invitee, vote, typeof vote, typeof vote.movie)
        if(typeof vote !== null && typeof vote.movie !== undefined) {
		    votes[vote.movie]++
        }
	}
    console.log('got data!', votes.length, votes)
  
    return new Response(votes, defaultFetchOptions)
}

export const config: Config = {
  path: "/api/votes"
}