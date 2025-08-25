import { StyleSheet, Dimensions } from "react-native";

const DIMENSIONS = Dimensions.get('window');

export const rootStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        justifyContent: 'center',
        gap: 16,
        backgroundColor: '#1f1f1f',
    },
    title: {
        color: '#fff',
        fontSize: 24,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 32,
    },
    textWarning: {
        fontSize: 18,
        color: '#ff9800',
    }
});