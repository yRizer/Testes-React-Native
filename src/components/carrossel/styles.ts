import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    scrollContainer: {
        width: 400,
        borderRadius: 16,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    normalDot: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: 'silver',
        marginHorizontal: 4,
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});