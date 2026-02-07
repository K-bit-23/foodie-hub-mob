import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Platform, StatusBar, ScrollView, Switch, Alert } from 'react-native';
import { theme } from '../theme';
import { ChevronLeft, MapPin, Camera, Bell, Shield, Smartphone, ChevronRight } from 'lucide-react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';

export default function SettingsScreen({ navigation }) {
    const [permissions, setPermissions] = useState({
        location: false,
        camera: false,
        notifications: false, // We'll just mock/assume this for now or check if possible
    });

    const checkPermissions = async () => {
        try {
            // Check Location
            const locationStatus = await Location.getForegroundPermissionsAsync();

            // Check Camera
            const cameraStatus = await ImagePicker.getCameraPermissionsAsync();

            setPermissions({
                location: locationStatus.granted,
                camera: cameraStatus.granted,
                notifications: false // Placeholder as we don't have expo-notifications installed yet
            });
        } catch (error) {
            console.log('Error checking permissions:', error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            checkPermissions();
        }, [])
    );

    const openSystemSettings = () => {
        Linking.openSettings();
    };

    const PermissionItem = ({ icon: Icon, label, status, description }) => (
        <View style={styles.permissionItem}>
            <View style={styles.permissionLeft}>
                <View style={[styles.iconBox, { backgroundColor: status ? '#E8F5E9' : '#FFEBEE' }]}>
                    <Icon size={20} color={status ? '#4CAF50' : '#FF5252'} />
                </View>
                <View style={styles.permissionInfo}>
                    <Text style={styles.permissionLabel}>{label}</Text>
                    <Text style={styles.permissionDesc}>{description}</Text>
                </View>
            </View>
            <View style={styles.statusBadge}>
                <Text style={[styles.statusText, { color: status ? '#4CAF50' : '#FF5252' }]}>
                    {status ? 'Allowed' : 'Denied'}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>App Settings</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                <View style={styles.infoCard}>
                    <Shield size={48} color={theme.colors.primary} style={{ marginBottom: 16 }} />
                    <Text style={styles.infoTitle}>Privacy & Permissions</Text>
                    <Text style={styles.infoDesc}>
                        FoodieHub requires certain permissions to provide you with the best experience.
                        You can manage these access rights directly from your device settings.
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Access Permissions</Text>

                <View style={styles.permissionsList}>
                    <PermissionItem
                        icon={MapPin}
                        label="Location"
                        status={permissions.location}
                        description="For delivery address & tracking"
                    />
                    <PermissionItem
                        icon={Camera}
                        label="Camera"
                        status={permissions.camera}
                        description="For profile picture upload"
                    />
                    {/* Placeholder for Notifications since we don't have the package */}
                    {/* <PermissionItem 
                        icon={Bell} 
                        label="Notifications" 
                        status={permissions.notifications}
                        description="For order updates & offers"
                    /> */}
                </View>

                <TouchableOpacity style={styles.settingsBtn} onPress={openSystemSettings}>
                    <View style={styles.settingsBtnContent}>
                        <View style={styles.settingsIconBox}>
                            <Smartphone size={24} color="#FFFFFF" />
                        </View>
                        <Text style={styles.settingsBtnText}>Open Device Settings</Text>
                    </View>
                    <ChevronRight size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <Text style={styles.footerNote}>
                    Note: Changing permissions may restart the app.
                </Text>

            </ScrollView>
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
        marginLeft: 16,
    },
    content: {
        padding: 24,
    },
    infoCard: {
        backgroundColor: '#FFF8E1',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 32,
    },
    infoTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        color: theme.colors.text,
        marginBottom: 8,
    },
    infoDesc: {
        fontFamily: theme.fonts.medium,
        fontSize: 14,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        lineHeight: 22,
    },
    sectionTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        color: theme.colors.text,
        marginBottom: 16,
    },
    permissionsList: {
        gap: 16,
        marginBottom: 32,
    },
    permissionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    permissionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    permissionInfo: {
        flex: 1,
    },
    permissionLabel: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4,
    },
    permissionDesc: {
        fontFamily: theme.fonts.medium,
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: '#F5F5F5',
    },
    statusText: {
        fontFamily: theme.fonts.bold,
        fontSize: 12,
    },
    settingsBtn: {
        backgroundColor: theme.colors.secondary,
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    settingsBtnContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    settingsBtnText: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: '#FFFFFF',
    },
    footerNote: {
        marginTop: 24,
        textAlign: 'center',
        fontFamily: theme.fonts.regular,
        fontSize: 12,
        color: '#CCCCCC',
    },
});
