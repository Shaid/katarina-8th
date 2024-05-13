import type { Props } from 'astro'

import { signal } from "@preact/signals"
import { useEffect } from 'preact/hooks'
import getBlob from '../utils/getBlob'
import setBlob from '../utils/setBlob'
import debounce from 'debounce'

//import getBlob from "../utils/getBlob"
//import setBlob from "../utils/setBlob"

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
    const data = await getBlob(who)
    console.log('BLOB GET', data)
}


const pushState = async (who: string) => {
    console.log('BLOB PUSH')
    await setBlob(who, {
        movie: selections.movie,
        food: selections.food
    })

}

export default (props: Props) =>
    {
        console.log(props)

        getState(props.who)

        return (
            <form name='PartyForm' >
                <div>If you have any food allergies please write them below</div>
                <input type="text" name="test" onChange={e => processForm(e, props)} defaultValue={selections.food}/>
                <fieldset onClick={debounce(e => pickMovie(e, props), 1000)}>
                    <legend>
                        <h4>Voting for the movie</h4>
                    </legend>
                    {props.children}
                </fieldset>
            </form>

        )
    }

   