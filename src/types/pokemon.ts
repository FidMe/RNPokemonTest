export type Pokemon = {
    name: string
    url: string
}

export type PokemonDetailed = Pokemon & {
    id: number
    pictureURLs: {
        front: string
        back: string
    }
    types: string[]
}