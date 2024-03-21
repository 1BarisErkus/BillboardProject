import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window');

export default function CustomButton({ text, onPress, icon }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
            {icon && (<Ionicons name={icon.name} color={icon.color} size={icon.size} />)}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 2,
        borderColor: '#fff',
        borderRadius: width * 0.08,
        padding: width * 0.03,
        alignItems: 'center',
        justifyContent: 'space-around',
        minWidth: width * 0.6,
        maxWidth: width * 0.7,
        flexDirection: 'row',
    },
    text: {
        color: '#fff',
        fontSize: width * 0.05,
        fontWeight: 'bold'
    }
})
