import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as Yup from 'yup';

import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Geçersiz email').required('* Zorunlu alan'),
    password: Yup.string().required('* Zorunlu alan')
});

export default function LoginScreenForOwner() {
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);

    return (
        <LinearGradient
            colors={['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.logoContainer}>
                        <Image style={styles.logoImg} source={require('../../assets/login-billboard.png')} />
                        <View style={styles.logoTextContainer}>
                            <Text style={styles.logoText}>Advert Tracker</Text>
                        </View>
                    </View>

                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={async ({ email, password }) => await login(email, password)}
                        validationSchema={loginSchema}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <>
                                <View style={styles.inputContainer}>
                                    <CustomTextInput
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        placeholder='Email'
                                        keyboardType='email-address'
                                    />
                                    {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                                    <CustomTextInput
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        placeholder='Şifre'
                                        secureTextEntry
                                    />
                                    {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                                </View>

                                <View style={styles.buttonContainer}>
                                    <CustomButton text='Giriş Yap' onPress={handleSubmit} />
                                    <CustomButton text='Kayıt Ol' onPress={() => navigation.navigate('Register')} />
                                    <TouchableOpacity onPress={() => navigation.navigate('LoginAds')}>
                                        <Text style={styles.isAdvertisingText}>Reklam Veren misin?</Text>
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>

                    <View style={styles.copyrightContainer}>
                        <Text style={styles.copyrightText}>
                            Bu uygulamanın telif hakları Collaborative A.Ş tarafından korunmaktadır.
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignSelf: 'center'
    },
    logoImg: {
        width: width * 0.8,
        height: width * 0.8,
        alignSelf: 'center'
    },
    logoTextContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    logoText: {
        color: '#C30000',
        fontSize: height * 0.03,
        fontWeight: '900',
        fontStyle: 'italic',
        letterSpacing: 2,
        alignSelf: 'center'
    },
    inputContainer: {
        gap: height * 0.02,
        alignSelf: 'center'
    },
    errorText: {
        color: 'red',
        fontSize: height * 0.015,
        alignSelf: 'flex-end'
    },
    buttonContainer: {
        gap: height * 0.03,
        alignSelf: 'center',
        marginTop: height * 0.05
    },
    isAdvertisingText: {
        color: '#E0A314',
        fontSize: height * 0.02,
        textAlign: 'center',
        marginTop: height * 0.015
    },
    copyrightContainer: {
        padding: height * 0.01,
        marginTop: height * 0.02,
        alignItems: 'center',
    },
    copyrightText: {
        color: '#fff',
        fontSize: height * 0.012,
        textAlign: 'center',
    }
});
