import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductListScreen } from '../screens/products/ProductListScreen';
import { COLORS, FONT_SIZES } from '../constants';

const Stack = createStackNavigator();

export const ProductNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.surface,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: FONT_SIZES.lg,
        },
      }}
    >
      <Stack.Screen 
        name="ProductList" 
        component={ProductListScreen}
        options={{ title: 'Ürünler' }}
      />
    </Stack.Navigator>
  );
};
