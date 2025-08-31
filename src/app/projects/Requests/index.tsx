import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { rootStyles } from "@/app/styles/styles";

import { Button } from "@/components/button";
import { useState } from "react";

export default function Requests() {

    const URL = 'http://192.168.1.9:3333/qr-info/QR001';

    const [data, setData] = useState<any[]>([])

    async function handleGet() {
        try {
            const response = await fetch(URL, {
                method: 'GET',
            });
            const data = await response.json();

            setData(data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handlePost() {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Video 001",
                    description: "Este é o primeiro video",
                    duration: 180
                }),
            });

            const data = await response.json();

            setData(data);
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }

    return (

        <View style={rootStyles.container}>
            <Text style={rootStyles.title}>Teste de requests</Text>

            <Button style={styles.funcButton} title="GET" onPress={handleGet}></Button>
            <Button style={styles.funcButton} title="POST" onPress={handlePost}></Button>

            <Button title="Voltar" onPress={function () { router.back() }} />

            {/**
             * Data example:
             * {"data": [
             * {"descricao": "Essas parreiras foram plantadas em 2005 e produzem uvas Cabernet Sauvignon, conhecidas por seu sabor encorpado e aroma de frutas escuras.",
             *  "id": 1,
             *  "images": [Array],
             *  "localizacao": "Vinhedo Setor A",
             *  "nome_item": "Parreira Cabernet Sauvignon",
             *  "qr_code": "QR001"}],
             *  "status": "success"}
             */}

            <Text style={{ marginTop: 20, color: '#fff' }}>{JSON.stringify(data)}</Text>

        </View>

    )
}

export const styles = StyleSheet.create({
    funcButton: {
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#2c2c2c',
        marginVertical: 8,
    }
})