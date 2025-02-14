import { Pokemon, PokemonDetailed } from "types/pokemon"

export const fetchPokemon = async (url: string): Promise<{nextUrl: string, pokemon: Pokemon[]}> => {
    try {
        const response = await fetch(url)
        const { next: nextUrl, results: pokemon }: { next: string, results: Pokemon[] } = await response.json()
        return { nextUrl, pokemon }
    } catch (error) {
        console.error('Error fetching pokemon', error)
        return { nextUrl: url, pokemon: [] }
    }
}

export const fetchPokemonDetails = async (detailsUrl: string): Promise<PokemonDetailed | null> => {
    try {
        const response = await fetch(detailsUrl)
        const { id, name, url, sprites: {front_default: front, back_default: back}, types }: {
            id: number,
            name: string,
            url: string,
            sprites: {
              front_default: string,
              back_default: string
            },
            types: {
              type: {
                name: string
              }
            }[]
        } = await response.json()
        return { id, name, url, pictureURLs: { front, back }, types: types?.map(({type: {name}}) => name)}
    } catch (error) {
        console.error('Error fetching pokemon', error)
        return null
    }
}