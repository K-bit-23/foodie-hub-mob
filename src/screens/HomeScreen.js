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
    Dimensions,
    ActivityIndicator
} from 'react-native';
import * as Location from 'expo-location';
import { theme } from '../theme';
import { Search, MapPin, Bell, SlidersHorizontal, Star, Plus } from 'lucide-react-native';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const CATEGORIES = [
    { id: 1, name: 'Burger', image: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png' },
    { id: 2, name: 'Pizza', image: 'https://cdn-icons-png.flaticon.com/512/1404/1404945.png' },
    { id: 3, name: 'Sushi', image: 'https://cdn-icons-png.flaticon.com/512/2252/2252075.png' },
    { id: 4, name: 'Noodles', image: 'https://cdn-icons-png.flaticon.com/512/3041/3041130.png' },
    { id: 5, name: 'Dessert', image: 'https://cdn-icons-png.flaticon.com/512/4459/4459972.png' },
];

const RESTAURANTS = [
    {
        id: 1,
        name: 'Ambur Star Biryani',
        address: 'Anna Nagar, Chennai',
        distance: '2.5 km',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 2,
        name: 'Barbeque Nation',
        address: 'T. Nagar, Chennai',
        distance: '4.0 km',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1544025162-d76690b67f11?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 3,
        name: 'Saravana Bhavan',
        address: 'Vadapalani, Chennai',
        distance: '1.2 km',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1593560708920-63984dc77432?q=80&w=800&auto=format&fit=crop',
    }
];

const POPULAR_FOOD = [
    {
        id: 1,
        name: 'Chicken Biryani',
        restaurant: 'Ambur Star Biryani',
        price: '$8.50',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop',
        bgColor: '#FFF3E0'
    },
    {
        id: 2,
        name: 'Grilled Prawns',
        restaurant: 'Barbeque Nation',
        price: '$12.00',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop', // Keeping pizza image for variety or switch? Let's use a grill image.
        bgColor: '#FCE4EC'
    },
    {
        id: 3,
        name: 'Mini Tiffin',
        restaurant: 'Saravana Bhavan',
        price: '$5.00',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop', // Pizza image replace
        bgColor: '#E8F5E9'
    }
];

export default function HomeScreen({ navigation }) {
    const [activeCategory, setActiveCategory] = useState(1);
    const [displayAddress, setDisplayAddress] = useState('Locating...');

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setDisplayAddress('Permission Denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            let address = await Location.reverseGeocodeAsync(location.coords);
            console.log(address);

            if (address.length > 0) {
                const currentAddress = address[0];
                setDisplayAddress(`${currentAddress.city || currentAddress.district || 'Unknown'}, ${currentAddress.region || currentAddress.country || ''}`);
            }
        })();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <View style={styles.locationContainer}>
                            <MapPin size={16} color={theme.colors.primary} />
                            <Text style={styles.locationText}>{displayAddress}</Text>
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
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=400&auto=format&fit=crop' }}
                        style={styles.promoImage}
                    />
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
                                <Image source={{ uri: category.image }} style={styles.categoryImage} />
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

                {/* Featured Restaurants */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured Restaurants</Text>
                    <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.restaurantList}>
                    {RESTAURANTS.map((item, index) => (
                        <Animated.View
                            key={item.id}
                            entering={FadeInRight.delay(index * 200).duration(600)}
                        >
                            <TouchableOpacity style={styles.restaurantCard} activeOpacity={0.8}>
                                <Image source={{ uri: item.image }} style={styles.restaurantImage} />
                                <View style={styles.restaurantInfo}>
                                    <Text style={styles.restaurantName}>{item.name}</Text>
                                    <View style={styles.row}>
                                        <MapPin size={12} color={theme.colors.textSecondary} />
                                        <Text style={styles.restaurantAddress}>{item.address}</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <Text style={styles.distanceBadge}>{item.distance}</Text>
                                        <View style={styles.ratingBadgeSm}>
                                            <Star size={10} fill="#FFD700" color="#FFD700" />
                                            <Text style={styles.ratingTextSm}>{item.rating}</Text>
                                        </View>
                                    </View>
                                </View>
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
                                    <Image source={{ uri: item.image }} style={styles.foodImage} />
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
    promoImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
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
    categoryImage: {
        width: 40,
        height: 40,
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
    foodImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
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
    },
    restaurantList: {
        paddingLeft: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
    },
    restaurantCard: {
        width: 200,
        backgroundColor: '#FFFFFF',
        borderRadius: theme.borderRadius.lg,
        marginRight: 16,
        padding: 5, // Small padding for inner content
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    restaurantImage: {
        width: '100%',
        height: 120,
        borderRadius: theme.borderRadius.lg,
    },
    restaurantInfo: {
        padding: 10,
    },
    restaurantName: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
        gap: 4,
    },
    restaurantAddress: {
        fontFamily: theme.fonts.regular,
        fontSize: 12,
        color: theme.colors.textSecondary,
        flex: 1,
    },
    distanceBadge: {
        backgroundColor: '#E3F2FD',
        color: '#2196F3',
        fontSize: 10,
        fontFamily: theme.fonts.medium,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingBadgeSm: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        backgroundColor: '#FFFDE7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    ratingTextSm: {
        fontSize: 10,
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
    },
});
