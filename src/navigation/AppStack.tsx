import React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {PokemonsScreen} from '@screens/pokemons';

const RootStack = createStackNavigator({
  initialRouteName: 'Pokedex',
  screens: {
    Pokedex: PokemonsScreen,
  },
});

const Navigation = createStaticNavigation(RootStack);

const AppStack = () => {
  return <Navigation />;
};

export {AppStack};
