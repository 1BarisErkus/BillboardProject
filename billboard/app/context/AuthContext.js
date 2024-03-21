import axios from "axios";
import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from '../config'
import Toast from "react-native-toast-message";
import useIsReachable from '../hooks/useIsReachable'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState(null)

    const { isReachable, checkIfReachable } = useIsReachable()

    // Common

    const logout = async () => {
        setIsLoading(true)
        setUserToken(null)
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('userInfo')
        setIsLoading(false)
    }

    const register = async (fullName, email, phoneNumber, password, passwordConfirm, accountType) => {
        if (password === passwordConfirm) {
            setIsLoading(true)

            const isReachable = await checkIfReachable(BASE_URL);

            if (isReachable === false) {
                setIsLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Sunucuya bağlanırken bir hata oluştu!',
                })
            } else {
                axios.post(`${BASE_URL}/api/users/register`, {
                    fullName,
                    email,
                    phoneNumber,
                    password,
                    accountType
                })
                    .then(async res => {
                        console.log('register', res.data)

                        setUserInfo(res.data)
                        await AsyncStorage.setItem('userInfo', JSON.stringify(res.data))

                        if (accountType === 0)
                            await login(email, password)
                        else if (accountType === 1)
                            await loginForAdvertising(email, password)

                        Toast.show({
                            type: 'success',
                            text1: 'Kayıt Oluşturuldu!',
                        })
                    })
                    .catch(err => {
                        if (err.response) {
                            Toast.show({
                                type: 'error',
                                text1: 'Bu email veya telefon numarası zaten kayıtlı.',
                            })
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: 'Bilinmeyen bir hata oluştu:',
                            })
                        }
                        console.log(err)
                    })
                    .finally(_ => {
                        setIsLoading(false)
                    })
            }
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Şifre ve Şifre tekrarı uyuşmuyor!',
            })
        }
    }

    const changePassword = async (oldPassword, newPassword, newPasswordConfirm) => {
        if (newPassword === newPasswordConfirm) {
            setIsLoading(true)

            const isReachable = await checkIfReachable(BASE_URL);

            if (isReachable === false) {
                setIsLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Sunucuya bağlanırken bir hata oluştu!',
                })
            } else {
                axios.post(`${BASE_URL}/api/users/update-password`, {
                    oldPassword,
                    newPassword,
                },
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    })
                    .then(res => {
                        Toast.show({
                            type: 'success',
                            text1: 'Şifre Değiştirildi!',
                        })
                    })
                    .catch(err => {
                        if (err.response) {
                            Toast.show({
                                type: 'error',
                                text1: 'Eski şifre yanlış girildi.',
                            })
                        } else {
                            Toast.show({
                                type: 'error',
                                text1: 'Bilinmeyen bir hata oluştu:',
                            })
                        }
                        console.log(err)
                    })
                    .finally(_ => {
                        setIsLoading(false)
                    })
            }
        }
        else {
            Toast.show({
                type: 'error',
                text1: 'Şifre ve Şifre tekrarı uyuşmuyor!',
            })
        }
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let userInfo = await AsyncStorage.getItem('userInfo')
            let userToken = await AsyncStorage.getItem('userToken')
            userInfo = JSON.parse(userInfo)

            if (userInfo) {
                setUserToken(userToken)
                setUserInfo(userInfo)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    // Owner

    const login = async (email, password) => {
        setIsLoading(true)

        // checking if the server is reachable
        const isReachable = await checkIfReachable(BASE_URL);

        if (isReachable === false) {
            setIsLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Sunucuya bağlanırken bir hata oluştu!',
            })
        } else {
            axios.post(`${BASE_URL}/api/users/login-owner`, {
                email,
                password
            })
                .then(async (res) => {
                    console.log('login', res.data)

                    setUserInfo(res.data)
                    setUserToken(res.data.tokenDto.accessToken)
                    const jsonUserInfo = JSON.stringify(res.data)
                    await AsyncStorage.setItem('userInfo', jsonUserInfo)
                    await AsyncStorage.setItem('userToken', res.data.tokenDto.accessToken)

                    Toast.show({
                        type: 'success',
                        text1: 'Giriş Yapıldı!',
                    })
                })
                .catch(err => {
                    if (err.response) {
                        Toast.show({
                            type: 'error',
                            text1: 'Email veya Şifre hatalı!',
                        })
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Bilinmeyen bir hata oluştu:',
                        })
                    }
                    console.log(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    // Advertising

    const loginForAdvertising = async (email, password) => {
        setIsLoading(true)

        // checking if the server is reachable
        const isReachable = await checkIfReachable(BASE_URL);

        if (isReachable === false) {
            setIsLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Sunucuya bağlanırken bir hata oluştu!',
            })
        } else {
            axios.post(`${BASE_URL}/api/users/login-advertising`, {
                email,
                password
            })
                .then(async (res) => {
                    setUserInfo(res.data)
                    setUserToken(res.data.tokenDto.accessToken)
                    const jsonUserInfo = JSON.stringify(res.data)
                    await AsyncStorage.setItem('userInfo', jsonUserInfo)
                    await AsyncStorage.setItem('userToken', res.data.tokenDto.accessToken)

                    Toast.show({
                        type: 'success',
                        text1: 'Giriş Yapıldı!',
                    })
                })
                .catch(err => {
                    if (err.response) {
                        Toast.show({
                            type: 'error',
                            text1: 'Email veya Şifre hatalı!',
                        })
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Bilinmeyen bir hata oluştu:',
                        })
                    }
                    console.log(err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider value={{ login, loginForAdvertising, logout, register, changePassword, isLoading, userToken, userInfo, isReachable }}>
            {children}
        </AuthContext.Provider>
    )
}