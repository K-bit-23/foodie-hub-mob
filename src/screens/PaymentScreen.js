import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import { ChevronLeft, CreditCard, Banknote, Smartphone, CheckCircle, Circle, ArrowRight, QrCode } from 'lucide-react-native';

const PAYMENT_METHODS = [
    {
        id: 'card',
        label: 'Credit / Debit Card',
        icon: CreditCard,
        description: 'Visa, Mastercard, Amex',
    },
    {
        id: 'upi',
        label: 'UPI / Google Pay',
        icon: Smartphone,
        description: 'Instant payment via UPI apps',
    },
    {
        id: 'qr',
        label: 'Scan QR Code',
        icon: QrCode,
        description: 'Scan to pay via any UPI app',
    },
    {
        id: 'cod',
        label: 'Cash on Delivery',
        icon: Banknote,
        description: 'Pay when you receive the order',
    }
];

export default function PaymentScreen({ navigation, route }) {
    const { total } = route.params || { total: 0 };
    const [selectedMethod, setSelectedMethod] = useState('card');

    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsProcessing(false);
            navigation.replace('OrderSuccess');
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* ... (rest of header and content) ... */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {/* ... (rest of content) ... */}
                {/* Total Amount Card */}
                <View style={styles.amountCard}>
                    <Text style={styles.amountLabel}>Total to Pay</Text>
                    <Text style={styles.amountValue}>${parseFloat(total).toFixed(2)}</Text>
                </View>

                <Text style={styles.sectionTitle}>Select Payment Method</Text>

                <View style={styles.methodsContainer}>
                    {PAYMENT_METHODS.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.methodCard,
                                selectedMethod === method.id && styles.selectedMethodCard,
                                selectedMethod === method.id && method.id === 'qr' && { flexDirection: 'column', alignItems: 'flex-start' }
                            ]}
                            onPress={() => setSelectedMethod(method.id)}
                            activeOpacity={0.9}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <View style={[
                                    styles.iconBox,
                                    selectedMethod === method.id ? styles.selectedIconBox : {}
                                ]}>
                                    <method.icon
                                        size={24}
                                        color={selectedMethod === method.id ? '#FFF' : theme.colors.primary}
                                    />
                                </View>
                                <View style={styles.methodInfo}>
                                    <Text style={styles.methodLabel}>{method.label}</Text>
                                    <Text style={styles.methodDesc}>{method.description}</Text>
                                </View>
                                {selectedMethod === method.id ? (
                                    <CheckCircle size={24} color={theme.colors.primary} fill="#E3F2FD" />
                                ) : (
                                    <Circle size={24} color="#EEEEEE" />
                                )}
                            </View>

                            {selectedMethod === 'qr' && method.id === 'qr' && (
                                <View style={styles.qrContainer}>
                                    <Image
                                        source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=foodiehub@upi&pn=FoodieHub&am=100.00' }}
                                        style={styles.qrImage}
                                    />
                                    <Text style={styles.qrText}>Scan to Pay</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.payBtn, isProcessing && styles.payBtnDisabled]}
                    onPress={handlePayment}
                    disabled={isProcessing}
                    activeOpacity={0.8}
                >
                    {isProcessing ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <>
                            <Text style={styles.payBtnText}>Pay ${parseFloat(total).toFixed(2)}</Text>
                            <View style={styles.payBtnIcon}>
                                <ArrowRight size={20} color={theme.colors.primary} />
                            </View>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // ... (existing styles) ...
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
    amountCard: {
        backgroundColor: theme.colors.secondary, // Black card
        borderRadius: 20,
        padding: 32,
        alignItems: 'center',
        marginBottom: 32,
        shadowColor: theme.colors.secondary,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    amountLabel: {
        fontFamily: theme.fonts.medium,
        color: '#AAAAAA',
        fontSize: 14,
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    amountValue: {
        fontFamily: theme.fonts.extraBold,
        color: '#FFFFFF', // White text
        fontSize: 42,
    },
    sectionTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        marginBottom: 16,
        color: theme.colors.text,
    },
    methodsContainer: {
        gap: 16,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    selectedMethodCard: {
        borderColor: theme.colors.primary,
        backgroundColor: '#FFF8E1', // Light yellow bg
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#FFFDE7',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    selectedIconBox: {
        backgroundColor: theme.colors.primary,
    },
    methodInfo: {
        flex: 1,
    },
    methodLabel: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4,
    },
    methodDesc: {
        fontFamily: theme.fonts.medium,
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        backgroundColor: '#FFFFFF',
    },
    payBtn: {
        backgroundColor: theme.colors.secondary, // Black button for contrast
        height: 64,
        borderRadius: 32, // Pill shape
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    payBtnDisabled: {
        opacity: 0.7,
        justifyContent: 'center',
    },
    payBtnText: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        color: '#FFFFFF',
    },
    payBtnIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 16,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    qrImage: {
        width: 150,
        height: 150,
        borderRadius: 12,
        marginBottom: 8,
    },
    qrText: {
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
        fontSize: 14,
    },
});
