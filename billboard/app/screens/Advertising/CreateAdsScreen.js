import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Image } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import { ScrollView } from 'react-native-gesture-handler'
import { AdvertisingRequestContext } from '../../context/AdvertisingRequestContext'
import Toast from 'react-native-toast-message'

export default function ShowOneBillboardScreen() {
    const navigation = useNavigation()

    const { createAds } = useContext(AdvertisingRequestContext)

    const route = useRoute()
    const { id, code, locationTitle, locationCoordinate, advertisingUser, photoUrl, expireDateTime, createdUserId, updatedUserId, createdDateTime, updatedDateTime, owner } = route.params

    const [day, setDay] = useState()

    const [base64Img, setBase64Img] = useState()
    useEffect(() => {
        setBase64Img(`data:image/png;base64,${photoUrl}`)
    }, [])

    const handleSubmit = () => {
        if (!day) {
            alert('Lütfen talep edilen gün sayısını giriniz.')
            return
        }

        createAds(id, day)

        navigation.navigate('CreateAdsList')
    }

    return (
        <LinearGradient
            colors={['#FF5C00', '#09F', '#09F']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.headerButtons}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name='arrow-back-outline' color='#fff' size={36} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.titleContainer}>
                            {photoUrl ? <Image style={styles.titleImage} source={{ uri: base64Img }} /> : <Image style={styles.titleImage} source={require('../../assets/default-billboard.png')} />}
                            <Text style={styles.titleText}>{code}</Text>
                        </View>
                        <View style={styles.content}>
                            <View style={styles.location}>
                                <Text style={styles.contentText}>Konum:  {locationTitle}</Text>
                                <TouchableOpacity onPress={() => { navigation.navigate('MapView', { locationTitle, locationCoordinate, advertisingUser, owner: owner.fullName }) }}>
                                    <Ionicons name='map-outline' color={'#333'} size={36} />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.contentText}>Billboard Sahibi:</Text>
                                <Text style={styles.contentSubText}>{owner ? owner.fullName : '-'}</Text>
                            </View>
                            <View style={styles.form}>
                                <CustomTextInput placeholder='Talep Edilen Gün' value={day} onChangeText={e => setDay(e)} />
                                <CustomButton text='Reklam Ver' onPress={handleSubmit} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
    subContainer: {
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
    },
    form: {
        alignSelf: 'center',
        marginTop: height * 0.03,
        gap: 50
    }
});