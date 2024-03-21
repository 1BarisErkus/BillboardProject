import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CreateAdsListScreen from '../screens/Advertising/CreateAdsListScreen'
import CreateAdsScreen from '../screens/Advertising/CreateAdsScreen'

export default function CreateAdsScreens() {
    const AddEditStack = createStackNavigator()

    return (
        <AddEditStack.Navigator screenOptions={{ headerShown: false }}>
            <AddEditStack.Screen name='CreateAdsList' component={CreateAdsListScreen} />
            <AddEditStack.Screen name='CreateAds' component={CreateAdsScreen} />
        </AddEditStack.Navigator>
    )
}