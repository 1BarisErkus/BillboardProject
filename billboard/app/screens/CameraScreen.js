import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { shareAsync } from 'expo-sharing'
import * as MediaLibrary from 'expo-media-library'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

export default function App() {
    const navigation = useNavigation()
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState()
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState()
    const [type, setType] = useState(CameraType.back);
    const [photo, setPhoto] = useState()

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync()
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync()
            setHasCameraPermission(cameraPermission.status === "granted")
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted")
        })()
    }, [])

    if (hasCameraPermission === undefined) {
        return <Text>Requesting permissons...</Text>
    } else if (!hasCameraPermission) {
        return <Text>Permissions for camera not granted. Please change this in settings.</Text>
    }

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    let takePic = async () => {
        let options = {
            quality: 0.3,
            base64: true,
            exif: false,
        }

        let newPhoto = await cameraRef.current.takePictureAsync(options)
        setPhoto(newPhoto)
    }

    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined)
            })
        }

        let savePhoto = async () => {
            await MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined)
            })

            await AsyncStorage.setItem('billboardPhoto', JSON.stringify(photo))
            // console.log(photo)

            navigation.navigate('AddEdit')
        }

        return (
            <SafeAreaView style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <View style={styles.buttonContainer2}>
                    {hasMediaLibraryPermission ?
                        <TouchableOpacity style={styles.buttonBox} onPress={savePhoto}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                        : undefined}
                    {/* <Button title='Share' onPress={sharePic} color={'yellow'} /> */}
                    <TouchableOpacity style={[styles.buttonBox, { backgroundColor: 'red' }]} onPress={() => setPhoto(undefined)}>
                        <Text style={styles.buttonText}>Discard</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <Camera style={styles.container} ref={cameraRef} ratio='4:3' type={type} >
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePic}>
                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
            </View>
        </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        gap: width * 0.15,
        flex: 0.9
    },
    buttonContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBox: {
        backgroundColor: 'green',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.1,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: width * 0.05,
        color: '#fff',
        fontWeight: 'bold'
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
    text: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: 'white',
    },
});
