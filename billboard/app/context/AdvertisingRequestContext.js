import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { createContext, useState } from "react";
import { BASE_URL } from '../config'
import Toast from "react-native-toast-message";
import useIsReachable from '../hooks/useIsReachable'

export const AdvertisingRequestContext = createContext()

export const AdvertisingRequestProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const { isReachable, checkIfReachable } = useIsReachable()

    // Owner

    const getAllAdvertisingRequestsForOwner = async () => {
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
            const userToken = await AsyncStorage.getItem('userToken')

            axios.get(`${BASE_URL}/api/advertisingRequests/owner`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(async res => {
                    console.log('res.data.billboard.advertisingUser', res.data[0].billboard.advertisingUser)
                    setData(res.data)
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 404) {
                            Toast.show({
                                type: 'error',
                                text1: 'Henüz bir reklam isteği almadınız!',
                            });
                        }
                    } else {
                        console.error('Beklenmedik bir hata oluştu:', err.message);
                        Toast.show({
                            type: 'error',
                            text1: 'Beklenmedik bir hata oluştu!',
                        });
                    }
                    setData([])
                })
                .finally(_ => {
                    setIsLoading(false)
                })
        }
    }

    const updateApprovalStatus = async (id, isApproval) => {
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
            const userToken = await AsyncStorage.getItem('userToken')

            axios.put(`${BASE_URL}/api/advertisingRequests/update-approval-status`, {
                id,
                isApproval,
            },
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                })
                .then(async res => {
                    getAllAdvertisingRequestsForOwner()
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 404) {
                            Toast.show({
                                type: 'error',
                                text1: 'Bulunamadı',
                            });
                        }
                    } else {
                        console.error('Beklenmedik bir hata oluştu:', err.message);
                        Toast.show({
                            type: 'error',
                            text1: 'Beklenmedik bir hata oluştu!',
                        });
                    }
                    setData([])
                })
                .finally(_ => {
                    setIsLoading(false)
                })
        }
    }


    // Advertising

    const getAllAdvertisingRequestsForAdvertising = async () => {
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
            const userToken = await AsyncStorage.getItem('userToken')

            axios.get(`${BASE_URL}/api/advertisingRequests/advertising`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(async res => {
                    console.log('res.data', res.data)
                    setData(res.data)
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 404) {
                            Toast.show({
                                type: 'error',
                                text1: 'Henüz bir reklam isteğinde bulunmadınız!',
                            });
                        }
                    } else {
                        console.error('Beklenmedik bir hata oluştu:', err.message);
                        Toast.show({
                            type: 'error',
                            text1: 'Beklenmedik bir hata oluştu!',
                        });
                    }
                    setData([])
                })
                .finally(_ => {
                    setIsLoading(false)
                })
        }
    }

    const createAds = async (billboardId, requestedDays) => {
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
            const userToken = await AsyncStorage.getItem('userToken')

            axios.post(`${BASE_URL}/api/advertisingRequests/create-ads`, {
                billboardId,
                requestedDays
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(async res => {
                    Toast.show({
                        type: 'success',
                        text1: 'Başarılı!',
                        text2: 'Reklam talebiniz başarıyla oluşturuldu.'
                    });
                })
                .catch(err => {
                    console.error('Beklenmedik bir hata oluştu:', err.message);
                    Toast.show({
                        type: 'error',
                        text1: 'Beklenmedik bir hata oluştu!',
                    });
                    setData([])
                })
                .finally(_ => {
                    setIsLoading(false)
                })
        }
    }

    return (
        <AdvertisingRequestContext.Provider value={{ getAllAdvertisingRequestsForOwner, getAllAdvertisingRequestsForAdvertising, updateApprovalStatus, isReachable, isLoading, data, createAds }}>
            {children}
        </AdvertisingRequestContext.Provider>
    )
}
