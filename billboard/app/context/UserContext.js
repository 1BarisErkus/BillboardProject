import axios from "axios";
import React, { createContext } from "react";
import { useState } from "react";
import { BASE_URL } from '../config'
import Toast from "react-native-toast-message";
import useIsReachable from '../hooks/useIsReachable'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)

    const { isReachable, checkIfReachable } = useIsReachable()

    const updatePhoto = async (photo) => {
        setIsLoading(true)

        const isReachable = await checkIfReachable(BASE_URL);

        if (isReachable === false) {
            setIsLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Sunucuya bağlanırken bir hata oluştu!',
            })
        } else {
            const userToken = await AsyncStorage.getItem('userToken')

            console.log('photo', photo)

            axios.post(`${BASE_URL}/api/users/update-photo`, {
                photoUrl: photo
            },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                .then(async res => {
                    const jsonUserInfo = JSON.stringify(res.data)
                    await AsyncStorage.setItem('userInfo', jsonUserInfo)

                    Toast.show({
                        type: 'success',
                        text1: 'Profil fotoğrafı değiştirildi!',
                    })
                })
                .catch(err => {
                    Toast.show({
                        type: 'error',
                        text1: 'Bilinmeyen bir hata oluştu:',
                    })
                    console.log(err)
                })
                .finally(_ => {
                    setIsLoading(false)
                })
        }
    }

    return (
        <UserContext.Provider value={{ updatePhoto }}>
            {children}
        </UserContext.Provider>
    )
}