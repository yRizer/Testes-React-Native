import React, { useState } from "react"
import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from "react-native"


import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"

import { rootStyles } from "@/app/styles/styles"
import { CarrosselImages } from "@/components/carrossel"
import { useEffect } from "react"
import { SheetDown, SheetUp } from "@/components/Sheet"
import { GestureHandlerRootView } from "react-native-gesture-handler"



async function useDescription(QRCode: string) {
    const URL = `http://192.168.1.9:3333/qr-info/${QRCode}`;
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
    var [response, setResponse] = useState<any>(null);

    useDescription('QR002').then(data => {
        setResponse(data);
    })

    var colection: any = null; 
    
    if (response) {
        [colection] = response.data;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={[rootStyles.container, styles.container]}>
                <GestureHandlerRootView>
                    {response ? <CarrosselImages images={colection.images} width={windowWidth} height={700} /> : null}
                    {response ? <SheetUp SetPosY={60} SheetHeight={2000} Percentage={true} Expand={true} description={colection.descricao}/>: null}
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