import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { theme } from '../theme';
import { ChevronLeft, Star, Heart } from 'lucide-react-native';

const FAVORITES = [
    {
        id: 1,
        name: 'Classic Beef Burger',
        restaurant: 'Burger King',
        price: '$12.99',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
        bgColor: '#FFF3E0'
    },
    {
        id: 3,
        name: 'Salmon Sushi Roll',
        restaurant: 'Sushi Den',
        price: '$22.00',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
        bgColor: '#E8F5E9'
    }
];

export default function FavoritesScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft size={24} color={theme.colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Favorites</Text>
            </View>

            <FlatList
                data={FAVORITES}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('FoodDetails', { item })}
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.restaurant}>{item.restaurant}</Text>
                            <View style={styles.ratingRow}>
                                <Star size={14} fill="#FFD700" color="#FFD700" />
                                <Text style={styles.rating}>{item.rating}</Text>
                            </View>
                            <Text style={styles.price}>{item.price}</Text>
                        </View>
                        <TouchableOpacity style={styles.heartBtn}>
                            <Heart size={20} fill="#FF4081" color="#FF4081" />
                        </TouchableOpacity>
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
    listContent: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        padding: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 12,
    },
    info: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4,
    },
    restaurant: {
        fontFamily: theme.fonts.regular,
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    rating: {
        fontFamily: theme.fonts.bold,
        fontSize: 12,
        color: theme.colors.text,
        marginLeft: 4,
    },
    price: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.primary,
    },
    heartBtn: {
        padding: 8,
    }
});
