import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "@/components/button";
import { router } from "expo-router";
import { rootStyles } from "./styles/styles";

export default function Dashboard() {

    const Projetos = [
        {
            id: 1,
            name: 'Scrows',
            directory: 'projects/Scrows',
        },
        {
            id: 2,
            name: 'Cards Description',
            directory: 'projects/CardsDescription',
        },
        {
            id: 3,
            name: 'Maps | Mapa Google',
            directory: 'projects/Maps',
        },
        {
            id: 4,
            name: 'Maps | Mapa Mapbox',
            directory: 'projects/Mapbox',
        },
        {
            id: 5,
            name: 'Requests | NodeJS',
            directory: 'projects/Requests',
        },
        {
            id: 6,
            name: 'QR Code Scanner',
            directory: 'projects/QRCode',
        },
        {
            id: 7,
            name: 'Carrosel Slider',
            directory: 'projects/CarroselSlider',
        },
        {
            id: 8,
            name: 'Demonstration',
            directory: 'projects/Demostration',
        },
    ]

    return (
        <View style={rootStyles.container}>

            <Text style={rootStyles.title}>Dashboard</Text>
            <View style={styles.subtitleContainer}>
                <Text style={styles.subTitle}>Projetos Teste</Text>
            </View>

            <View style={styles.projectsContainer}>
                {Projetos.map((projeto) => (
                    <Button
                        key={projeto.id}
                        title={projeto.name}
                        style={styles.project}
                        onPress={() => router.push(`./${projeto.directory}`)}
                        activeOpacity={0.1}
                    />
                ))}
            </View>

            <Button title="Voltar" onPress={function () { router.back() }} />
        </View>
    )
}

export const styles = StyleSheet.create({
    subtitleContainer: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    subTitle: {
        fontSize: 18,
        color: '#fff',
    },
    projectsContainer: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    projectsScrollView: {
        gap: 16
    },
    project: {
        padding: 16,
        marginInline: 8,
        borderRadius: 8,
        backgroundColor: '#2c2c2c',
        marginVertical: 8,
    }
})