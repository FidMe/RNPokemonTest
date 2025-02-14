import { PokemonCard } from '@components/pokemonCard.component';
import { fetchPokemon, fetchPokemonDetails } from 'api/pokemon.api';
import { usePokemon } from 'contexts/pokemonContext';
import React, { useEffect, useState } from 'react';
import {StyleSheet, FlatList, Image} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Pokemon, PokemonDetailed } from 'types/pokemon';

const PokemonsScreen = () => {
  const {pokemons, updatePokemons} = usePokemon()
  const [fetchUrl, setFetchUrl] = useState<string>('https://pokeapi.co/api/v2/pokemon')

  const getPokemon = async () => {
    const { nextUrl, pokemon: fetchedPokemon }: { nextUrl: string, pokemon: Pokemon[] } = await fetchPokemon(fetchUrl)
    setFetchUrl(nextUrl)
    const pormiseSettledResult: PromiseSettledResult<PokemonDetailed | null>[] = await Promise.allSettled(fetchedPokemon.map(({url}) => fetchPokemonDetails(url)))
    const pokemonsDetails = pormiseSettledResult.filter(promise => promise.status === 'fulfilled' && 'value' in promise && promise.value).map(({value}) => value)
    if (pokemonsDetails.some(p => p?.id === 1)) return updatePokemons([...pokemonsDetails])
    const mergedPokemons: PokemonDetailed[] = fetchedPokemon.map(p => {
      const pokemonFound: PokemonDetailed = pokemonsDetails.find(pokemonDetail => pokemonDetail?.name === p.name) as PokemonDetailed
      if (!pokemonFound) return null
      return {...p, ...pokemonFound} as PokemonDetailed
    }).filter(p => p) as PokemonDetailed[]
    updatePokemons([...pokemons, ...mergedPokemons.filter(p => p)])
  }

  useEffect(() => {
    getPokemon()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Pokemon list screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {PokemonsScreen};
