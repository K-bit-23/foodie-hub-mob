import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { theme } from '../theme';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.content}>
                {/* Background Decorative Circles */}
                <View style={styles.circle1} />
                <View style={styles.circle2} />

                <Animated.View
                    entering={FadeInUp.delay(200).duration(1000).springify()}
                    style={styles.imageContainer}
                >
                    {/* We'll use a placeholder or image prompt if needed, but for now a styled view */}
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.emoji}>🍔</Text>
                    </View>
                </Animated.View>

                <View style={styles.textContainer}>
                    <Animated.Text
                        entering={FadeInDown.delay(400).duration(1000).springify()}
                        style={styles.title}
                    >
                        Foodie <Text style={{ color: theme.colors.primary }}>Hub</Text>
                    </Animated.Text>

                    <Animated.Text
                        entering={FadeInDown.delay(600).duration(1000).springify()}
                        style={styles.subtitle}
                    >
                        Get your favorite meals delivered fast and fresh at your doorstep.
                    </Animated.Text>
                </View>

                <Animated.View
                    entering={FadeInDown.delay(800).duration(1000).springify()}
                    style={styles.buttonContainer}
                >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Home')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.secondary,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.xl,
        paddingHorizontal: theme.spacing.lg,
        overflow: 'hidden',
    },
    circle1: {
        position: 'absolute',
        top: -height * 0.1,
        right: -width * 0.2,
        width: width * 0.8,
        height: width * 0.8,
        borderRadius: width * 0.4,
        backgroundColor: theme.colors.primary,
        opacity: 0.1,
    },
    circle2: {
        position: 'absolute',
        bottom: -height * 0.05,
        left: -width * 0.1,
        width: width * 0.6,
        height: width * 0.6,
        borderRadius: width * 0.3,
        backgroundColor: theme.colors.primary,
        opacity: 0.1,
    },
    imageContainer: {
        marginTop: height * 0.05,
        width: width * 0.8,
        height: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.full,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 20,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 15,
    },
    emoji: {
        fontSize: 100,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
    },
    title: {
        fontSize: 48,
        fontFamily: theme.fonts.extraBold,
        color: '#FFFFFF',
        marginBottom: theme.spacing.md,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: theme.fonts.regular,
        color: '#CCCCCC',
        textAlign: 'center',
        lineHeight: 28,
        paddingHorizontal: theme.spacing.xl,
    },
    buttonContainer: {
        width: '100%',
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.xl,
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        elevation: 5,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    buttonText: {
        color: theme.colors.secondary,
        fontSize: 20,
        fontFamily: theme.fonts.bold,
    },
});
