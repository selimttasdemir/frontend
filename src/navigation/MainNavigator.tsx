import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DashboardScreen } from '../screens/dashboard/DashboardScreen';
import { ProductNavigator } from './ProductNavigator';
import { SalesNavigator } from './SalesNavigator';
import { COLORS, FONT_SIZES } from '../constants';

const Tab = createBottomTabNavigator();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.surface,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: FONT_SIZES.lg,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: FONT_SIZES.sm,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Ana Sayfa',
          tabBarLabel: 'Ana Sayfa',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Products"
        component={ProductNavigator}
        options={{
          headerShown: false,
          title: 'Ürünler',
          tabBarLabel: 'Ürünler',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="package-variant" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Sales"
        component={SalesNavigator}
        options={{
          headerShown: false,
          title: 'Satış',
          tabBarLabel: 'Satış',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Reports"
        component={DashboardScreen}
        options={{
          title: 'Raporlar',
          tabBarLabel: 'Raporlar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-line" size={size} color={color} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Settings"
        component={DashboardScreen}
        options={{
          title: 'Ayarlar',
          tabBarLabel: 'Ayarlar',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
