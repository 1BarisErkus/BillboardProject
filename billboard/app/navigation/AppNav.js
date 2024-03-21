import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreens from './AuthScreens';
import BottomScreens from './BottomScreens';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomScreensForAdvertising from './BottomScreensForAdvertising';

const Stack = createStackNavigator()

export default function AppNav() {
    const { isLoading, userToken, userInfo } = useContext(AuthContext)

    if (isLoading) {
        return (
            <LinearGradient
                colors={
                    userInfo?.userShowDto?.accountType === 0
                        ?
                        ['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C']
                        :
                        ['#FF5C00', '#09F', '#09F']
                }
                start={{ x: 0, y: 0.55 }}
                end={{ x: 0, y: 0.02 }}
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <ActivityIndicator size='large' />
            </LinearGradient>
        )
    }

    const calculateTimeLeft = () => {
        const difference = +new Date(userInfo?.tokenDto?.expiration) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    }

    return (
        <NavigationContainer >
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                {userToken === null || new Date(userInfo?.tokenDto?.expiration) < Date.now() ?
                    (<Stack.Screen name="Auth" component={AuthScreens} />)
                    : userInfo?.userShowDto?.accountType === 0 ?
                        <Stack.Screen name="Bottom" component={BottomScreens} />
                        :
                        <Stack.Screen name="BottomAds" component={BottomScreensForAdvertising} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}