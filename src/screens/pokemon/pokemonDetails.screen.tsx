import { useNavigation } from "@react-navigation/native"
import { getColorByPokemonType } from "@utils"
import { usePokemon } from "contexts/pokemonContext"
import { useEffect } from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export const PokemonDetailsScreen = () => {
    const navigation = useNavigation()
    const { selectedPokemon } = usePokemon()

    const typeColor: string = getColorByPokemonType(selectedPokemon?.types[0] || '')

    useEffect(() => {
        navigation.setOptions({ title: selectedPokemon?.name, headerStyle: { backgroundColor: typeColor } })
    }, [])

    const renderType = (type: string, index: number) => (
        <View key={index} style={{ backgroundColor: getColorByPokemonType(type), ...styles.pokemonType }}>
            <Text style={styles.pokemonTypeText}>{type}</Text>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.pokemonImage} source={{uri: selectedPokemon?.pictureURLs.front}} />
            <Text style={styles.pokemonName}>{selectedPokemon?.name.toUpperCase()}</Text>
            <View style={styles.pokemonTypes}>{selectedPokemon?.types.map(renderType)}</View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        gap: 10,
        marginTop: 50
    },
    pokemonImage: {
        width: '100%',
        height: '50%'
    },
    pokemonName: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    pokemonTypes: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        gap: 10
    },
    pokemonType: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 6
    },
    pokemonTypeText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white'
    }
});