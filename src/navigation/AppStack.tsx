import React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {PokemonsScreen, PokemonDetailsScreen} from '@screens/index';
import { PokemonContextProvider } from 'contexts/pokemonContext';

const RootStack = createStackNavigator({
  initialRouteName: 'Pokedex',
  screenOptions: {
    headerTransparent: true,
    headerTitleStyle: {
      textTransform: 'capitalize',
      width: '100%'
    },
  },
  screens: {
    Pokedex: PokemonsScreen,
    Pokemon: {
      screen: PokemonDetailsScreen,
      options: {
        headerTintColor: 'white',
        headerTitle: undefined
      },
    },
  },
});

const Navigation = createStaticNavigation(RootStack);

const AppStack = () => {
  return <PokemonContextProvider><Navigation /></PokemonContextProvider>;
};

export {AppStack};
