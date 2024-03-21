import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const CustomButton2 = ({ text, onPress, icon }) => {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{text}</Text>
                {icon && (<Ionicons name={icon} color='black' size={30} />)}
            </TouchableOpacity>
        </View>
    )
}

export default CustomButton2

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderRadius: 15,
        borderColor: '#fff',
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.01,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: width * 0.8,
        maxWidth: width * 0.8,
        flexDirection: 'row',
    },
    text: {
        color: '#000',
        fontSize: width * 0.06,
        fontWeight: 'bold'
    }
})