import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BillboardContext } from '../context/BillboardContext';
import { useContext } from 'react';
import * as Location from 'expo-location';

export default function MapViewScreen() {
    const navigation = useNavigation()

    const route = useRoute()
    const { locationTitle, locationCoordinate, advertisingUser, owner } = route.params
    const { data } = useContext(BillboardContext)

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(true);

    const [markerCoordinate, setMarkerCoordinate] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                setLocation(location);
            } catch (error) {
                console.warn(error);
            } finally {
                setLoadingLocation(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (markerCoordinate) {
            Alert.alert(
                'Konum belirlendi',
                'İşaretlediğiniz konumdan emin misiniz?',
                [
                    {
                        text: 'İptal',
                        style: 'cancel',
                        onPress: () => setMarkerCoordinate(null)
                    },
                    {
                        text: 'Onayla',
                        onPress: () => navigation.navigate('AddEdit', { markerCoordinate }),
                    },
                ]
            );
        }
    }, [markerCoordinate]);


    if (loadingLocation) {
        return (
            <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const singleCoordinate = () => {
        const coordinates = locationCoordinate.replace(/\s/g, "").split(',')
        return (
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: parseFloat(coordinates[0]),
                    longitude: parseFloat(coordinates[1]),
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: parseFloat(coordinates[0]),
                        longitude: parseFloat(coordinates[1]),
                    }}
                    title={locationTitle}
                    description={advertisingUser ? advertisingUser.fullName : owner ? owner : '-'}
                />
            </MapView>
        )
    }

    const multipleCoordinate = () => {
        return (
            locationTitle === 'Yeni Konum' ?
                (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: location ? location.coords.latitude : 37.047812807876724,
                            longitude: location ? location.coords.longitude : 35.36527674785571,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,
                        }}
                        onPress={(e) => {
                            setMarkerCoordinate(e.nativeEvent.coordinate);
                            // console.log(e)
                        }}
                    >
                        {data.map((item) => {
                            const coordinates = item.locationCoordinate.replace(/\s/g, '').split(',');
                            return (
                                <Marker
                                    key={item.id}
                                    coordinate={{
                                        latitude: parseFloat(coordinates[0]),
                                        longitude: parseFloat(coordinates[1]),
                                    }}
                                    title={item.locationTitle} // Eğer item'da title yoksa locationTitle kullan
                                    description={item.advertisingUser ? item.advertisingUser.fullName : '-'}
                                />
                            );
                        })}

                        {markerCoordinate && <Marker coordinate={markerCoordinate} title="İşaretlenen Konum" />}

                    </MapView>
                )
                :
                (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        region={{
                            latitude: location ? location.coords.latitude : 37.047812807876724,
                            longitude: location ? location.coords.longitude : 35.36527674785571,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2,
                        }}
                    >
                        {data.map((item) => {
                            const coordinates = item.locationCoordinate.replace(/\s/g, '').split(',');
                            return (
                                <Marker
                                    key={item.id}
                                    coordinate={{
                                        latitude: parseFloat(coordinates[0]),
                                        longitude: parseFloat(coordinates[1]),
                                    }}
                                    title={item.locationTitle} // Eğer item'da title yoksa locationTitle kullan
                                    description={item.advertisingUser ? item.advertisingUser.fullName : item.owner ? item.owner.fullName : '-'}
                                />
                            );
                        })}
                    </MapView>
                )
        );
    };

    if (errorMsg) {
        return <Text>{errorMsg}</Text>
    }

    return (
        < View style={styles.container} >
            {
                locationCoordinate === "" ?
                    multipleCoordinate()
                    :
                    singleCoordinate()
            }
        </ View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});