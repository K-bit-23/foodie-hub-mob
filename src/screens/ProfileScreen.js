import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Profile</Text>
            <Text style={styles.subtitle}>Settings, Addresses, and More</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontFamily: theme.fonts.bold,
        fontSize: 24,
        color: theme.colors.text,
        marginBottom: 8,
    },
    subtitle: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.textSecondary,
        fontSize: 16,
    }
});
