import React from "react";

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { rootStyles } from "@/app/styles/styles";



export default function Scrows() {

    const Quadrados = Array.from({ length: 10 }, (_, index) => (
        <View key={index} style={styles.square}></View>
    ));

    return (
        <View style={rootStyles.container}>
            <Text style={rootStyles.title}>Scrows Project</Text>
            <Text style={rootStyles.text}>Teste de funcionalidades scroll</Text>

            <Text style={styles.scrollTitle}>Scroll Horizontal</Text>

            <View style={styles.scrollViewContainer}>
                <ScrollView contentContainerStyle={styles.scrollView} horizontal showsHorizontalScrollIndicator={false}>
                    {Quadrados}
                </ScrollView>
                <Text style={rootStyles.text}>Os atributos <Text style={rootStyles.textWarning}>Flex</Text> bloqueiam o funcionamento do scroll.</Text>
            </View>

            <Text style={styles.scrollTitle}>Scroll Vertical</Text>
            <View style={[styles.scrollViewContainer, styles.scrollViewContainerVertical]}>
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    showsVerticalScrollIndicator={false}>
                    {Quadrados}
                </ScrollView>
                <Text style={rootStyles.text}>Os atributos <Text style={rootStyles.textWarning}>Flex</Text> bloqueiam o funcionamento do scroll.</Text>
            </View>


            <Button title="Voltar" onPress={function () { router.back() }} />
        </View >
    );
}


const styles = StyleSheet.create({
    scrollTitle: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 6,
    },
    scrollViewContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    scrollViewContainerVertical: {
        width: '100%',
        height: 400,
        justifyContent: 'flex-start',
    },
    scrollView: {
        gap: 16,
        paddingVertical: 16,
    },
    square: {
        width: 100,
        height: 100,
        backgroundColor: '#4a90e2',
        borderRadius: 16,
    }
})