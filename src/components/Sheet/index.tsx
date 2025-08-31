import React from "react";
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
    onClose?: () => void;
    Close?: boolean;
    description: string;
    SetPosY?: number;
    Expand?: boolean
}

export function SheetDown(
    {
        SheetHeight = 100,
        Percentage = false,
        SheetOverDrag = 30,
        onClose = () => { },
        Close = true,
        description

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
            if (Close) {
                if (offset.value < SheetHeight / 3) {
                    offset.value = withSpring(0);
                } else {
                    offset.value = withTiming(SheetHeight, {}, function () {
                        runOnJS(close)();
                    });
                }
            } else {
                offset.value = withSpring(0);
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

                <MaterialCommunityIcons name="minus"
                    size={24}
                    color="#000"
                    style={styles.dragIcon} />

                <Text style={styles.textDescription}>{description}</Text>
            </Animated.View>
        </GestureDetector>
    );
}

export function SheetUp(
    {
        SetPosY = 300,
        SheetHeight = 100,
        Percentage = false,
        SheetOverDrag = 10,
        onClose = () => { },
        Expand = true,
        description

    }: SheetProps
) {
    if (Percentage === true) {
        SetPosY = DIMENSIONS.height * (SetPosY / 100);
    }

    const offset = useSharedValue(0);

    function close() {
        onClose()
    }

    const pan = Gesture.Pan().onChange(function (event) {
        const offsetDelta = event.changeY + offset.value;
        const clamp = Math.max(-SheetOverDrag, offsetDelta)

        offset.value = offsetDelta < 0 ? offsetDelta : withSpring(clamp)

        // console.log(offsetDelta);
    })
        .onFinalize(function (event) {

            console.log(event.velocityY > 2000);

            if (event.velocityY > 2000) {
                console.log('fechou');
                offset.value = withSpring(0);
            } else if ((-offset.value > DIMENSIONS.height / 3 || event.velocityY < -2000) && Expand) {
                console.log('expandiu');
                offset.value = withSpring(-SetPosY);
            } else {
                offset.value = withSpring(0);
            }
        })

    const translateY = useAnimatedStyle(() => ({
        transform: [{ translateY: SetPosY + offset.value }],
    }))

    return (
        <GestureDetector gesture={pan}>
            <Animated.View
                style={[styles.container, { height: SheetHeight }, translateY]}
                entering={SlideInDown.springify().damping(15)}
                exiting={SlideOutDown}>

                <MaterialCommunityIcons name="minus"
                    size={24}
                    color="#000"
                    style={styles.dragIcon} />

                <Text style={styles.textDescription}>{description}</Text>
            </Animated.View>
        </GestureDetector>
    );
}