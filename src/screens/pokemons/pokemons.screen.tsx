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
    <SafeAreaProvider>
      <SafeAreaView>
        <Image style={styles.pokeballImage} source={require('@assets/pokeball.png')} />
        <FlatList 
          data={pokemons}
          columnWrapperStyle={styles.listColumnWrapper}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          renderItem={(item) => <PokemonCard pokemon={item.item} />}
          onEndReached={getPokemon} 
          keyExtractor={item => item.id.toString()}/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  pokeballImage: {
    position: 'absolute',
    right: -50,
    top: -50,
    width: 200,
    height: 200,
    opacity: 0.1
  },
  listContainer: {
    paddingTop: 70
  },
  listColumnWrapper: {
    paddingVertical: 10,
    justifyContent: 'space-evenly'
  }
})

export {PokemonsScreen};
