import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';
import { theme } from '../theme';
import { ChevronLeft, Camera } from 'lucide-react-native';

import * as ImagePicker from 'expo-image-picker';

export default function PersonalScreen({ navigation }) {
    const [name, setName] = useState('Karthik');
    const [email, setEmail] = useState('karthik@foodiehub.com');
    const [phone, setPhone] = useState('+91 9876543210');
    const [street, setStreet] = useState('123, Anna Main Road');
    const [city, setCity] = useState('Chennai');
    const [district, setDistrict] = useState('Chennai');
    const [pincode, setPincode] = useState('600040');
    const [image, setImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Personal Information</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>

                {/* Avatar Section */}
                <View style={styles.avatarSection}>
                    <View style={styles.imageWrapper}>
                        <TouchableOpacity onPress={pickImage}>
                            <Image
                                source={{ uri: image }}
                                style={styles.avatar}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cameraBtn} onPress={pickImage}>
                            <Camera size={18} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Form Fields */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Full Name</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Street Address</Text>
                    <TextInput
                        style={styles.input}
                        value={street}
                        onChangeText={setStreet}
                        placeholder="House No, Street Name"
                    />
                </View>

                <View style={styles.row}>
                    <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.label}>City / Town</Text>
                        <TextInput
                            style={styles.input}
                            value={city}
                            onChangeText={setCity}
                            placeholder="City"
                        />
                    </View>
                    <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.label}>District</Text>
                        <TextInput
                            style={styles.input}
                            value={district}
                            onChangeText={setDistrict}
                            placeholder="District"
                        />
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Pincode</Text>
                    <TextInput
                        style={styles.input}
                        value={pincode}
                        onChangeText={setPincode}
                        placeholder="Pincode"
                        keyboardType="numeric"
                        maxLength={6}
                    />
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
                    <Text style={styles.saveBtnText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
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
        marginLeft: 16,
        color: theme.colors.text,
    },
    content: {
        padding: 24,
    },
    avatarSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    imageWrapper: {
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#F5F5F5',
    },
    cameraBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: theme.colors.primary,
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#FFFFFF',
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontFamily: theme.fonts.medium,
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        fontFamily: theme.fonts.medium,
        color: theme.colors.text,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    saveBtn: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveBtnText: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.secondary,
    },
});
