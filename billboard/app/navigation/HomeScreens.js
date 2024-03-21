import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreenForOwner from '../screens/Owner/HomeScreenForOwner'
import ShowOneBillboardScreen from '../screens/ShowOneBillboardScreen'
import MapViewScreen from '../screens/MapViewScreen'

export default function HomeScreens() {
    const HomeStack = createStackNavigator()

    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name='Home' component={HomeScreenForOwner} />
            <HomeStack.Screen name='ShowOneBillboard' component={ShowOneBillboardScreen} />
            <HomeStack.Screen name='MapView' component={MapViewScreen} />
        </HomeStack.Navigator>
    )
}