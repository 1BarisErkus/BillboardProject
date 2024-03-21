import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { BillboardContext } from '../../context/BillboardContext';
import { useCallback, useContext } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import BillboardCardForAdvertising from '../../components/BillboardCardForAdvertising';

const { width, height } = Dimensions.get('window');

export default function HomeScreenForAdvertising() {
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            getAllBillboardsForAdvertising();
        }, [])
    )

    const {
        isLoading,
        data,
        getAllBillboardsForAdvertising,
        searchBillboard
    } = useContext(BillboardContext);

    const [searchText, setSearchText] = useState('');

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
                <View style={styles.showMapContainer}>
                    <CustomButton text='Haritada Gör' onPress={() => { navigation.navigate('MapView', { locationTitle: '', locationCoordinate: '', owner: data.owner ? data.owner.fullName : null }) }} icon={{ name: 'map-outline', color: '#fff', size: 24 }} />
                </View>
                <View style={styles.searchInputContainer}>
                    <CustomTextInput
                        placeholder='Search by Code'
                        keyboardType='number-pad'
                        value={searchText}
                        onChangeText={(text) => {
                            searchBillboard(text);
                            setSearchText(text);
                        }}
                    />
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
    headerInfoContainer: {},
    headerBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    availableBox: {
        backgroundColor: '#8F8F8F',
        width: width * 0.04,
        height: width * 0.04,
    },
    unavailableBox: {
        backgroundColor: '#2C2C2C',
        width: width * 0.04,
        height: width * 0.04,
    },
    allDataBox: {
        backgroundColor: '#ffffff',
        width: width * 0.04,
        height: width * 0.04,
    },
    infoText: {
        fontSize: width * 0.04,
        color: '#fff',
        marginLeft: width * 0.02,
    },
    filterText: {
        alignSelf: 'center',
        marginTop: width * 0.03,
        color: '#fff',
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
