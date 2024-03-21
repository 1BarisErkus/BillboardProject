import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreenForOwner from '../screens/Owner/LoginScreenForOwner';
import LoginScreenForAdvertising from '../screens/Advertising/LoginScreenForAdvertising';
import RegisterScreenForOwner from '../screens/Owner/RegisterScreenForOwner'
import RegisterScreenForAdvertising from '../screens/Advertising/RegisterScreenForAdvertisin';

export default function AuthScreens() {
    const AuthStack = createStackNavigator()

    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen name="Login" component={LoginScreenForOwner} />
            <AuthStack.Screen name="Register" component={RegisterScreenForOwner} />
            <AuthStack.Screen name="LoginAds" component={LoginScreenForAdvertising} />
            <AuthStack.Screen name="RegisterAds" component={RegisterScreenForAdvertising} />
        </AuthStack.Navigator>
    )
}