import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Animated, Easing, Platform, StatusBar } from 'react-native';
import { theme } from '../theme';
import { Check, Home } from 'lucide-react-native';

export default function OrderSuccessScreen({ navigation }) {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 40,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.centerContent}>

                <Animated.View style={[styles.successCircle, { transform: [{ scale: scaleAnim }] }]}>
                    <Check size={64} color="#FFFFFF" strokeWidth={3} />
                </Animated.View>

                <Text style={styles.title}>Order Placed!</Text>
                <Text style={styles.subtitle}>Your delicious food is on its way.</Text>

                <View style={styles.detailsBox}>
                    <Text style={styles.detailText}>Order ID: #FH-2024-8842</Text>
                    <Text style={styles.detailText}>Estimated Time: 35 mins</Text>
                </View>

            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.homeBtn}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }],
                    })}
                >
                    <Home size={20} color={theme.colors.secondary} style={{ marginRight: 8 }} />
                    <Text style={styles.homeBtnText}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    successCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#4CAF50', // Green
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        shadowColor: '#4CAF50',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontFamily: theme.fonts.extraBold,
        fontSize: 32,
        color: theme.colors.text,
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: theme.fonts.medium,
        fontSize: 16,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
    },
    detailsBox: {
        backgroundColor: '#F5F5F5',
        padding: 24,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
    },
    detailText: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginVertical: 4,
    },
    footer: {
        padding: 24,
        width: '100%',
    },
    homeBtn: {
        backgroundColor: theme.colors.primary,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    homeBtnText: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.secondary,
    },
});
