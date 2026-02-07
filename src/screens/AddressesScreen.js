import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Dimensions, Platform, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { theme } from '../theme';
import { ChevronLeft, Plus, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const ADDRESSES = [
    {
        id: 1,
        label: 'Home',
        address: '123, Anna Main Road, Chennai',
        coordinates: { latitude: 13.0827, longitude: 80.2707 }
    },
    {
        id: 2,
        label: 'Work',
        address: 'Tech Park, Guindy, Chennai',
        coordinates: { latitude: 13.0102, longitude: 80.2157 }
    }
];

export default function AddressesScreen({ navigation, route }) {
    const [addresses, setAddresses] = useState(ADDRESSES);
    const [selectedAddress, setSelectedAddress] = useState(ADDRESSES[0]);

    // Check for new address from MapScreen
    React.useEffect(() => {
        if (route.params?.newAddress) {
            const newAddr = {
                id: addresses.length + 1,
                label: 'New Address',
                address: `Lat: ${route.params.newAddress.latitude.toFixed(4)}, Long: ${route.params.newAddress.longitude.toFixed(4)}`, // Ideally reverse geocode this
                coordinates: route.params.newAddress
            };
            setAddresses([...addresses, newAddr]);
            setSelectedAddress(newAddr);
        }
    }, [route.params?.newAddress]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Addresses</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('Map', { action: 'add' })}>
                    <Plus size={24} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Map Preview */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: selectedAddress.coordinates.latitude,
                        longitude: selectedAddress.coordinates.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    region={{
                        latitude: selectedAddress.coordinates.latitude,
                        longitude: selectedAddress.coordinates.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker coordinate={selectedAddress.coordinates} />
                </MapView>
            </View>

            <FlatList
                data={addresses}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[styles.card, selectedAddress.id === item.id && styles.selectedCard]}
                        onPress={() => setSelectedAddress(item)}
                    >
                        <View style={styles.iconBox}>
                            <MapPin size={24} color={theme.colors.primary} />
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.label}>{item.label}</Text>
                            <Text style={styles.address}>{item.address}</Text>
                        </View>
                        {selectedAddress.id === item.id && (
                            <View style={styles.radioBtn}>
                                <View style={styles.radioInner} />
                            </View>
                        )}
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
        justifyContent: 'space-between',
    },
    backBtn: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
    },
    addBtn: {
        padding: 8,
    },
    mapContainer: {
        height: 200,
        margin: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    listContent: {
        paddingHorizontal: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    selectedCard: {
        borderColor: theme.colors.primary,
        backgroundColor: '#FFF8E1',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FFFDE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    info: {
        flex: 1,
    },
    label: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4,
    },
    address: {
        fontFamily: theme.fonts.medium,
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    radioBtn: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        padding: 4,
    },
    radioInner: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        borderRadius: 10,
    },
});
