import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BillboardContext } from '../../context/BillboardContext';
import { useCallback, useContext } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import BillboardCardForAdvertising from '../../components/BillboardCardForAdvertising';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function CreateAdsListScreen() {

    useFocusEffect(
        useCallback(() => {
            getAllBillboardsForCreateAds();
        }, [])
    )

    const {
        isLoading,
        data,
        getAllBillboardsForCreateAds,
    } = useContext(BillboardContext);

    if (isLoading) {
        return (
            <LinearGradient
                colors={['#FF5C00', '#09F', '#09F']}
                start={{ x: 0, y: 0.55 }}
                end={{ x: 0, y: 0.02 }}
                style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}
            >
                <ActivityIndicator size='large' color='#fff' />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={['#FF5C00', '#09F', '#09F']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={styles.headerText}>Reklam vermek için müsait olan billboardlar</Text>
                    <View style={styles.line} />
                </View>
                <FlatList style={styles.billboardCards} data={data} renderItem={({ item }) => <BillboardCardForAdvertising billboard={item} />} />
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: width * 0.05,
    },
    headerText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: width * 0.04
    },
    line: {
        borderBottomWidth: 1,
        borderColor: '#fff',
        marginTop: width * 0.03,
    },
    showMapContainer: {
        alignSelf: 'center',
        marginTop: width * 0.04,
    },
    searchInputContainer: {
        marginTop: width * 0.02,
        alignSelf: 'center',
    },
    billboardCards: {
        marginTop: width * 0.04,
    },
});
