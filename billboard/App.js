import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { AuthProvider } from './app/context/AuthContext';
import AppNav from './app/navigation/AppNav';
import Toast from 'react-native-toast-message';
import { BillboardProvider } from './app/context/BillboardContext';
import { AdvertisingRequestProvider } from './app/context/AdvertisingRequestContext';
import { UserProvider } from './app/context/UserContext';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style='light' translucent />

      <AuthProvider>
        <UserProvider>
          <BillboardProvider>
            <AdvertisingRequestProvider>
              <ActionSheetProvider>
                <AppNav />
              </ActionSheetProvider>
            </AdvertisingRequestProvider>
          </BillboardProvider>
        </UserProvider>
      </AuthProvider>
      <Toast />
    </View>
  )
}
