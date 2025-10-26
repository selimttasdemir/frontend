import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NewSaleScreen } from '../screens/sales/NewSaleScreen';
import { BarcodeScannerScreen } from '../screens/products/BarcodeScannerScreen';
import { COLORS, FONT_SIZES } from '../constants';

const Stack = createStackNavigator();

export const SalesNavigator = () => {
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
        name="NewSale" 
        component={NewSaleScreen}
        options={{ title: 'Yeni Satış' }}
      />
      <Stack.Screen 
        name="BarcodeScanner" 
        component={BarcodeScannerScreen}
        options={{ 
          title: 'Barkod Tara',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
