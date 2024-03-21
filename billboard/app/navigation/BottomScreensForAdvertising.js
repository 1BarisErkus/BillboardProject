import React from 'react'
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreens from './HomeScreensForAdvertising'
import ProfileScreens from './ProfileScreens'
import CreateAdsScreens from './CreateAdsScreens';

export default function BottomScreensForAdvertising() {
    const BottomTab = createBottomTabNavigator()

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#fff',
                tabBarStyle: { backgroundColor: '#FF5C00', borderColor: '#333' }
            }}
        >
            <BottomTab.Screen
                name='Homes'
                component={HomeScreens}
                options={{
                    tabBarLabel: 'Ana Sayfa',
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            <Ionicons name="home" color={color} size={30} />
                            :
                            <Ionicons name="home-outline" color={color} size={30} />

                    ),
                }} />
            <BottomTab.Screen
                name='CreateAdsScreens'
                component={CreateAdsScreens}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            <View style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, borderWidth: 6, borderColor: '#FF5C00' }}>
                                <Ionicons name="add" color='#FF5C00' size={48} />
                            </View>
                            :
                            <View style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: '#FF5C00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, borderWidth: 5, borderColor: '#FFFFFF' }}>
                                <Ionicons name="add" color={color} size={48} />
                            </View>
                    ),
                }} />
            <BottomTab.Screen
                name='Profiles'
                component={ProfileScreens}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, focused }) => (
                        focused
                            ?
                            <Ionicons name="person" color={color} size={30} />
                            :
                            <Ionicons name="person-outline" color={color} size={30} />
                    ),
                }} />
        </BottomTab.Navigator >
    )
}