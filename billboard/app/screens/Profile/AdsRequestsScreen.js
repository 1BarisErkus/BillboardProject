import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import RequestCard from '../../components/RequestCard'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { AdvertisingRequestContext } from '../../context/AdvertisingRequestContext'

export default function AdsRequestsScreen() {
    const navigation = useNavigation()
    const route = useRoute()

    const { type } = route.params

    const {
        data,
        getAllAdvertisingRequestsForOwner,
        getAllAdvertisingRequestsForAdvertising
    } = useContext(AdvertisingRequestContext)

    useFocusEffect(
        useCallback(() => {
            if (type === 'owner')
                getAllAdvertisingRequestsForOwner();
            else
                getAllAdvertisingRequestsForAdvertising()
        }, [])
    )


    return (
        <LinearGradient
            colors={type === 'owner' ? ['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C'] : ['#FF5C00', '#09F', '#09F']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name='arrow-back-outline' color='#fff' size={36} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Reklam İstekleri</Text>
                </View>
                <View style={styles.line} />
                <FlatList
                    style={styles.billboardCards}
                    data={data}
                    renderItem={({ item }) => <RequestCard item={item} type={type} />} />
            </SafeAreaView>
        </LinearGradient>
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
        marginLeft: width * 0.13
    },
    line: {
        borderBottomWidth: 1,
        borderColor: '#fff',
        marginTop: width * 0.03,
    },
    billboardCards: {
        marginTop: width * 0.04,
    },
})