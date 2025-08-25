import { Text, StyleSheet, Dimensions } from "react-native";
import { styles } from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, { clamp, useSharedValue, withSpring, withTiming, runOnJS, useAnimatedStyle, SlideInDown, SlideOutDown } from "react-native-reanimated";

const DIMENSIONS = Dimensions.get('window');

type SheetProps = {
    SheetHeight?: number;
    Percentage?: boolean;
    SheetOverDrag?: number;
    onClose: () => void;
}

export function Sheet(
    { 
        SheetHeight = 100,
        Percentage = false,
        SheetOverDrag = 30,
        onClose 
        
    }: SheetProps) {

    if (Percentage === true) {
        SheetHeight = DIMENSIONS.height * (SheetHeight / 100);
    }

    const offset = useSharedValue(0);

    function close() {
        onClose()
    }

    const pan = Gesture.Pan().onChange(function (event) {
        const offsetDelta = event.changeY + offset.value;
        const clamp = Math.max(-SheetOverDrag, offsetDelta)

        offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp)
    })
        .onFinalize(function () {
            if (offset.value < SheetHeight / 3) {
                offset.value = withSpring(0);
            } else {
                offset.value = withTiming(SheetHeight, {}, function () {
                    runOnJS(close)();
                });
            }
        })

    const translateY = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }))

    return (
        <GestureDetector gesture={pan}>
            <Animated.View
                style={[styles.container, { height: SheetHeight }, translateY]}
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}>

                <MaterialCommunityIcons name="drag-horizontal"
                    size={24}
                    color="#000"
                    style={styles.dragIcon} />

                <Text>Sheet Component</Text>
            </Animated.View>
        </GestureDetector>
    );
}