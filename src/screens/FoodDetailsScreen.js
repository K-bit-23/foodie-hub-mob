import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image,
    Platform,
    StatusBar
} from 'react-native';
import { theme } from '../theme';
import { ChevronLeft, Heart, Star, Clock, Flame, Minus, Plus } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function FoodDetailsScreen({ route, navigation }) {
    const { item } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* Header */}
                <View style={[styles.header, { backgroundColor: item.bgColor }]}>
                    <View style={styles.navBar}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.iconBtn}
                        >
                            <ChevronLeft size={24} color={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setIsFavorite(!isFavorite)}
                            style={styles.iconBtn}
                        >
                            <Heart
                                size={24}
                                color={isFavorite ? '#FF4081' : theme.colors.text}
                                fill={isFavorite ? '#FF4081' : 'transparent'}
                            />
                        </TouchableOpacity>
                    </View>

                    <Animated.View
                        entering={ZoomIn.delay(300).duration(800)}
                        style={styles.imageContainer}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={styles.detailsImage}
                            resizeMode="cover"
                        />
                    </Animated.View>
                </View>

                {/* Content */}
                <View style={styles.content}>
                    <Animated.View entering={FadeInUp.delay(500).duration(800)}>
                        <View style={styles.titleRow}>
                            <Text style={styles.title}>{item.name}</Text>
                            <View style={styles.ratingRow}>
                                <Star size={16} fill="#FFD700" color="#FFD700" />
                                <Text style={styles.ratingText}>{item.rating}</Text>
                            </View>
                        </View>
                        <Text style={styles.restaurant}>{item.restaurant}</Text>

                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <View style={[styles.statIcon, { backgroundColor: '#E3F2FD' }]}>
                                    <Clock size={16} color="#2196F3" />
                                </View>
                                <Text style={styles.statText}>20-30 min</Text>
                            </View>
                            <View style={styles.statItem}>
                                <View style={[styles.statIcon, { backgroundColor: '#FBE9E7' }]}>
                                    <Flame size={16} color="#FF5722" />
                                </View>
                                <Text style={styles.statText}>450 kcal</Text>
                            </View>
                            <View style={styles.statItem}>
                                <View style={[styles.statIcon, { backgroundColor: '#E8F5E9' }]}>
                                    <Star size={16} color="#4CAF50" />
                                </View>
                                <Text style={styles.statText}>Popular</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>
                            Our {item.name} is made with premium ingredients, following an authentic recipe that ensures a burst of flavor in every bite. Perfectly cooked and seasoned with our special blend of spices.
                        </Text>

                        <Text style={styles.sectionTitle}>Customize your order</Text>
                        <View style={styles.customContainer}>
                            {['Extra Cheese', 'No Onions', 'More Sauce'].map((opt, i) => (
                                <TouchableOpacity key={i} style={styles.optChip}>
                                    <Text style={styles.optText}>{opt}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>

            {/* Footer / Add to Cart */}
            <Animated.View
                entering={FadeInDown.delay(800).duration(800)}
                style={styles.footer}
            >
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => quantity > 1 && setQuantity(quantity - 1)}
                        style={styles.qtyBtn}
                    >
                        <Minus size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{quantity}</Text>
                    <TouchableOpacity
                        onPress={() => setQuantity(quantity + 1)}
                        style={styles.qtyBtn}
                    >
                        <Plus size={20} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.addToCartBtn}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                    <Text style={styles.price}>${(item.price ? parseFloat(item.price.replace('$', '')) : 12.00).toFixed(2)}</Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: height * 0.4,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 10,
    },
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    iconBtn: {
        width: 44,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    detailsImage: {
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 2,
        borderColor: '#FFF',
    },
    content: {
        padding: 24,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontFamily: theme.fonts.extraBold,
        color: theme.colors.text,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.yellowLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: 14,
        fontFamily: theme.fonts.bold,
        marginLeft: 4,
        color: theme.colors.text,
    },
    restaurant: {
        fontSize: 16,
        fontFamily: theme.fonts.medium,
        color: theme.colors.textSecondary,
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        marginVertical: 24,
        justifyContent: 'space-between',
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statIcon: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    statText: {
        fontSize: 13,
        fontFamily: theme.fonts.bold,
        color: theme.colors.textSecondary,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        color: theme.colors.text,
        marginBottom: 12,
        marginTop: 8,
    },
    description: {
        fontSize: 15,
        fontFamily: theme.fonts.regular,
        color: theme.colors.textSecondary,
        lineHeight: 24,
        marginBottom: 24,
    },
    customContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 100,
    },
    optChip: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    optText: {
        fontSize: 14,
        fontFamily: theme.fonts.medium,
        color: theme.colors.text,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 24,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        padding: 4,
    },
    qtyBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        fontSize: 18,
        fontFamily: theme.fonts.bold,
        marginHorizontal: 16,
        color: theme.colors.text,
    },
    addToCartBtn: {
        flex: 1,
        backgroundColor: theme.colors.primary,
        borderRadius: 20,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginLeft: 16,
    },
    addToCartText: {
        fontFamily: theme.fonts.bold,
        fontSize: 16,
        color: theme.colors.secondary,
    },
    price: {
        fontFamily: theme.fonts.extraBold,
        fontSize: 18,
        color: theme.colors.secondary,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
});
