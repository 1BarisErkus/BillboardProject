import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HelpScreen() {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text
                style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    marginBottom: 20
                }}
            >
                İleşitim için irtibata geçebilirsiniz.
            </Text>
            <Text>
                Mail: bariserkus.mdbf20@iste.edu.tr
            </Text>
            <Text>
                Telefon: 0535 469 35 63
            </Text>
            <Text>
                Adres: Adana / Seyhan ... Mahallesi, ... Sokak, No: ...
            </Text>
            <Text>
                Collborative Software
            </Text>
        </View >
    )
}

const styles = StyleSheet.create({})