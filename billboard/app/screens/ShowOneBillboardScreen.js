import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Alert } from 'react-native'
import { Image } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { BillboardContext } from '../context/BillboardContext'

export default function ShowOneBillboardScreen() {
    const navigation = useNavigation()

    const route = useRoute()
    const { id, code, locationTitle, locationCoordinate, advertisingUser, photoUrl, expireDateTime, createdUserId, updatedUserId, createdDateTime, updatedDateTime, owner } = route.params

    const { deleteBillboard } = useContext(BillboardContext)

    const [base64Img, setBase64Img] = useState()
    useEffect(() => {
        setBase64Img(`data:image/png;base64,${photoUrl}`)
    }, [])

    const showAlert = () =>
        Alert.alert(
            'Emin misin?',
            `${code} kodlu Billboard silinecek!`,
            [
                {
                    text: 'Onayla',
                    onPress: () => {
                        deleteBillboard(id)
                        navigation.goBack()
                    },
                    style: 'default',
                },
            ],
            {
                cancelable: true,
            },
        );

    const deleteButton = () => {
        showAlert()
    }

    return (
        <LinearGradient
            colors={owner ? ['#FF5C00', '#09F', '#09F'] : ['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back-outline' color='#fff' size={36} />
                    </TouchableOpacity>
                    <View style={styles.rightButtons}>
                        {!owner &&
                            <>
                                <TouchableOpacity onPress={() => navigation.navigate('AddEdits')}>
                                    <Ionicons name='create-outline' color='#fff' size={36} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={deleteButton}>
                                    <Ionicons name='trash-outline' color='#fff' size={36} />
                                </TouchableOpacity>
                            </>
                        }


                    </View>
                </View>
                <View style={styles.subContainer}>
                    <View style={styles.titleContainer}>
                        {photoUrl ? <Image style={styles.titleImage} source={{ uri: base64Img }} /> : <Image style={styles.titleImage} source={require('../assets/default-billboard.png')} />}
                        <Text style={styles.titleText}>{code}</Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.location}>
                            <Text style={styles.contentText}>Konum:  {locationTitle}</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate('MapView', { locationTitle, locationCoordinate, advertisingUser, owner }) }}>
                                <Ionicons name='map-outline' color={owner ? '#333' : '#FF8D4D'} size={36} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            {
                                owner ?
                                    <Text style={styles.contentText}>Billboard Sahibi:</Text>
                                    :
                                    <Text style={styles.contentText}>Reklam Veren:</Text>
                            }
                            <Text style={styles.contentSubText}>{advertisingUser ? advertisingUser.fullName : owner ? owner.fullName : '-'}</Text>
                        </View>
                        <View>
                            <Text style={styles.contentText}>Sona Erma Tarihi:</Text>
                            <Text style={styles.contentSubText}>{expireDateTime ? new Date(expireDateTime).toLocaleDateString() : '-'}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
    },
    headerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rightButtons: {
        flexDirection: 'row',
        gap: width * 0.02
    },
    subContainer: {
        justifyContent: 'space-evenly',
        flex: 1
    },
    titleContainer: {
        marginTop: height * 0.05,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleImage: {
        width: width * 0.8,
        height: height * 0.2
    },
    titleText: {
        color: '#fff',
        fontSize: width * 0.08,
        fontWeight: 'bold',
        marginTop: height * 0.02
    },
    content: {
        marginTop: height * 0.05,
        paddingHorizontal: width * 0.02,
        gap: height * 0.02
    },
    location: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentText: {
        fontSize: width * 0.05,
        color: '#fff',
        fontWeight: 'bold'
    },
    contentSubText: {
        fontSize: width * 0.05,
        color: '#fff',
        paddingLeft: width * 0.01
    }
});