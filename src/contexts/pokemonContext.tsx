import { createContext, ReactElement, useContext, useState } from "react";
import { PokemonDetailed } from "types/pokemon";

type PokemonContextProps = {
    pokemons: PokemonDetailed[]
    selectedPokemon?: PokemonDetailed
    selectPokemon: (id: number) => void
    updatePokemons: (pokemons: PokemonDetailed[]) => void
}

export const PokemonContext = createContext<PokemonContextProps>({
    pokemons: [],
    selectedPokemon: undefined,
    selectPokemon: () => {},
    updatePokemons: () => {}
})

export const usePokemon = () => useContext(PokemonContext)

export const PokemonContextProvider = ({ children }: {children: ReactElement}) => {
    const [pokemons, setPokemons] = useState<PokemonDetailed[]>([])
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetailed | undefined>(undefined)

    const updatePokemons = setPokemons

    const selectPokemon = (id: number) => {
        const selectedPokemon: PokemonDetailed | undefined = pokemons.find(p => p.id === id)
        setSelectedPokemon(selectedPokemon)
    }

    return <PokemonContext.Provider value={{ pokemons, updatePokemons, selectedPokemon, selectPokemon }}>{children}</PokemonContext.Provider>
}