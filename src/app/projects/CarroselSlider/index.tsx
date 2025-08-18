import React from 'react';

import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    ImageBackground,
    Animated,
    useWindowDimensions,
    useAnimatedValue,
} from 'react-native';

import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { rootStyles } from '@/app/styles/styles';
import { Button } from '@/components/button';
import { router } from 'expo-router';


const images = [
    {
        title: "Image 1",
        color: "#FF5733",
    },
    {
        title: "Image 2",
        color: "#33FF57",
    },
    {
        title: "Image 3",
        color: "#3357FF",
    },
    {
        title: "Image 4",
        color: "#F1C40F",
    },
    {
        title: "Image 5",
        color: "#8E44AD",
    }
]

const App = () => {
    const scrollX = useAnimatedValue(0);

    const { width: windowWidth } = useWindowDimensions();

    return (
        <SafeAreaProvider>
            <SafeAreaView style={rootStyles.container}>
                <Text style={rootStyles.title}>Carrosel Slider</Text>
                <Text style={rootStyles.text}>Scroll horizontal com animação</Text>
                <View style={styles.scrollContainer}>
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
                                    style={{ width: 400, height: 250, backgroundColor: image.color }}
                                    key={imageIndex}>
                                    <Text style={rootStyles.title}>{image.title}</Text>
                                </View>
                            );
                        })}
                    </ScrollView>


                </View>
                <View style={styles.indicatorContainer}>
                    {images.map((image, imageIndex) => {
                        const width = scrollX.interpolate({
                            inputRange: [
                                windowWidth * (imageIndex - 1),
                                windowWidth * imageIndex,
                                windowWidth * (imageIndex + 1),
                            ],
                            outputRange: [8, 16, 8],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={imageIndex}
                                style={[styles.normalDot, { width }]}
                            />
                        );
                    })}
                </View>

                <Text style={rootStyles.text}> O atributo <Text style={{color: '#FF5733'}}>pagingEnabled</Text> funciona como o esperado apenas se o <Text style={{color: '#3658d4ff'}}>ScrollView</Text> possuir o mesmo tamanho que os objetos de dentro</Text>
                <Text style={rootStyles.text}>Neste caso, tanto o <Text style={{color: '#3658d4'}}>ScrollView</Text> quanto as <Text style={{color: '#3658d4ff'}}>Views</Text> possuem <Text style={{color: '#36d448ff'}}>widths</Text> iguais.</Text>

                <Button title="Voltar" onPress={() => router.back()} />
                
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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

export default App;