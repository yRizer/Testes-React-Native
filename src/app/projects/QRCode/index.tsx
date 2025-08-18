import { useState, useRef } from 'react';

import { View, Text, StyleSheet, Modal } from 'react-native';

import { router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { Button } from '@/components/button';
import { rootStyles } from '@/app/styles/styles';

export default function QRCodeScanner() {

    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();

    const qrCodeLock = useRef(false);

    async function handleOpenCamera() {
        try {
            const { granted } = await requestCameraPermission();

            if (!granted) {
                console.error('Camera permission not granted');
                return;
            }

            setModalIsVisible(true);
        } catch (error) {
            console.error('Error opening camera:', error);
        }
    }

    function handleQRCodeScanned(data: string) {
        console.log('QR Code scanned:', data);
    }

    return (
        <View style={rootStyles.container}>
            <Text style={rootStyles.title}>QR Code Scanner</Text>

            <Button title="Câmera" onPress={handleOpenCamera} />

            <Modal visible={modalIsVisible}>
                <View style={rootStyles.container}>
                    <CameraView
                        style={styles.cameraContainer}
                        facing='back'
                        onBarcodeScanned={({ data }) => {
                            if (data && !qrCodeLock.current) {
                                qrCodeLock.current = true
                                setTimeout(() => handleQRCodeScanned(data), 500)
                            }
                        }}
                    />
                    <Button title="Fechar" onPress={() => setModalIsVisible(false)} />
                </View>
            </Modal>

            <Button title="Voltar" onPress={() => router.back()} />
        </View>
    )
}

const styles = StyleSheet.create({
    cameraContainer: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
    }
});

