import React from "react";
import { rootStyles } from "@/app/styles/styles";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import Map, { Marker, Callout } from "react-native-maps"

export default function Maps() {

    const coordinate = {
        latitude: -22.19598567226046,
        longitude: -46.75627075842103
    }

    const pontosTuristicos = [
        {
            id: 1,
            name: 'Praça da Matriz',
            coordinate: {
                latitude: -22.19356811352078,
                longitude: -46.74692697185371
            }
        },
        {
            id: 2,
            name: 'Parque Municipal',
            coordinate: {
                latitude: -22.20000000000000,
                longitude: -46.76000000000000
            }
        }
    ]

    return (
        <View style={rootStyles.container}>
            <Map style={StyleSheet.absoluteFill}
                initialRegion={{
                    ...coordinate,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
            >

                {pontosTuristicos.map(ponto => (
                    <Marker key={ponto.id} coordinate={ponto.coordinate}>
                        <Callout style={styles.callout}>
                            <View>
                                <Text style={styles.title}>{ponto.name}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </Map>
            <Button title="Voltar" onPress={function () { router.back() }} />
        </View>
    )
}

export const styles = StyleSheet.create({
    callout: {
        padding: 12
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16
    }
})