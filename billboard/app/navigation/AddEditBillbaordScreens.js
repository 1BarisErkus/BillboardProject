import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AddEditBillbaordScreen from '../screens/Owner/AddEditBillbaordScreen'
import CameraScreen from '../screens/CameraScreen'

export default function AddEditBillbaordScreens() {
    const AddEditStack = createStackNavigator()

    return (
        <AddEditStack.Navigator screenOptions={{ headerShown: false }}>
            <AddEditStack.Screen name='AddEdit' component={AddEditBillbaordScreen} />
            <AddEditStack.Screen name='Camera' component={CameraScreen} />
        </AddEditStack.Navigator>
    )
}