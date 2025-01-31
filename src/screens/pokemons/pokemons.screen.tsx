import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const PokemonsScreen = () => {
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
