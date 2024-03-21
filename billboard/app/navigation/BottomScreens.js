import React from 'react'
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreens from './HomeScreens'
import ProfileScreens from './ProfileScreens'
import AddEditBillbaordScreens from './AddEditBillbaordScreens';

export default function BottomScreens() {
    const BottomTab = createBottomTabNavigator()

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#fff',
                tabBarStyle: { backgroundColor: '#1E1E1E', borderColor: '#1e1e1e' }
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
                name='AddEdits'
                component={AddEditBillbaordScreens}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, focused }) => (
                        focused ?
                            <View style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, borderWidth: 8, borderColor: '#3B3B3B' }}>
                                <Ionicons name="add" color='#000' size={48} />
                            </View>
                            :
                            <View style={{ width: 70, height: 70, borderRadius: 50, backgroundColor: '#3B3B3B', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40, borderWidth: 5, borderColor: '#FFFFFF' }}>
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