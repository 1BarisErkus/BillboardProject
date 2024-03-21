import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React, { useContext } from 'react'
import { AdvertisingRequestContext } from '../context/AdvertisingRequestContext'

const RequestCard = ({ item, type }) => {
    const { updateApprovalStatus } = useContext(AdvertisingRequestContext)

    const onPressApproval = () => {
        updateApprovalStatus(item.id, 1)
    }

    const onPressDecline = () => {
        updateApprovalStatus(item.id, 0)
    }

    const onPressRequested = () => {

    }

    const onPressApproved = () => {

    }

    console.log(item)

    return (
        <View style={styles.billboardCardContainer}>
            <View style={type === 'owner' ? styles.billboardContentContainer : styles.billboardContentContainerForAdvertising}>
                <View style={styles.billboardCardHeader}>
                    <Text style={styles.billboardCodeText}>{item.billboard.code}</Text>
                </View>
                <View style={styles.billboardCardContent}>
                    <Text style={styles.billboardText}>Konum: {item.billboard.locationTitle}</Text>
                    {/* <Text style={styles.billboardText}>{type === 'owner' ? 'Reklam Veren: ' + item.billboard.advertisingUser ? item.billboard.advertisingUser.fullName : '-' : 'aaaaaaa'}</Text> */}
                    <Text style={styles.billboardText}>Reklam Veren: {item.billboard.advertisingUser ? item.billboard.advertisingUser.fullName : '-'}</Text>
                    <Text style={styles.billboardText}>Talep Ettiği Gün: {item.requestedDays}</Text>
                </View>
            </View>
            <View style={styles.billboardCardButtons}>
                {
                    item.billboard.advertisingUser ?
                        <>
                            <TouchableOpacity style={[styles.buttonApproval, styles.button]} onPress={onPressApproval}>
                                <Text style={styles.buttonText}>Onayla</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.buttonUnapproval, styles.button]} onPress={onPressDecline}>
                                <Text style={styles.buttonText}>Reddet</Text>
                            </TouchableOpacity>
                        </>
                        : item.isApproval === 0 ?
                            <TouchableOpacity style={styles.buttonStatus} onPress={onPressRequested}>
                                <Text style={[styles.buttonText, styles.buttonTextRequested]}>Beklemede</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.buttonStatus} onPress={onPressApproved} disabled>
                                <Text style={[styles.buttonText, styles.buttonTextApproved]}>Onaylandı</Text>
                            </TouchableOpacity>
                }

            </View>
        </View>
    )
}

export default RequestCard

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    billboardCardContainer: {
        marginBottom: height * 0.03
    },
    billboardContentContainer: {
        width: '100%',
        height: height * 0.19,
        borderRadius: width * 0.05,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        paddingHorizontal: width * 0.07,
        backgroundColor: '#2C2C2C',
    },
    billboardContentContainerForAdvertising: {
        width: '100%',
        height: height * 0.19,
        borderRadius: width * 0.05,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        paddingHorizontal: width * 0.07,
        borderColor: '#fff',
        borderWidth: 2,
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
    billboardText: {
        color: '#fff',
        fontSize: width * 0.045
    },
    billboardCardButtons: {
        flexDirection: 'row',
    },
    button: {
        width: width * 0.43,
        height: height * 0.06,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonApproval: {
        backgroundColor: '#32a852',
    },
    buttonUnapproval: {
        backgroundColor: '#d90000',
    },
    buttonText: {
        color: '#fff',
        fontSize: width * 0.07,
    },
    buttonStatus: {
        backgroundColor: '#D9D9D9',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6
    },
    buttonTextRequested: {
        color: '#FF7A00',
        fontWeight: 'bold'
    },
    buttonTextApproved: {
        color: '#529831',
        fontWeight: 'bold'
    }
})