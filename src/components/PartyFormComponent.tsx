import type { Props } from 'astro'

import { createRef } from 'preact'
import { signal } from "@preact/signals"
import debounce from 'debounce'

const baseUrl = 'https://katarinas-8th.paperkat.art'

const processForm = async (e: Event, props: Props) => {
    const input: EventTarget | null = e.target
    selections.food = input.value

    await pushState(props.who)
}

const pickMovie = async (e: Event, props: Props) => {
    const movie: EventTarget = e.target
    if(movie.type == "radio") {
        selections.movie = movie.value

        await pushState(props.who)
    }

}

const selections = signal({
    movie: '',
    food: 'I am allergic to...'
})


const getState = async (who: string) => {
    const data = await fetch(`${baseUrl}/api/get/${who}`)
    const newState = await data.json()

    if(typeof window !== 'undefined') {
        window.document.getElementById(`movie_${newState.movie}`).checked = true
        window.document.getElementById(`text_allergies`).value = newState.food
    }
    selections.movie = newState.movie
    selections.food = newState.food
}


const pushState = async (who: string) => {
    await fetch(`${baseUrl}/api/set/${who}`, {
        method: 'POST',
        body: JSON.stringify({
            movie: selections.movie,
            food: selections.food
        })
    })

}

const moviesRef = createRef();

export default (props: Props) =>
{
    getState(props.who)

    return (
        <form name='PartyForm' >
            <h4>If you have any food allergies please enter them below:</h4>
            <input 
                type="text" 
                id="text_allergies" 
                name="allergies" 
                onChange={e => processForm(e, props)} value={selections.food}
                style="font-size: 1rem; color: #c3cadb; background-color: #ffffff00; border: 0px; border-bottom: 3px solid purple; margin: 1rem 0rem; padding: 1rem;"
                default="Please enter any food allergies."
            />
        
            <h4 style="margin: 1rem 0;">Voting for the movie!</h4>
            <div>Please select the movie you'd most like to watch.</div>
            <fieldset 
                ref={moviesRef} 
                onClick={debounce(e => pickMovie(e, props), 1000)}
                style="border: 1px solid #283044; margin: 2rem 0; padding: 2rem; border-radius: 1rem;"
            >
                <legend>
                </legend>
                {props.children}
            </fieldset>
        </form>

    )
}

   