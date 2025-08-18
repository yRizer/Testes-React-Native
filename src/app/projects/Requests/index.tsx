import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import { rootStyles } from "@/app/styles/styles";

import { Button } from "@/components/button";
import { useState } from "react";

export default function Requests() {

    const URL = 'http://10.0.3.152:3333/videos';

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

            {data && data.map((item, index) => {
                return (
                    <View key={index} style={{ marginVertical: 8 }}>
                        <Text style={{ color: '#fff' }}>ID: {item.id}</Text>
                        <Text style={{ color: '#fff' }}>Título: {item.title}</Text>
                        <Text style={{ color: '#fff' }}>Descrição: {item.description}</Text>
                        <Text style={{ color: '#fff' }}>Duração: {item.duration} segundos</Text>
                    </View>
                )
            })}

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