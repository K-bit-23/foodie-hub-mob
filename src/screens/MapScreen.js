import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, Platform, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { theme } from '../theme';
import { ChevronLeft, MapPin } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

export default function MapScreen({ navigation }) {
    const [location, setLocation] = useState(null);
    const [selectedCoords, setSelectedCoords] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
            setSelectedCoords(loc.coords);
        })();
    }, []);

    const handleMapPress = (e) => {
        setSelectedCoords(e.nativeEvent.coordinate);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={location}
                showsUserLocation={true}
                onPress={handleMapPress}
            >
                {selectedCoords && (
                    <Marker coordinate={selectedCoords} title="Selected Location" />
                )}
            </MapView>

            <SafeAreaView style={styles.overlay}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={24} color="#000" />
                </TouchableOpacity>

                <View style={styles.footerPanel}>
                    <Text style={styles.title}>Confirm Location</Text>
                    <Text style={styles.subtitle}>Tap on the map to select your delivery location.</Text>
                    <TouchableOpacity
                        style={styles.confirmBtn}
                        onPress={() => {
                            if (selectedCoords) {
                                navigation.navigate('Addresses', { newAddress: selectedCoords });
                            }
                        }}
                    >
                        <Text style={styles.confirmText}>Confirm Location</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: width,
        height: height,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
    },
    backBtn: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        width: 40,
        height: 40,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    footerPanel: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        elevation: 10,
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        color: theme.colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: theme.fonts.medium,
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 24,
    },
    confirmBtn: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    confirmText: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.secondary,
    },
});
