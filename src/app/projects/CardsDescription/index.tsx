import React, { Image } from "react-native";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { rootStyles } from "@/app/styles/styles";

import { Text, StyleSheet } from "react-native";

import { Button } from "@/components/button";
import { SheetDown } from "@/components/Sheet";

import { router } from "expo-router";

export default function CardsDescription() {

    const [isOpen, setIsOpen] = useState(false);

    function toggleSheet() {
        setIsOpen((prevState) => !prevState);

        console.log('toggleSheet called', !isOpen);
    }

    return (
        <GestureHandlerRootView style={[rootStyles.container]}>

            <Text style={rootStyles.title}>Teste Bottom Sheet</Text>
            <Button title="Abrir Bottom Sheet" onPress={toggleSheet} />
            <Button title="Voltar" onPress={() => router.back()} />
            {
                isOpen &&
                <SheetDown onClose={toggleSheet} SheetHeight={60} Percentage={true} description='testado'> </SheetDown>
            }

        </GestureHandlerRootView>
    )
}
