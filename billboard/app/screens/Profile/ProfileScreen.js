import { ActivityIndicator, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { ScrollView } from 'react-native-gesture-handler'
import CustomButton2 from '../../components/CustomButton2';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext'
import { BillboardContext } from '../../context/BillboardContext'
import { useActionSheet } from '@expo/react-native-action-sheet';
import { UserContext } from '../../context/UserContext';
import * as ImagePicker from 'expo-image-picker'

export default function ProfileScreen() {
    const navigation = useNavigation()

    const { showActionSheetWithOptions } = useActionSheet();

    const { userInfo, logout } = useContext(AuthContext)

    const {
        isloading,
        data,
        getAllBillboardsForOwner,
        getAllBillboardsForAdvertising
    } = useContext(BillboardContext)

    const { updatePhoto } = useContext(UserContext)

    const [billboards, setBillboards] = useState([])
    const [availableBillboards, setAvailableBillboards] = useState([])
    const [unavailableBillboards, setUnavailableBillboards] = useState([])

    const [userPhoto, setUserPhoto] = useState(null)

    useFocusEffect(
        useCallback(() => {
            if (userInfo.userShowDto.accountType === 0) {
                getAllBillboardsForOwner()
                setBillboards(data)

                const abillboards = data.filter(item => {
                    return item.advertisingUser === null;
                })
                setAvailableBillboards(abillboards)

                const ubillboards = data.filter(item => {
                    return item.advertisingUser !== null;
                })
                setUnavailableBillboards(ubillboards)
            } else {
                getAllBillboardsForAdvertising()
                setBillboards(data)
            }
        }, [])
    )

    useEffect(() => {
        if (userInfo.userShowDto.photoUrl) {
            setUserPhoto(`data:image/png;base64,${userInfo.userShowDto.photoUrl}`)
        }
    }, [userInfo])

    const memberDate = new Date(userInfo.userShowDto.createdDateTime).toLocaleDateString('tr-TR')

    const userStats = userInfo.userShowDto.accountType === 0 ?
        [
            `${memberDate}’den beri üyesiniz.`,
            `${availableBillboards.length} tane erişilebilir billboard’a sahipsiniz.`,
            `Aktif ${unavailableBillboards.length} tane reklam aldınız.`,
            `Toplam ${billboards.length} tane billboard'a sahipsiniz`
        ]
        :
        [
            `${memberDate}’den beri üyesiniz.`,
            `${data.length} aktif reklama sahipsiniz.`,
        ]

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.3,
            base64: true,
            exif: false
        });

        if (!result.canceled) {
            await updatePhoto(result.assets[0].base64)
            setUserPhoto(`data:image/png;base64,${result.assets[0].base64}`)
        }
    };

    const onPress = () => {
        const options = ['Yeni Resim Ekle', 'Resmi Sil', 'Cancel'];
        const destructiveButtonIndex = 1;
        const cancelButtonIndex = 3;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            destructiveButtonIndex
        }, (selectedIndex) => {
            switch (selectedIndex) {
                case destructiveButtonIndex:
                    updatePhoto(null)
                    setUserPhoto(null)
                    break;
                case 0:
                    // Yeni Resim Ekle
                    pickImage()
                    break;
                case cancelButtonIndex:
                // Vazgeç
            }
        });
    }

    if (isloading) {
        return (
            <LinearGradient
                colors={userInfo.userShowDto.accountType === 0 ? ['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C'] : ['#FF5C00', '#09F', '#09F']}
                start={{ x: 0, y: 0.55 }}
                end={{ x: 0, y: 0.02 }}
                style={{ flex: 1 }}
            >
                <ActivityIndicator size='large' />
            </LinearGradient>
        )
    }

    return (
        <LinearGradient
            colors={userInfo.userShowDto.accountType === 0 ? ['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C'] : ['#FF5C00', '#09F', '#09F']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <View style={styles.infoContainer}>
                        <TouchableOpacity onPress={onPress}>
                            <Image style={styles.infoPicture} source={userPhoto ? {
                                uri: userPhoto
                            } : require('../../assets/default-user.jpg')} />
                        </TouchableOpacity>
                        <View style={styles.infoContent}>
                            <Text style={styles.name}>{userInfo.userShowDto.fullName}</Text>
                            <View style={styles.infoSubContent}>
                                <Text style={styles.infoText}>{userInfo.userShowDto.email}</Text>
                                <Text style={styles.infoText}>+90 {userInfo.userShowDto.phoneNumber}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.statisticsContainer}>
                        <Text style={styles.statisticsText}>İstatistikler</Text>
                        <View style={styles.statisticsContentContainer}>
                            {userStats.map((stat, index) => (
                                <Text key={index} style={styles.statisticsContentText}>{`\u2022 ${stat}`}</Text>
                            ))}
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <CustomButton2 text='Reklam İstekleri' icon='pricetags-outline' onPress={() => {
                            userInfo.userShowDto.accountType === 0 ?
                                navigation.navigate('AdsRequests', {
                                    type: 'owner'
                                })
                                :
                                navigation.navigate('AdsRequests', {
                                    type: 'ads'
                                })
                        }} />
                        <CustomButton2 text='Şifre Değiştir' icon='lock-closed-outline' onPress={() => navigation.navigate('ChangePassword')} />
                        <CustomButton2 text='Yardım' icon='help-circle-outline' onPress={() => navigation.navigate('Help')} />
                        <CustomButton2 text='Çıkış' icon='exit-outline' onPress={() => {
                            logout()
                        }} />
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
        padding: width * 0.08,
        marginTop: height * 0.05
    },
    infoContainer: {
        flexDirection: 'row',
        gap: width * 0.06,
        alignItems: 'center'
    },
    infoPicture: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    infoContent: {

    },
    name: {
        color: '#fff',
        fontSize: width * 0.07,
        fontWeight: 'bold'
    },
    infoSubContent: {

    },
    infoText: {
        color: '#fff',
        fontSize: width * 0.04
    },
    statisticsContainer: {
        marginTop: height * 0.05
    },
    statisticsText: {
        color: '#000',
        fontSize: width * 0.06,
        fontWeight: 'bold'
    },
    statisticsContentContainer: {
        borderWidth: 1,
        borderColor: '#000',
        height: height * 0.2,
        padding: width * 0.03
    },
    statisticsContentText: {
        color: '#000',
        fontSize: width * 0.045,
        fontWeight: '500'
    },
    buttonsContainer: {
        alignItems: 'center',
        marginTop: height * 0.06,
        gap: 25
    }
})