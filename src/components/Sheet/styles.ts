import { StyleSheet, Dimensions } from "react-native";

const DIMENSIONS = Dimensions.get('window');

export const styles = StyleSheet.create({
    container:{
        width: DIMENSIONS.width,
        backgroundColor: '#f8f8f8ff',
        position: 'absolute',
        bottom: -50,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    dragIcon: {
        alignSelf: 'center',
        marginTop: 8,
    }
});