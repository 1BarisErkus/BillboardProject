import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import CustomTextInput from '../../components/CustomTextInput'
import CustomButton from '../../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup'
import { ScrollView } from 'react-native';

const registerSchema = Yup.object().shape({
    fullName: Yup.string().required('* Zorunlu alan'),
    email: Yup.string().email('Geçersiz email').required('* Zorunlu alan'),
    phoneNumber: Yup.string().required('* Zorunlu alan'),
    password: Yup.string()
        .required('* Zorunlu alan')
        .min(
            3,
            'Şifre en az 3 karakter olabilir.',
        )
        .label('password'),
    passwordConfirm: Yup.string()
        .required()
        .label('passwordConfirm')
        .when('password', {
            is: val => (val && val.length > 0 ? true : false),
            then: () =>
                Yup.string().oneOf([Yup.ref('password')], 'Password not matched.'),
        }),
})

export default function RegisterScreenForOwner() {
    const { register } = useContext(AuthContext)

    return (
        <LinearGradient
            colors={['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <Formik
                    initialValues={{
                        fullName: '',
                        email: '',
                        phoneNumber: '',
                        password: '',
                        passwordConfirm: '',
                    }}
                    onSubmit={({ fullName, email, phoneNumber, password, passwordConfirm }) => register(fullName, email, phoneNumber, password, passwordConfirm, 0)}
                    validationSchema={registerSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <>
                            <View style={styles.logoContainer}>
                                <Image
                                    style={styles.logoImg}
                                    source={require('../../assets/login-billboard.png')}
                                />
                                <View style={styles.logoTextContainer}>
                                    <Text style={styles.logoText}>Advert Tracker</Text>
                                </View>
                            </View>
                            <View style={styles.inputContainer}>
                                <CustomTextInput
                                    placeholder='Tam Ad'
                                    value={values.fullName}
                                    onBlur={handleBlur('fullName')}
                                    onChangeText={handleChange('fullName')}
                                />
                                {touched.fullName && errors.fullName && (
                                    <Text style={styles.errorText}>{errors.fullName}</Text>
                                )}
                                <CustomTextInput
                                    placeholder='Email'
                                    keyboardType='email-address'
                                    value={values.email}
                                    onBlur={handleBlur('email')}
                                    onChangeText={handleChange('email')}
                                />
                                {touched.email && errors.email && (
                                    <Text style={styles.errorText}>{errors.email}</Text>
                                )}
                                <CustomTextInput
                                    placeholder='Telefon Numarası'
                                    keyboardType='phone-pad'
                                    value={values.phoneNumber}
                                    onBlur={handleBlur('phoneNumber')}
                                    onChangeText={handleChange('phoneNumber')}
                                />
                                {touched.phoneNumber && errors.phoneNumber && (
                                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                                )}
                                <CustomTextInput
                                    placeholder='Şifre'
                                    secureTextEntry
                                    value={values.password}
                                    onBlur={handleBlur('password')}
                                    onChangeText={handleChange('password')}
                                />
                                {touched.password && errors.password && (
                                    <Text style={styles.errorText}>{errors.password}</Text>
                                )}
                                <CustomTextInput
                                    placeholder='Şifre Onay'
                                    secureTextEntry
                                    value={values.passwordConfirm}
                                    onBlur={handleBlur('passwordConfirm')}
                                    onChangeText={handleChange('passwordConfirm')}
                                />
                                {touched.passwordConfirm && errors.passwordConfirm && (
                                    <Text style={styles.errorText}>{errors.passwordConfirm}</Text>
                                )}
                            </View>

                            <View style={styles.buttonContainer}>
                                <CustomButton
                                    text='Kayıt Ol'
                                    onPress={handleSubmit}
                                />
                            </View>

                            <View style={styles.copyrightContainer}>
                                <Text style={styles.copyrightText}>
                                    Bu uygulamanın telif hakları Collaborative A.Ş tarafından korunmaktadır.
                                </Text>
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </LinearGradient>
    )
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        // display: 'flex'
    },
    logoImg: {
        width: width * 0.8,
        height: width * 0.8,
    },
    logoTextContainer: {
        ...StyleSheet.absoluteFillObject, // Bu, içindeki her şeyi kaplayacak şekilde stil ekler
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    logoText: {
        color: '#C30000',
        fontSize: width * 0.05,
        fontWeight: '900',
        fontStyle: 'italic',
        letterSpacing: width * 0.01
    },
    inputContainer: {
        marginTop: -height * 0.03,
        gap: height * 0.02
    },
    errorText: {
        color: 'red',
        fontSize: width * 0.03,
        alignSelf: 'flex-end'
    },
    buttonContainer: {
        // gap: 20
        marginVertical: height * 0.05
    },
    copyrightContainer: {
    },
    copyrightText: {
        color: '#fff',
        fontSize: width * 0.025,
    }
})
