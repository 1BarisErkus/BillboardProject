import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ShowOneBillboardScreen from '../screens/ShowOneBillboardScreen'
import MapViewScreen from '../screens/MapViewScreen'
import HomeScreenForAdvertising from '../screens/Advertising/HomeScreenForAdvertising'

export default function HomeScreensForAdvertising() {
    const HomeStack = createStackNavigator()

    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='Home' component={HomeScreenForAdvertising} />
            <HomeStack.Screen name='ShowOneBillboard' component={ShowOneBillboardScreen} />
            <HomeStack.Screen name='MapView' component={MapViewScreen} />
        </HomeStack.Navigator>
    )
}