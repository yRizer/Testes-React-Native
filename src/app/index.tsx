import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { rootStyles } from './styles/styles'
import { router } from 'expo-router'

import { Button } from '@/components/button'
import { Input } from '@/components/input'

export default function Index() {

    const [nome, setNome] = useState('')

    function handleNext() {
        router.navigate('/dashboard')
    }

    return (
        <View style={rootStyles.container}>
            <Text style={rootStyles.title}>Olá {nome}</Text>

            <Input placeholder='Seu Nome: ' onChangeText={setNome} />

            <Button title='Enviar' onPress={handleNext} activeOpacity={0.1} />
            <Button title='Cancelar' />
        </View>
    )
}
