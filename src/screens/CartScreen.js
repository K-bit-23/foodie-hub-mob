import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, StatusBar } from 'react-native';

import { theme } from '../theme';
import { ChevronLeft, Minus, Plus, Trash2, ArrowRight, CreditCard } from 'lucide-react-native';

const INITIAL_CART = [
    {
        id: 1,
        name: 'Classic Beef Burger',
        restaurant: 'Burger King',
        price: 12.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Pepperoni Pizza',
        restaurant: 'Pizza Hut',
        price: 15.50,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Salmon Sushi Roll',
        restaurant: 'Sushi Den',
        price: 22.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
    }
];

export default function CartScreen({ navigation }) {
    const [cartItems, setCartItems] = useState(INITIAL_CART);

    const updateQuantity = (id, change) => {
        setCartItems(items => items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(0, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 2.50;
    const total = subtotal + deliveryFee;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Cart</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Payment', { total: total })}
                    style={styles.backBtn}
                >
                    <CreditCard size={20} color={theme.colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Cart Items */}
                {cartItems.map((item) => (
                    <View key={item.id} style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemRestaurant}>{item.restaurant}</Text>
                            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.quantityControls}>
                            <TouchableOpacity
                                style={styles.qtyBtn}
                                onPress={() => updateQuantity(item.id, -1)}
                            >
                                <Minus size={16} color={theme.colors.text} />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{item.quantity}</Text>
                            <TouchableOpacity
                                style={[styles.qtyBtn, styles.qtyBtnAdd]}
                                onPress={() => updateQuantity(item.id, 1)}
                            >
                                <Plus size={16} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* Bill Details */}
                <View style={styles.billSection}>
                    <Text style={styles.sectionTitle}>Bill Details</Text>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Subtotal</Text>
                        <Text style={styles.billValue}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.billRow}>
                        <Text style={styles.billLabel}>Delivery Fee</Text>
                        <Text style={styles.billValue}>${deliveryFee.toFixed(2)}</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.billRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                    </View>
                </View>
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
        justifyContent: 'space-between',
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
    },
    scrollContent: {
        padding: 24,
        paddingBottom: 100,
    },
    cartItem: {
        flexDirection: 'row',
        marginBottom: 24,
        alignItems: 'center',
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 16,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 16,
    },
    itemName: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4,
    },
    itemRestaurant: {
        fontFamily: theme.fonts.medium,
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    itemPrice: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.primary,
    },
    quantityControls: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 80,
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyBtnAdd: {
        backgroundColor: theme.colors.primary,
    },
    qtyText: {
        fontFamily: theme.fonts.bold,
        fontSize: 14,
        marginVertical: 4,
    },
    billSection: {
        marginTop: 24,
        backgroundColor: '#F9F9F9',
        borderRadius: 16,
        padding: 20,
    },
    sectionTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        marginBottom: 16,
    },
    billRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    billLabel: {
        fontFamily: theme.fonts.medium,
        color: theme.colors.textSecondary,
        fontSize: 14,
    },
    billValue: {
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
        fontSize: 14,
    },
    divider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 12,
    },
    totalLabel: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        color: theme.colors.text,
    },
    totalValue: {
        fontFamily: theme.fonts.extraBold,
        fontSize: 18,
        color: theme.colors.primary,
    },
    footer: {
        padding: 24,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        backgroundColor: '#FFFFFF',
    },
    checkoutBtn: {
        backgroundColor: theme.colors.secondary, // Black button for contrast
        height: 64,
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 8,
    },
    checkoutText: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        color: '#FFFFFF',
    },
    checkoutIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
