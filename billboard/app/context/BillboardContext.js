import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import React, { createContext, useState } from "react";
import { BASE_URL } from '../config'
import Toast from "react-native-toast-message";
import useIsReachable from '../hooks/useIsReachable'

export const BillboardContext = createContext()

export const BillboardProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const { isReachable, checkIfReachable } = useIsReachable()

    // Common

    const searchBillboard = async (text) => {
        let newData = JSON.parse(await AsyncStorage.getItem("allData"))

        if (text) {
            newData = newData.filter(item => item.code.startsWith(text))
        }

        setData(newData)
    }

    // Owner

    const getAllBillboardsForOwner = async () => {
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

            axios.get(`${BASE_URL}/api/billboards/owner`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(async res => {
                    setData(res.data)
                    await AsyncStorage.setItem("allData", JSON.stringify(res.data))
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 404) {
                            Toast.show({
                                type: 'error',
                                text1: 'Billboard bulunamadı',
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

    const getAllAvailableBillboardsForOwner = async () => {
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

            axios.get(`${BASE_URL}/api/billboards/owner`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(async res => {
                    const newData = res.data.filter(data => data.advertisingUser === null)
                    setData(newData)
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 404) {
                            Toast.show({
                                type: 'error',
                                text1: 'Billboard bulunamadı',
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

    const getAllUnavailableBillboardsForOwner = async () => {
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

            axios.get(`${BASE_URL}/api/billboards/owner`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(async res => {
                    const newData = res.data.filter(data => data.advertisingUser !== null)
                    setData(newData)
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 404) {
                            Toast.show({
                                type: 'error',
                                text1: 'Billboard bulunamadı',
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

    const deleteBillboard = async (id) => {
        setIsLoading(true)

        // checking if the server is reachable
        const isReachable = await checkIfReachable(BASE_URL);
        (isReachable)

        if (isReachable === false) {
            setIsLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Sunucuya bağlanırken bir hata oluştu!',
            })
        } else {
            const userToken = await AsyncStorage.getItem('userToken')

            axios.delete(`${BASE_URL}/api/billboards/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(res => {
                    getAllBillboardsForOwner()
                    Toast.show({
                        type: 'success',
                        text1: 'Billboard Silindi!',
                    })
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 404) {
                            Toast.show({
                                type: 'error',
                                text1: 'Billboard bulunamadı',
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

    const addBillboard = async (code, locationTitle, locationCoordinate, photoUrl) => {
        setIsLoading(true)

        // checking if the server is reachable
        const isReachable = await checkIfReachable(BASE_URL);
        (isReachable)

        if (isReachable === false) {
            setIsLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Sunucuya bağlanırken bir hata oluştu!',
            })
        } else {
            const userToken = await AsyncStorage.getItem('userToken')

            axios.post(`${BASE_URL}/api/billboards/`, {
                code,
                locationTitle,
                locationCoordinate,
                photoUrl,
                // expireDateTime
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(res => {
                    // console.log(res.data)
                    getAllBillboardsForOwner()
                    Toast.show({
                        type: 'success',
                        text1: 'Billboard Eklendi!',
                    })
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 500) {
                            Toast.show({
                                type: 'error',
                                text1: 'Beklenmedik bir hata oluştu!',
                            });
                        }
                    } else {
                        console.error('Beklenmedik bir hata oluştu:', err.message);
                        Toast.show({
                            type: 'error',
                            text1: 'Beklenmedik bir hata oluştu!',
                        });
                    }
                })
                .finally(_ => {
                    setIsLoading(false)
                })
        }
    }

    // Advertising

    const getAllBillboardsForAdvertising = async () => {
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

            axios.get(`${BASE_URL}/api/billboards/advertising`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(async res => {
                    setData(res.data)
                    await AsyncStorage.setItem("allData", JSON.stringify(res.data))
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 404) {
                            Toast.show({
                                type: 'error',
                                text1: 'Billboard bulunamadı',
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

    const getAllBillboardsForCreateAds = async () => {
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

            axios.get(`${BASE_URL}/api/billboards/create-ads`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            })
                .then(async res => {
                    setData(res.data)
                    await AsyncStorage.setItem("allData", JSON.stringify(res.data))
                })
                .catch(err => {
                    if (err.response) {
                        // console.log(err.response.data.Message);

                        if (err.response.status === 404) {
                            Toast.show({
                                type: 'error',
                                text1: 'Billboard bulunamadı',
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

    return (
        <BillboardContext.Provider value={{ isReachable, isLoading, data, getAllBillboardsForOwner, getAllAvailableBillboardsForOwner, getAllUnavailableBillboardsForOwner, searchBillboard, deleteBillboard, addBillboard, getAllBillboardsForAdvertising, getAllBillboardsForCreateAds }}>
            {children}
        </BillboardContext.Provider>
    )
}