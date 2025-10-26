import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductListScreen } from '../screens/products/ProductListScreen';
import { ProductDetailScreen } from '../screens/products/ProductDetailScreen';
import { AddProductScreen } from '../screens/products/AddProductScreen';
import { EditProductScreen } from '../screens/products/EditProductScreen';
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
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{ title: 'Ürün Detayı' }}
      />
      <Stack.Screen 
        name="AddProduct" 
        component={AddProductScreen}
        options={{ title: 'Yeni Ürün Ekle' }}
      />
      <Stack.Screen 
        name="EditProduct" 
        component={EditProductScreen}
        options={{ title: 'Ürün Düzenle' }}
      />
    </Stack.Navigator>
  );
};
