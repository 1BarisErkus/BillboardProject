import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const validSchema = Yup.object().shape({
    oldPassword: Yup.string().required('* Zorunlu alan'),
    newPassword: Yup.string().required('* Zorunlu alan'),
    newPasswordConfirm: Yup.string().required('* Zorunlu alan')
});

export default function ChangePasswordScreen() {
    const { userInfo, changePassword } = useContext(AuthContext)

    const navigation = useNavigation()

    return (
        <LinearGradient
            colors={userInfo.userShowDto.accountType === 1 ? ['#FF5C00', '#09F', '#09F'] : ['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back-outline' color='#fff' size={36} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Şifre Değiştir</Text>
                </View>
                <View style={styles.line} />
                <ScrollView>
                    <View style={styles.subContainer}>
                        <Formik
                            initialValues={{
                                oldPassword: '',
                                newPassword: '',
                                newPasswordConfirm: ''
                            }}
                            onSubmit={async ({ oldPassword, newPassword, newPasswordConfirm }) => await changePassword(oldPassword, newPassword, newPasswordConfirm)}
                            validationSchema={validSchema}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <>
                                    <View style={styles.inputContainer}>
                                        <CustomTextInput
                                            value={values.oldPassword}
                                            onChangeText={handleChange('oldPassword')}
                                            onBlur={handleBlur('oldPassword')}
                                            placeholder='Eski Şifre'
                                            secureTextEntry
                                        />
                                        {touched.oldPassword && errors.oldPassword && <Text style={styles.errorText}>{errors.oldPassword}</Text>}
                                        <CustomTextInput
                                            value={values.newPassword}
                                            onChangeText={handleChange('newPassword')}
                                            onBlur={handleBlur('newPassword')}
                                            placeholder='Yeni Şifre'
                                            secureTextEntry
                                        />
                                        {touched.newPassword && errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}
                                        <CustomTextInput
                                            value={values.newPasswordConfirm}
                                            onChangeText={handleChange('newPasswordConfirm')}
                                            onBlur={handleBlur('newPasswordConfirm')}
                                            placeholder='Yeni Şifre Tekrar'
                                            secureTextEntry
                                        />
                                        {touched.newPasswordConfirm && errors.newPasswordConfirm && <Text style={styles.errorText}>{errors.newPasswordConfirm}</Text>}
                                    </View>

                                    <View style={styles.buttonContainer}>
                                        <CustomButton text='Şifre Değiştir' onPress={handleSubmit} />
                                    </View>
                                </>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient >
    )
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width * 0.07,
        paddingVertical: height * 0.08,
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        color: '#fff',
        fontSize: width * 0.06,
        fontWeight: 'bold',
        marginLeft: width * 0.16
    },
    line: {
        borderBottomWidth: 1,
        borderColor: '#fff',
        marginTop: width * 0.03,
    },
    subContainer: {
        flex: 1,
        marginTop: height * 0.3
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
        alignSelf: 'center',
        marginTop: height * 0.08
    },

})