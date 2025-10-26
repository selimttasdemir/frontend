import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProductStore } from '../../store/productStore';
import { useSaleStore } from '../../store/saleStore';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS, TAX_RATE } from '../../constants';
import { Product } from '../../types';

export const NewSaleScreen = ({ navigation }: any) => {
  const { products, fetchProducts } = useProductStore();
  const {
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    getCartSubtotal,
    getCartTax,
    getCartTotal,
    createSale,
    isLoading,
  } = useSaleStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('nakit');

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (product: Product) => {
    addToCart(product, 1);
  };

  const handleQuantityChange = (productId: string, change: number) => {
    const item = cart.find((i) => i.product.id === productId);
    if (item) {
      updateCartItem(productId, item.quantity + change);
    }
  };

  const handleCompleteSale = async () => {
    if (cart.length === 0) {
      Alert.alert('Hata', 'Sepetiniz boş');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    try {
      await createSale(selectedPayment);
      setShowPaymentModal(false);
      Alert.alert('Başarılı', 'Satış tamamlandı', [
        { text: 'Tamam', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Satış oluşturulamadı');
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.barcode.includes(searchQuery)
  );

  const renderCartItem = ({ item }: any) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.product.name}</Text>
        <Text style={styles.cartItemPrice}>₺{item.unitPrice.toFixed(2)}</Text>
      </View>
      
      <View style={styles.quantityControl}>
        <TouchableOpacity
          onPress={() => handleQuantityChange(item.product.id, -1)}
          style={styles.quantityButton}
        >
          <MaterialCommunityIcons name="minus" size={20} color={COLORS.error} />
        </TouchableOpacity>
        
        <Text style={styles.quantityText}>{item.quantity}</Text>
        
        <TouchableOpacity
          onPress={() => handleQuantityChange(item.product.id, 1)}
          style={styles.quantityButton}
        >
          <MaterialCommunityIcons name="plus" size={20} color={COLORS.success} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cartItemRight}>
        <Text style={styles.cartItemTotal}>₺{item.total.toFixed(2)}</Text>
        <TouchableOpacity onPress={() => removeFromCart(item.product.id)}>
          <MaterialCommunityIcons name="delete" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => handleAddProduct(item)}
      style={styles.productItem}
    >
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₺{item.salePrice.toFixed(2)}</Text>
      </View>
      <View style={styles.productStock}>
        <Text style={styles.stockText}>{item.stock} {item.unit}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Product Search */}
      <View style={styles.searchSection}>
        <Input
          placeholder="Ürün ara veya barkod okut..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon="magnify"
          rightIcon="barcode-scan"
          containerStyle={{ marginBottom: 0 }}
        />
        
        <View style={styles.productList}>
          {searchQuery.length > 0 && (
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              style={styles.suggestions}
            />
          )}
        </View>
      </View>

      {/* Cart */}
      <View style={styles.cartSection}>
        <Card title={`Sepet (${cart.length} ürün)`}>
          {cart.length === 0 ? (
            <View style={styles.emptyCart}>
              <MaterialCommunityIcons name="cart-outline" size={48} color={COLORS.textSecondary} />
              <Text style={styles.emptyText}>Sepetiniz boş</Text>
            </View>
          ) : (
            <FlatList
              data={cart}
              renderItem={renderCartItem}
              keyExtractor={(item) => item.product.id}
              style={styles.cartList}
            />
          )}
        </Card>
      </View>

      {/* Total & Checkout */}
      <View style={styles.footer}>
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Ara Toplam:</Text>
            <Text style={styles.totalValue}>₺{getCartSubtotal().toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>KDV (%18):</Text>
            <Text style={styles.totalValue}>₺{getCartTax().toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.grandTotal}>TOPLAM:</Text>
            <Text style={styles.grandTotalValue}>₺{getCartTotal().toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <Button
            title="Sepeti Temizle"
            onPress={clearCart}
            variant="outline"
            style={{ flex: 1 }}
          />
          <Button
            title="Satışı Tamamla"
            onPress={handleCompleteSale}
            style={{ flex: 2 }}
            disabled={cart.length === 0}
          />
        </View>
      </View>

      {/* Payment Modal */}
      <Modal
        visible={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Ödeme Yöntemi"
      >
        <View style={styles.paymentMethods}>
          {['nakit', 'kart', 'veresiye'].map((method) => (
            <TouchableOpacity
              key={method}
              onPress={() => setSelectedPayment(method)}
              style={[
                styles.paymentOption,
                selectedPayment === method && styles.paymentSelected,
              ]}
            >
              <MaterialCommunityIcons
                name={method === 'nakit' ? 'cash' : method === 'kart' ? 'credit-card' : 'calendar-clock'}
                size={32}
                color={selectedPayment === method ? COLORS.primary : COLORS.textSecondary}
              />
              <Text style={styles.paymentText}>
                {method === 'nakit' ? 'Nakit' : method === 'kart' ? 'Kart' : 'Veresiye'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.modalFooter}>
          <Text style={styles.modalTotal}>Toplam: ₺{getCartTotal().toFixed(2)}</Text>
          <Button
            title="Ödemeyi Tamamla"
            onPress={handlePayment}
            loading={isLoading}
            fullWidth
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchSection: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  productList: {
    maxHeight: 200,
  },
  suggestions: {
    marginTop: SPACING.sm,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
    marginBottom: SPACING.xs,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  productPrice: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    marginTop: 2,
  },
  productStock: {
    justifyContent: 'center',
  },
  stockText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  cartSection: {
    flex: 1,
    padding: SPACING.md,
  },
  cartList: {
    maxHeight: 300,
  },
  emptyCart: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  emptyText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    marginTop: SPACING.sm,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
    color: COLORS.text,
  },
  cartItemPrice: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginHorizontal: SPACING.md,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  cartItemRight: {
    alignItems: 'flex-end',
    gap: SPACING.xs,
  },
  cartItemTotal: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footer: {
    backgroundColor: COLORS.surface,
    padding: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  totalSection: {
    marginBottom: SPACING.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  totalLabel: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  totalValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
  },
  grandTotal: {
    fontSize: FONT_SIZES.lg,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  grandTotalValue: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  paymentOption: {
    flex: 1,
    padding: SPACING.lg,
    borderRadius: BORDER_RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.border,
    alignItems: 'center',
    gap: SPACING.sm,
  },
  paymentSelected: {
    borderColor: COLORS.primary,
    backgroundColor: `${COLORS.primary}10`,
  },
  paymentText: {
    fontSize: FONT_SIZES.md,
    fontWeight: '500',
  },
  modalFooter: {
    gap: SPACING.md,
  },
  modalTotal: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
  },
});
