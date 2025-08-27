import React from "react"

import {
    ScrollView,
    Animated,
    useAnimatedValue,
    View,
    Text,
    useWindowDimensions
} from "react-native"

import { rootStyles } from "@/app/styles/styles"
import { styles } from "./styles"

type CarrosselProps = {
    images: Array<{
        title: string,
        color: string,
    }>;
    width: number;
    height: number;
};

type DotsProps = {
    images: Array<{
        title: string,
        color: string,
    }>;
}


var scrollX = useAnimatedValue(0)
const { width: windowWidth } = useWindowDimensions();


// const windowWidth = window

export function Carrossel({ images, width, height }: CarrosselProps) {

    return (
        <ScrollView

            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event([
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ])}
            scrollEventThrottle={1}>
            {images.map((image, imageIndex) => {
                return (
                    <View
                        style={{ width: width, height: height, backgroundColor: image.color }}
                        key={imageIndex}>
                        <Text style={rootStyles.title}>{image.title}</Text>
                    </View>
                );
            })}
        </ScrollView>
    )
}

export function NavigationDots({ images }: DotsProps) {

    const dots = images.map((image, imageIndex) => {
        const width = scrollX.interpolate({
            inputRange: [
                windowWidth * (imageIndex - 1),
                windowWidth * imageIndex,
                windowWidth * (imageIndex + 1),
            ],
            outputRange: [6, 16, 6],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View
                key={imageIndex}
                style={[styles.normalDot, { width }]}
            />
        );
    })

    return (dots)
}