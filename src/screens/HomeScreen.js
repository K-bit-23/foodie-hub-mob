import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    FlatList,
    Dimensions
} from 'react-native';
import { theme } from '../theme';
import { Search, MapPin, Bell, SlidersHorizontal, Star, Plus } from 'lucide-react-native';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const CATEGORIES = [
    { id: 1, name: 'Burger', icon: '🍔' },
    { id: 2, name: 'Pizza', icon: '🍕' },
    { id: 3, name: 'Sushi', icon: '🍣' },
    { id: 4, name: 'Noodles', icon: '🍜' },
    { id: 5, name: 'Dessert', icon: '🍰' },
];

const POPULAR_FOOD = [
    {
        id: 1,
        name: 'Classic Beef Burger',
        restaurant: 'Burger King',
        price: '$12.99',
        rating: 4.8,
        image: '🍔',
        bgColor: '#FFF3E0'
    },
    {
        id: 2,
        name: 'Pepperoni Pizza',
        restaurant: 'Pizza Hut',
        price: '$15.50',
        rating: 4.5,
        image: '🍕',
        bgColor: '#FCE4EC'
    },
    {
        id: 3,
        name: 'Salmon Sushi Roll',
        restaurant: 'Sushi Den',
        price: '$22.00',
        rating: 4.9,
        image: '🍣',
        bgColor: '#E8F5E9'
    }
];

export default function HomeScreen({ navigation }) {
    const [activeCategory, setActiveCategory] = useState(1);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <View style={styles.locationContainer}>
                            <MapPin size={16} color={theme.colors.primary} />
                            <Text style={styles.locationText}>New York, USA</Text>
                        </View>
                        <Text style={styles.greetingText}>Hello, <Text style={styles.userName}>Karthik!</Text></Text>
                    </View>
                    <TouchableOpacity style={styles.notificationBtn}>
                        <Bell size={24} color={theme.colors.text} />
                        <View style={styles.dot} />
                    </TouchableOpacity>
                </View>

                {/* Promo Card */}
                <Animated.View
                    entering={FadeInUp.delay(200).duration(800)}
                    style={styles.promoCard}
                >
                    <View style={styles.promoTextContainer}>
                        <Text style={styles.promoTitle}>Special Offer</Text>
                        <Text style={styles.promoDiscount}>30% OFF</Text>
                        <Text style={styles.promoSub}>on your first order!</Text>
                        <TouchableOpacity style={styles.promoBtn}>
                            <Text style={styles.promoBtnText}>Order Now</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.promoEmoji}>🥘</Text>
                </Animated.View>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputWrapper}>
                        <Search size={20} color={theme.colors.textSecondary} />
                        <TextInput
                            placeholder="Search for food, restaurants..."
                            style={styles.searchInput}
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterBtn}>
                        <SlidersHorizontal size={20} color={theme.colors.secondary} />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesList}>
                    {CATEGORIES.map((category, index) => (
                        <Animated.View
                            key={category.id}
                            entering={FadeInRight.delay(index * 100).duration(500)}
                        >
                            <TouchableOpacity
                                onPress={() => setActiveCategory(category.id)}
                                style={[
                                    styles.categoryCard,
                                    activeCategory === category.id && styles.activeCategoryCard
                                ]}
                            >
                                <Text style={styles.categoryIcon}>{category.icon}</Text>
                                <Text style={[
                                    styles.categoryName,
                                    activeCategory === category.id && styles.activeCategoryName
                                ]}>
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </ScrollView>

                {/* Popular Food */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Popular Food</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                </View>

                <View style={styles.popularContainer}>
                    {POPULAR_FOOD.map((item, index) => (
                        <Animated.View
                            key={item.id}
                            entering={FadeInUp.delay(400 + index * 100).duration(800)}
                        >
                            <TouchableOpacity
                                style={styles.foodCard}
                                onPress={() => navigation.navigate('FoodDetails', { item })}
                            >
                                <View style={[styles.foodImageContainer, { backgroundColor: item.bgColor }]}>
                                    <Text style={styles.foodEmoji}>{item.image}</Text>
                                    <View style={styles.ratingBadge}>
                                        <Star size={12} fill="#FFD700" color="#FFD700" />
                                        <Text style={styles.ratingText}>{item.rating}</Text>
                                    </View>
                                </View>
                                <View style={styles.foodInfo}>
                                    <Text style={styles.foodName}>{item.name}</Text>
                                    <Text style={styles.restaurantName}>{item.restaurant}</Text>
                                    <View style={styles.priceContainer}>
                                        <Text style={styles.foodPrice}>{item.price}</Text>
                                        <TouchableOpacity style={styles.addBtn}>
                                            <Plus size={20} color="#FFFFFF" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xxl,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    locationText: {
        fontFamily: theme.fonts.medium,
        fontSize: 14,
        color: theme.colors.textSecondary,
        marginLeft: 4,
    },
    greetingText: {
        fontFamily: theme.fonts.medium,
        fontSize: 18,
        color: theme.colors.textSecondary,
    },
    userName: {
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
    },
    notificationBtn: {
        width: 48,
        height: 48,
        backgroundColor: '#F5f5f5',
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        position: 'absolute',
        top: 14,
        right: 14,
        width: 8,
        height: 8,
        backgroundColor: theme.colors.primary,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    promoCard: {
        margin: theme.spacing.lg,
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.secondary,
        borderRadius: theme.borderRadius.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 160,
        elevation: 4,
    },
    promoTextContainer: {
        flex: 1,
    },
    promoTitle: {
        color: '#CCCCCC',
        fontFamily: theme.fonts.medium,
        fontSize: 14,
    },
    promoDiscount: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.extraBold,
        fontSize: 28,
        marginVertical: 4,
    },
    promoSub: {
        color: '#FFFFFF',
        fontFamily: theme.fonts.medium,
        fontSize: 16,
        marginBottom: 12,
    },
    promoBtn: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    promoBtnText: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.bold,
        fontSize: 12,
    },
    promoEmoji: {
        fontSize: 80,
    },
    searchContainer: {
        flexDirection: 'row',
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
        gap: 12,
    },
    searchInputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5f5f5',
        borderRadius: theme.borderRadius.md,
        paddingHorizontal: theme.spacing.md,
        height: 56,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontFamily: theme.fonts.regular,
        fontSize: 16,
    },
    filterBtn: {
        width: 56,
        height: 56,
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    sectionTitle: {
        fontFamily: theme.fonts.bold,
        fontSize: 20,
        color: theme.colors.text,
    },
    seeAll: {
        fontFamily: theme.fonts.medium,
        fontSize: 14,
        color: theme.colors.primary,
    },
    categoriesList: {
        paddingLeft: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    categoryCard: {
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#F5f5f5',
        borderRadius: theme.borderRadius.md,
        marginRight: 12,
        minWidth: 80,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeCategoryCard: {
        backgroundColor: theme.colors.yellowLight,
        borderColor: theme.colors.primary,
    },
    categoryIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    categoryName: {
        fontFamily: theme.fonts.medium,
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    activeCategoryName: {
        color: theme.colors.text,
        fontFamily: theme.fonts.bold,
    },
    popularContainer: {
        paddingHorizontal: theme.spacing.lg,
    },
    foodCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: theme.borderRadius.lg,
        padding: 12,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    foodImageContainer: {
        width: 100,
        height: 100,
        borderRadius: theme.borderRadius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
    foodEmoji: {
        fontSize: 40,
    },
    ratingBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    ratingText: {
        fontSize: 10,
        fontFamily: theme.fonts.bold,
        marginLeft: 2,
        color: theme.colors.text,
    },
    foodInfo: {
        flex: 1,
        marginLeft: 16,
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    foodName: {
        fontFamily: theme.fonts.bold,
        fontSize: 18,
        color: theme.colors.text,
    },
    restaurantName: {
        fontFamily: theme.fonts.regular,
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    foodPrice: {
        fontFamily: theme.fonts.extraBold,
        fontSize: 18,
        color: theme.colors.primary,
    },
    addBtn: {
        backgroundColor: theme.colors.secondary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
