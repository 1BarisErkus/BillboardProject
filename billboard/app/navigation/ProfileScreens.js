import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import AdsRequestsScreen from '../screens/Profile/AdsRequestsScreen'
import ChangePasswordScreen from '../screens/Profile/ChangePasswordScreen'
import HelpScreen from '../screens/Profile/HelpScreen'

export default function ProfileScreens() {
    const ProfileStack = createStackNavigator()

    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name='Profile' component={ProfileScreen} />
            <ProfileStack.Screen name='AdsRequests' component={AdsRequestsScreen} />
            <ProfileStack.Screen name='ChangePassword' component={ChangePasswordScreen} />
            <ProfileStack.Screen name='Help' component={HelpScreen} />
        </ProfileStack.Navigator>
    )
}