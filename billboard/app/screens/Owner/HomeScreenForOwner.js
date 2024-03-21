import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import BillboardCard from '../../components/BillboardCard';
import { BillboardContext } from '../../context/BillboardContext';
import { useCallback, useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function HomeScreenForOwner() {
    const navigation = useNavigation();

    const {
        isLoading,
        data,
        getAllBillboardsForOwner,
        getAllAvailableBillboardsForOwner,
        getAllUnavailableBillboardsForOwner,
        searchBillboard
    } = useContext(BillboardContext);

    const [searchText, setSearchText] = useState('');

    useFocusEffect(
        useCallback(() => {
            getAllBillboardsForOwner();
        }, [])
    )

    if (isLoading) {
        return (
            <LinearGradient
                colors={['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C']}
                start={{ x: 0, y: 0.55 }}
                end={{ x: 0, y: 0.02 }}
                style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}
            >
                <ActivityIndicator size='large' />
            </LinearGradient>
        );
    }

    return (
        <LinearGradient
            colors={['#1D1C1C', 'rgba(255, 255, 255, 0.00)', '#787878', '#1D1C1C']}
            start={{ x: 0, y: 0.55 }}
            end={{ x: 0, y: 0.02 }}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.headerInfoContainer}>
                    <View style={styles.headerBoxContainer}>
                        <TouchableOpacity style={styles.infoContainer} onPress={getAllAvailableBillboardsForOwner}>
                            <View style={styles.availableBox} />
                            <Text style={styles.infoText}>Müsait</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infoContainer} onPress={getAllUnavailableBillboardsForOwner}>
                            <View style={styles.unavailableBox} />
                            <Text style={styles.infoText}>Meşgul</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.infoContainer} onPress={getAllBillboardsForOwner}>
                            <View style={styles.allDataBox} />
                            <Text style={styles.infoText}>Tüm Veriler</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.filterText}>Filtrelemek için üstüne dokun.</Text>
                    <View style={styles.line} />
                </View>
                <View style={styles.showMapContainer}>
                    <CustomButton text='Haritada Gör' onPress={() => { navigation.navigate('MapView', { locationTitle: '', locationCoordinate: '' }) }} icon={{ name: 'map-outline', color: '#fff', size: 24 }} />
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
                <FlatList style={styles.billboardCards} data={data} renderItem={({ item }) => <BillboardCard billboard={item} />} />
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
