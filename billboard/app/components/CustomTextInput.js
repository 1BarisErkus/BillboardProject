import { TextInput, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window');

export default function CustomTextInput({ value, onChangeText, onBlur, onFocus, placeholder, keyboardType, secureTextEntry = false, editable = true, onPressIn }) {
    return (
        <TextInput
            value={value}
            onChangeText={onChangeText}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            style={styles.input}
            placeholderTextColor='#ffffff'
            autoCapitalize='none'
            editable={editable}
            onPressIn={onPressIn}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        borderColor: '#fff',
        maxWidth: width * 0.8,
        minWidth: width * 0.72,
        padding: width * 0.03,
        color: '#fff',
        fontSize: width * 0.05,
    }
})
