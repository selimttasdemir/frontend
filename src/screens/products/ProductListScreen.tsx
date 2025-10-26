import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProductStore } from '../../store/productStore';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';
import { Product } from '../../types';

const { width } = Dimensions.get('window');
const isSmallDevice = width < 375;
const isWeb = Platform.OS === 'web';

export const ProductListScreen = ({ navigation }: any) => {
  const { products, isLoading, fetchProducts } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    await fetchProducts();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    await fetchProducts({ search: query });
  };

  const getStockColor = (stock: number, minStock: number) => {
    if (stock === 0) return COLORS.error;
    if (stock <= minStock) return COLORS.warning;
    return COLORS.success;
  };

  const getTotalStock = (product: Product) => {
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes.reduce((total, size) => total + size.stock, 0);
    }
    return product.stock;
  };

  const renderProduct = ({ item }: { item: Product }) => {
    const totalStock = getTotalStock(item);
    
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
        activeOpacity={0.7}
      >
        <Card>
          <View style={styles.productCard}>
            <View style={styles.productInfo}>
              <Text style={[styles.productName, isSmallDevice && styles.productNameSmall]}>
                {item.name}
              </Text>
              
              <View style={styles.productMeta}>
                <View style={styles.categoryBadge}>
                  <MaterialCommunityIcons 
                    name="tag" 
                    size={14} 
                    color={COLORS.primary} 
                  />
                  <Text style={styles.categoryText}>
                    {typeof item.category === 'string' ? item.category : item.category.name}
                  </Text>
                </View>
                
                {item.brand && (
                  <Text style={styles.brandText}>• {item.brand}</Text>
                )}
              </View>

              {/* Beden ve renk bilgisi */}
              {item.sizes && item.sizes.length > 0 && (
                <View style={styles.sizesContainer}>
                  <Text style={styles.sizeLabel}>Bedenler: </Text>
                  <Text style={styles.sizeList}>
                    {item.sizes.map(s => s.size).join(', ')}
                  </Text>
                </View>
              )}

              {item.colors && item.colors.length > 0 && (
                <View style={styles.colorsContainer}>
                  {item.colors.slice(0, 3).map((color, index) => (
                    <View
                      key={index}
                      style={[
                        styles.colorDot,
                        { backgroundColor: color.hexCode || COLORS.textSecondary }
                      ]}
                    />
                  ))}
                  {item.colors.length > 3 && (
                    <Text style={styles.moreColors}>+{item.colors.length - 3}</Text>
                  )}
                </View>
              )}
              
              <Text style={[styles.productPrice, isSmallDevice && styles.productPriceSmall]}>
                ₺{item.salePrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            
            <View style={styles.productRight}>
              <View style={[
                styles.stockBadge,
                { backgroundColor: `${getStockColor(totalStock, item.minStock)}20` }
              ]}>
                <MaterialCommunityIcons
                  name="hanger"
                  size={isSmallDevice ? 14 : 16}
                  color={getStockColor(totalStock, item.minStock)}
                />
                <Text style={[
                  styles.stockText,
                  isSmallDevice && styles.stockTextSmall,
                  { color: getStockColor(totalStock, item.minStock) }
                ]}>
                  {totalStock}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <Input
          placeholder="Ürün ara..."
          value={searchQuery}
          onChangeText={handleSearch}
          leftIcon="magnify"
          containerStyle={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddProduct')}
        >
          <MaterialCommunityIcons name="plus" size={24} color={COLORS.surface} />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="hanger" size={64} color={COLORS.textSecondary} />
            <Text style={styles.emptyText}>Ürün bulunamadı</Text>
            <Button
              title="İlk Ürünü Ekle"
              onPress={() => navigation.navigate('AddProduct')}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    padding: SPACING.md,
    gap: SPACING.sm,
    backgroundColor: COLORS.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginBottom: 0,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: SPACING.md,
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  productInfo: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  productName: {
    fontSize: isSmallDevice ? FONT_SIZES.md : FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 6,
  },
  productNameSmall: {
    fontSize: FONT_SIZES.md,
  },
  productMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${COLORS.primary}10`,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BORDER_RADIUS.sm,
    marginRight: 6,
  },
  categoryText: {
    fontSize: isSmallDevice ? 11 : FONT_SIZES.xs,
    color: COLORS.primary,
    marginLeft: 3,
    fontWeight: '500',
  },
  brandText: {
    fontSize: isSmallDevice ? 11 : FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  sizesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sizeLabel: {
    fontSize: isSmallDevice ? 11 : FONT_SIZES.xs,
    color: COLORS.textSecondary,
  },
  sizeList: {
    fontSize: isSmallDevice ? 11 : FONT_SIZES.xs,
    color: COLORS.text,
    fontWeight: '500',
  },
  colorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  moreColors: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginLeft: 2,
  },
  productPrice: {
    fontSize: isSmallDevice ? FONT_SIZES.lg : FONT_SIZES.xl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  productPriceSmall: {
    fontSize: FONT_SIZES.lg,
  },
  productRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  stockBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    minWidth: 50,
    justifyContent: 'center',
  },
  stockText: {
    fontSize: isSmallDevice ? 12 : FONT_SIZES.sm,
    fontWeight: '600',
  },
  stockTextSmall: {
    fontSize: 11,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xxl * 2,
  },
  emptyText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
    marginVertical: SPACING.lg,
  },
});
