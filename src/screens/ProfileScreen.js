import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
import { User, MapPin, Bell, CreditCard, Heart, HelpCircle, LogOut, ChevronRight, Settings } from 'lucide-react-native';

const MENU_ITEMS = [
    {
        title: 'Account',
        items: [
            { icon: User, label: 'Personal Information', screen: 'Personal' },
            { icon: CreditCard, label: 'Payment Methods', screen: 'Payment' },
            { icon: Heart, label: 'My Favorites', screen: 'Favorites' },
            { icon: MapPin, label: 'My Addresses', screen: 'Addresses' },
        ]
    },
    {
        title: 'Settings',
        items: [
            { icon: Bell, label: 'Notifications', type: 'toggle', value: true },
            { icon: MapPin, label: 'Location Access', type: 'toggle', value: true },
            { icon: Settings, label: 'App Settings', screen: 'Settings' },
        ]
    },
    {
        title: 'Support',
        items: [
            { icon: HelpCircle, label: 'Help Center', screen: 'Help' },
            { icon: LogOut, label: 'Log Out', screen: 'Logout', color: '#FF3B30' },
        ]
    }
];


export default function ProfileScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header Profile Card */}
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop' }}
                            style={styles.avatar}
                        />
                        <View style={styles.cameraBtn}>
                            <User size={14} color="#FFF" />
                        </View>
                    </View>
                    <Text style={styles.userName}>Karthik</Text>
                    <Text style={styles.userEmail}>karthik@foodiehub.com</Text>
                    <TouchableOpacity style={styles.editProfileBtn}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu Sections */}
                {MENU_ITEMS.map((section, index) => (
                    <View key={index} style={styles.section}>
                        <Text style={styles.sectionTitle}>{section.title}</Text>
                        <View style={styles.menuContainer}>
                            {section.items.map((item, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    style={[
                                        styles.menuItem,
                                        idx === section.items.length - 1 && styles.lastMenuItem
                                    ]}
                                    activeOpacity={0.7}
                                    onPress={() => item.screen && navigation.navigate(item.screen)}
                                >
                                    <View style={[styles.iconBox, { backgroundColor: item.color ? '#FFEBEE' : '#F5F5F5' }]}>
                                        <item.icon size={20} color={item.color || theme.colors.textSecondary} />
                                    </View>
                                    <Text style={[styles.menuLabel, { color: item.color || theme.colors.text }]}>
                                        {item.label}
                                    </Text>

                                    {item.type === 'toggle' ? (
                                        <Switch
                                            value={item.value}
                                            trackColor={{ false: '#767577', true: theme.colors.primary }}
                                            thumbColor={'#f4f3f4'}
                                            style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
                                        />
                                    ) : (
                                        <ChevronRight size={20} color="#CCCCCC" />
                                    )}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}

                <View style={styles.versionContainer}>
                    <Text style={styles.versionText}>App Version 1.0.0</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Changed to white for cleaner look
    },
    scrollContent: {
        paddingBottom: 100,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 32,
        backgroundColor: '#FFFFFF',
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#F5F5F5',
    },
    cameraBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    userName: {
        fontFamily: theme.fonts.bold,
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 4,
    },
    userEmail: {
        fontFamily: theme.fonts.medium,
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 16,
    },
    editProfileBtn: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
    },
    editProfileText: {
        fontFamily: theme.fonts.bold,
        fontSize: 14,
        color: theme.colors.secondary,
    },
    section: {
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        color: theme.colors.text,
        marginBottom: 12,
    },
    menuContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        borderWidth: 1,
        borderColor: '#F5F5F5',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuLabel: {
        flex: 1,
        fontFamily: theme.fonts.medium,
        fontSize: 16,
    },
    versionContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    versionText: {
        fontFamily: theme.fonts.medium,
        fontSize: 12,
        color: '#CCCCCC',
    },
});
