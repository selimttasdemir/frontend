import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProductStore } from '../../store/productStore';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';
import { Product } from '../../types';

export const ProductDetailScreen = ({ route, navigation }: any) => {
  const { productId } = route.params;
  const { products, deleteProduct, isLoading } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [productId, products]);

  const handleDelete = () => {
    Alert.alert(
      'Ürünü Sil',
      'Bu ürünü silmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        {
          text: 'Sil',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(productId);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Hata', 'Ürün silinirken bir hata oluştu');
            }
          },
        },
      ]
    );
  };

  const handleEdit = () => {
    navigation.navigate('EditProduct', { productId });
  };

  const getTotalStock = () => {
    if (!product) return 0;
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes.reduce((total, size) => total + size.stock, 0);
    }
    return product.stock;
  };

  const getStockColor = () => {
    if (!product) return COLORS.textSecondary;
    const totalStock = getTotalStock();
    if (totalStock === 0) return COLORS.error;
    if (totalStock <= product.minStock) return COLORS.warning;
    return COLORS.success;
  };

  if (isLoading || !product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Ürün Görseli */}
        {product.image && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: product.image }} style={styles.image} />
          </View>
        )}

        {/* Temel Bilgiler */}
        <Card>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.barcode}>Barkod: {product.barcode}</Text>
          
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabel}>Satış Fiyatı</Text>
              <Text style={styles.salePrice}>
                ₺{product.salePrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            <View>
              <Text style={styles.priceLabel}>Alış Fiyatı</Text>
              <Text style={styles.purchasePrice}>
                ₺{product.purchasePrice.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="tag" size={20} color={COLORS.primary} />
            <Text style={styles.infoText}>
              {typeof product.category === 'string' ? product.category : product.category.name}
            </Text>
          </View>

          {product.brand && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="alpha-b-circle" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>{product.brand}</Text>
            </View>
          )}

          {product.supplier && (
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="truck" size={20} color={COLORS.primary} />
              <Text style={styles.infoText}>
                {typeof product.supplier === 'string' ? product.supplier : product.supplier.name}
              </Text>
            </View>
          )}
        </Card>

        {/* Stok Bilgisi */}
        <Card>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="package-variant" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Stok Durumu</Text>
          </View>

          <View style={styles.stockInfo}>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>Toplam Stok</Text>
              <Text style={[styles.stockValue, { color: getStockColor() }]}>
                {getTotalStock()} {product.unit}
              </Text>
            </View>
            <View style={styles.stockItem}>
              <Text style={styles.stockLabel}>Minimum Stok</Text>
              <Text style={styles.stockValue}>
                {product.minStock} {product.unit}
              </Text>
            </View>
          </View>

          {/* Bedenler */}
          {product.sizes && product.sizes.length > 0 && (
            <View style={styles.sizesSection}>
              <Text style={styles.subsectionTitle}>Bedenler</Text>
              <View style={styles.sizesGrid}>
                {product.sizes.map((size, index) => (
                  <View key={index} style={styles.sizeCard}>
                    <Text style={styles.sizeName}>{size.size}</Text>
                    <Text style={styles.sizeStock}>{size.stock} adet</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Renkler */}
          {product.colors && product.colors.length > 0 && (
            <View style={styles.colorsSection}>
              <Text style={styles.subsectionTitle}>Renkler</Text>
              <View style={styles.colorsGrid}>
                {product.colors.map((color, index) => (
                  <View key={index} style={styles.colorCard}>
                    <View
                      style={[
                        styles.colorCircle,
                        { backgroundColor: color.hexCode || COLORS.textSecondary }
                      ]}
                    />
                    <Text style={styles.colorName}>{color.name}</Text>
                    <Text style={styles.colorStock}>{color.stock} adet</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Card>

        {/* Ürün Detayları */}
        <Card>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="information" size={24} color={COLORS.primary} />
            <Text style={styles.sectionTitle}>Ürün Detayları</Text>
          </View>

          {product.material && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Kumaş:</Text>
              <Text style={styles.detailValue}>{product.material}</Text>
            </View>
          )}

          {product.season && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sezon:</Text>
              <Text style={styles.detailValue}>{product.season}</Text>
            </View>
          )}

          {product.pattern && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Desen:</Text>
              <Text style={styles.detailValue}>{product.pattern}</Text>
            </View>
          )}

          {product.shelfLocation && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Raf Konumu:</Text>
              <Text style={styles.detailValue}>{product.shelfLocation}</Text>
            </View>
          )}

          {product.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.detailLabel}>Açıklama:</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          )}

          {product.careInstructions && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.detailLabel}>Bakım Talimatları:</Text>
              <Text style={styles.description}>{product.careInstructions}</Text>
            </View>
          )}
        </Card>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <Button
          title="Düzenle"
          onPress={handleEdit}
          icon="pencil"
          variant="secondary"
          style={styles.editButton}
        />
        <Button
          title="Sil"
          onPress={handleDelete}
          icon="delete"
          variant="danger"
          style={styles.deleteButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: COLORS.surface,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productName: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  barcode: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  priceLabel: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  salePrice: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: '700',
    color: COLORS.primary,
  },
  purchasePrice: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  infoText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginLeft: SPACING.sm,
  },
  stockInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.md,
  },
  stockItem: {
    alignItems: 'center',
  },
  stockLabel: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  stockValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  sizesSection: {
    marginTop: SPACING.md,
  },
  subsectionTitle: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  sizesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  sizeCard: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    minWidth: 60,
  },
  sizeName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  sizeStock: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  colorsSection: {
    marginTop: SPACING.md,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  colorCard: {
    backgroundColor: COLORS.background,
    padding: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    minWidth: 80,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 4,
  },
  colorName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
  },
  colorStock: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  detailLabel: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  detailValue: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
  },
  descriptionContainer: {
    marginTop: SPACING.sm,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: SPACING.md,
    gap: SPACING.sm,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  editButton: {
    flex: 1,
  },
  deleteButton: {
    flex: 1,
  },
});
