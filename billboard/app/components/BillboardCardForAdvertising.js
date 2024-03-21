import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function BillboardCardForAdvertising({ billboard }) {
    const navigation = useNavigation()

    function findDateDifference(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000; // Bir günün milisaniye cinsinden değeri

        const endDateTime = new Date(endDate)

        const diffDays = Math.round(Math.abs((endDateTime.getTime() - startDate) / oneDay));

        return diffDays;
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.billboardCardContainer}
                onPress={() => {
                    billboard.expireDateTime ?
                        navigation.navigate('ShowOneBillboard', billboard)
                        :
                        navigation.navigate('CreateAds', billboard)
                }}
            >
                <View style={styles.billboardCardHeader}>
                    <Text style={styles.billboardCodeText}>{billboard.code}</Text>
                    <Text style={styles.billboardExpireText}>
                        {billboard.expireDateTime ? findDateDifference(Date.now(), billboard.expireDateTime) : '-'} Gün
                    </Text>
                </View>
                <View style={styles.billboardCardContent}>
                    <Text style={styles.billboardLocationText}>Konum: {billboard.locationTitle}</Text>
                    <Text style={styles.billboardAdsText}>Billboard Sahibi: {billboard.owner?.fullName}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    billboardCardContainer: {
        width: '100%',
        height: height * 0.15,
        borderRadius: width * 0.08,
        marginVertical: height * 0.02,
        paddingHorizontal: width * 0.07,
        paddingVertical: width * 0.01,
        borderWidth: 2,
        borderColor: '#fff'
    },
    billboardCardHeader: {
        paddingVertical: height * 0.01,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    billboardCodeText: {
        color: '#fff',
        fontSize: width * 0.06,
        fontWeight: 'bold'
    },
    billboardExpireText: {
        color: '#fff',
        fontWeight: 'bold'
    },
    billboardCardContent: {
        gap: height * 0.005
    },
    billboardLocationText: {
        color: '#fff',
        fontSize: width * 0.04
    },
    billboardAdsText: {
        color: '#fff',
        fontSize: width * 0.035
    }
})
