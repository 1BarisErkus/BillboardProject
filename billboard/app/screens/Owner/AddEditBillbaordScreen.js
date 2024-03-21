import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions,
    Pressable,
    Text,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as yup from 'yup';

import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { BillboardContext } from '../../context/BillboardContext';

const { width, height } = Dimensions.get('window');

const validationSchema = yup.object().shape({
    code: yup.string().required('Billboard Kodu boş olamaz'),
    locationTitle: yup.string().required('Konum Başlığı boş olamaz'),
    locationCoordinate: yup.string().required('Konum İşaretle boş olamaz'),
});

export default function AddEditBillbaordScreen() {
    const { markerCoordinate } = useRoute().params || {};
    const navigation = useNavigation();
    const { addBillboard } = useContext(BillboardContext);

    const [billboardPic, setBillboardPic] = useState(null);
    const [code, setCode] = useState('');
    const [locationTitle, setLocationTitle] = useState('');
    const [locationCoordinate, setLocationCoordinate] = useState('');

    const takePicInLocalStorage = async () => {
        try {
            let picString = await AsyncStorage.getItem('billboardPhoto');
            let picJson = JSON.parse(picString);
            setBillboardPic(picJson);
        } catch (error) {
            console.error('Hata oluştu:', error);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            takePicInLocalStorage();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        let coordinates = markerCoordinate && `${markerCoordinate.latitude},${markerCoordinate.longitude}`;
        setLocationCoordinate(coordinates);
    }, [markerCoordinate]);

    const validateForm = async () => {
        try {
            await validationSchema.validate({
                code,
                locationTitle,
                locationCoordinate,
            }, { abortEarly: false });
            return true;
        } catch (error) {
            alert('Lütfen tüm alanları doldurun ve doğru formatta bilgi girişi yapın.');
            return false;
        }
    };

    const showMap = () => {
        navigation.navigate('MapView', { locationTitle: 'Yeni Konum', locationCoordinate: '' });
    };

    return (
        <LinearGradient
            colors={['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity style={styles.cameraIcon} onPress={() => { navigation.navigate('Camera') }}>
                    <Ionicons name='camera-outline' color='#fff' size={width * 0.1} />
                </TouchableOpacity>

                <Image style={styles.image} source={billboardPic ? { uri: billboardPic.uri } : require('../../assets/default-billboard.png')} />

                <View style={styles.inputContainer}>
                    <CustomTextInput
                        value={code}
                        onChangeText={(e) => setCode(e)}
                        placeholder='Billboard Kodu*'
                        keyboardType='number-pad'
                    />
                    {validationSchema?.fields?.code && validationSchema?.fields?.code.errors &&
                        <Text style={styles.errorText}>{validationSchema.fields.code.errors[0]}</Text>
                    }

                    <CustomTextInput
                        value={locationTitle}
                        onChangeText={(e) => setLocationTitle(e)}
                        placeholder='Konum Başlığı*'
                    />
                    {validationSchema?.fields?.locationTitle && validationSchema?.fields?.locationTitle.errors &&
                        <Text style={styles.errorText}>{validationSchema.fields.locationTitle.errors[0]}</Text>
                    }

                    <Pressable onPress={showMap}>
                        <CustomTextInput
                            value={locationCoordinate && 'Tekrar seçmek için tıkla.'}
                            onChangeText={(e) => setLocationCoordinate(e)}
                            placeholder='Konum İşaretle*'
                            editable={false}
                        />
                    </Pressable>
                    {validationSchema?.fields?.locationCoordinate && validationSchema?.fields?.locationCoordinate.errors &&
                        <Text style={styles.errorText}>{validationSchema.fields.locationCoordinate.errors[0]}</Text>
                    }
                </View>

                <View style={styles.buttonContainer}>
                    <CustomButton
                        text='Ekle'
                        onPress={async () => {
                            if (await validateForm()) {
                                await addBillboard(code, locationTitle, locationCoordinate, billboardPic.base64)
                                navigation.navigate('Home')
                                setCode('')
                                setLocationCoordinate('')
                                setLocationTitle('')
                                setBillboardPic(null)
                            }
                        }}
                    />
                </View>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: height * 0.1,
        paddingBottom: height * 0.05,
        alignItems: 'center',
    },
    cameraIcon: {
        backgroundColor: '#333333',
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    image: {
        width: width * 0.7,
        height: height * 0.2,
        marginVertical: height * 0.03,
        alignSelf: 'center',
    },
    inputContainer: {
        marginTop: height * 0.02,
        marginBottom: height * 0.04,
        gap: height * 0.02,
        alignSelf: 'center',
    },
    buttonContainer: {
        alignSelf: 'center',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
});
