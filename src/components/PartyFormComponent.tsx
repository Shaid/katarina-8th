import type { Props } from 'astro'

import { createRef } from 'preact'
import { signal } from "@preact/signals"
import debounce from 'debounce'

const baseUrl = 'https://katarinas-8th.paperkat.art'

const processForm = (e: Event, props: Props) => {
    const input: EventTarget | null = e.target
    selections.food = input.value
    console.log('Form!', selections)
}

const pickMovie = async (e: Event, props: Props) => {
    const movie: EventTarget = e.target
    if(movie.type == "radio") {
        console.log('Movie!', movie.value)
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
    console.log(moviesRef, newState)

    if(typeof window !== 'undefined') {
        window.document.getElementById(`movie_${newState.movie}`).checked
        window.document.getElementByName(`allergies`).value = newState.food
    }
    selections.movie = newState.movie
    selections.food = newState.food
}


const pushState = async (who: string) => {
    console.log('BLOB PUSH')
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

        if(props.who == 'cassandra') {
            return (
                <form name='PartyForm' >
                    <div>If you have any food allergies please write them below</div>
                    <input type="text" name="allergies" onChange={e => processForm(e, props)} value={selections.food}/>
                    <fieldset ref={moviesRef} onClick={debounce(e => pickMovie(e, props), 1000)}>
                        <legend>
                            <h4>Voting for the movie</h4>
                        </legend>
                        {props.children}
                    </fieldset>
                </form>

            )
        }
    }

   