import React, { useState } from "react"
import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from "react-native"


import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import { rootStyles } from "@/app/styles/styles"
import { CarrosselImages } from "@/components/carrossel"
import { useEffect } from "react"
import { Sheet } from "@/components/Sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"



function useDescription(QRCode: string) {
    const URL = `http://10.0.14.192:3333/qr-info/${QRCode}`;
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(URL, {
                    method: 'GET',
                });
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [QRCode]);

    return data;
}
export default function Demonstration() {

    const { width: windowWidth } = useWindowDimensions();

    var response = useDescription('QR002');
    var colection: any = null;

    console.log(response);
    

    if (response) {
        [colection] = response.data;
        console.log(colection.descricao);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[rootStyles.container, styles.container]}>
                <GestureHandlerRootView>
                    {response ? <CarrosselImages images={colection.images} width={windowWidth} height={400} /> : null}
                    <Sheet SheetHeight={65} Percentage={true} Close={false} description={colection.descricao}></Sheet>
                </GestureHandlerRootView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
    }
})