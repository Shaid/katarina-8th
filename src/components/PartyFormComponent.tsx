import type { Props } from "astro"
//import getBlob from "../utils/getBlob"
//import setBlob from "../utils/setBlob"

const processForm = (e: Event) => {
    const input: EventTarget | null = e.target
    console.log('Form!', input.name, input.value)
}

const pickMovie = (e: Event) => {
    const movie: EventTarget = e.target
    console.log('Movie!', movie.id)

}


export default (props: Props) =>
    {
        console.log(props)
        return (
            <form name='PartyForm' >
                <div>If you have any food allergies please write them below</div>
                <input type="text" name="test" onBlur={processForm} />
                <h4>Voting for the movie</h4>

                {props.children}
            </form>

        )
    }

   