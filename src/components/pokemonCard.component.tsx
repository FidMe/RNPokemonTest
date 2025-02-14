import { useNavigation } from '@react-navigation/native';
import { getColorByPokemonType } from '@utils';
import { usePokemon } from 'contexts/pokemonContext';
import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { PokemonDetailed } from "types/pokemon";

export const PokemonCard = ({pokemon}: {pokemon: PokemonDetailed}) => {
    const navigation = useNavigation()
    const { selectPokemon } = usePokemon()

    const typeColor: string = getColorByPokemonType(pokemon.types?.[0] || '')

    const navigateToPokemonDetails = () => {
      selectPokemon(pokemon.id)
      navigation.navigate('Pokemon')
    }

    return (
      <TouchableOpacity
        onPress={navigateToPokemonDetails}
        style={{backgroundColor: typeColor, ...styles.container}}>
          <Image style={styles.pokemonImage} source={{uri: pokemon.pictureURLs?.back}} />
          <Text style={styles.pokemonName}>{pokemon.name}</Text>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 75,
    width: '45%',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    gap: 5
  },
  pokemonImage: {
    width: '40%',
    height: '100%'
  },
  pokemonName: {
    textTransform: 'capitalize',
    color: 'white',
    fontWeight: 'bold',
    maxWidth: '50%',
    flexWrap: 'nowrap'
  }
});