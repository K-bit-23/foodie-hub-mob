import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import { Home, Heart, ShoppingBag, User } from 'lucide-react-native';
import { theme } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: '#CCCCCC',
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={focused ? styles.activeTab : null}>
                            <Home size={size} color={focused ? '#FFFFFF' : color} strokeWidth={focused ? 3 : 2} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={focused ? styles.activeTab : null}>
                            <Heart size={size} color={focused ? '#FFFFFF' : color} strokeWidth={focused ? 3 : 2} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={[styles.activeTabWrapper, focused ? styles.activeTab : null]}>
                            <ShoppingBag size={size} color={focused ? '#FFFFFF' : color} strokeWidth={focused ? 3 : 2} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={focused ? styles.activeTab : null}>
                            <User size={size} color={focused ? '#FFFFFF' : color} strokeWidth={focused ? 3 : 2} />
                        </View>
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        height: Platform.OS === 'ios' ? 90 : 70,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderTopWidth: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        position: 'absolute',
        bottom: 0,
        paddingHorizontal: 10,
    },
    activeTab: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 30,
        elevation: 5,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    }
});
