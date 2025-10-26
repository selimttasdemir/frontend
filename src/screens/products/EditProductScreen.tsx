import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProductStore } from '../../store/productStore';
import { useSupplierStore } from '../../store/supplierStore';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';
import { ProductUnit, Season, ClothingSize, ClothingColor, Product } from '../../types';

export const EditProductScreen = ({ route, navigation }: any) => {
  const { productId } = route.params;
  const { products, updateProduct, isLoading } = useProductStore();
  const { suppliers, fetchSuppliers } = useSupplierStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [barcode, setBarcode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('');
  const [unit, setUnit] = useState<ProductUnit>(ProductUnit.PIECE);
  const [shelfLocation, setShelfLocation] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const [brand, setBrand] = useState('');
  const [material, setMaterial] = useState('');
  const [season, setSeason] = useState<Season | ''>('');
  const [pattern, setPattern] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  const [sizes, setSizes] = useState<ClothingSize[]>([]);
  const [colors, setColors] = useState<ClothingColor[]>([]);

  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [newSize, setNewSize] = useState('');
  const [newSizeStock, setNewSizeStock] = useState('');
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('');
  const [newColorStock, setNewColorStock] = useState('');

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      loadProductData(foundProduct);
    }
    fetchSuppliers();
  }, [productId, products]);

  const loadProductData = (p: Product) => {
    setBarcode(p.barcode);
    setName(p.name);
    setCategory(typeof p.category === 'string' ? p.category : p.category.name);
    setDescription(p.description || '');
    setPurchasePrice(p.purchasePrice.toString());
    setSalePrice(p.salePrice.toString());
    setStock(p.stock.toString());
    setMinStock(p.minStock.toString());
    setUnit(p.unit);
    setShelfLocation(p.shelfLocation || '');
    setSupplierId(typeof p.supplier === 'object' && p.supplier ? p.supplier.id : '');
    setBrand(p.brand || '');
    setMaterial(p.material || '');
    setSeason(p.season || '');
    setPattern(p.pattern || '');
    setCareInstructions(p.careInstructions || '');
    setSizes(p.sizes || []);
    setColors(p.colors || []);
  };

  const categories = [
    'Ferace', 'Tunik', 'Pardesü', 'Şal', 'Eşarp', 
    'Bone', 'Peçe', 'Çarşaf', 'Etek', 'Pantolon'
  ];

  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '38', '40', '42', '44', '46'];

  const handleAddSize = () => {
    if (!newSize || !newSizeStock) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun');
      return;
    }
    const stockNum = parseInt(newSizeStock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      Alert.alert('Hata', 'Geçerli bir stok miktarı girin');
      return;
    }
    setSizes([...sizes, { size: newSize, stock: stockNum }]);
    setNewSize('');
    setNewSizeStock('');
    setShowSizeModal(false);
  };

  const handleRemoveSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const handleAddColor = () => {
    if (!newColorName || !newColorStock) {
      Alert.alert('Hata', 'Lütfen renk adı ve stok miktarını girin');
      return;
    }
    const stockNum = parseInt(newColorStock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      Alert.alert('Hata', 'Geçerli bir stok miktarı girin');
      return;
    }
    setColors([...colors, { name: newColorName, hexCode: newColorHex, stock: stockNum }]);
    setNewColorName('');
    setNewColorHex('');
    setNewColorStock('');
    setShowColorModal(false);
  };

  const handleRemoveColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!barcode || !name || !category) {
      Alert.alert('Hata', 'Lütfen zorunlu alanları doldurun');
      return;
    }

    const purchasePriceNum = parseFloat(purchasePrice);
    const salePriceNum = parseFloat(salePrice);
    const stockNum = parseInt(stock, 10);
    const minStockNum = parseInt(minStock, 10);

    if (isNaN(purchasePriceNum) || isNaN(salePriceNum) || purchasePriceNum < 0 || salePriceNum < 0) {
      Alert.alert('Hata', 'Geçerli fiyat değerleri girin');
      return;
    }

    if (isNaN(stockNum) || isNaN(minStockNum) || stockNum < 0 || minStockNum < 0) {
      Alert.alert('Hata', 'Geçerli stok değerleri girin');
      return;
    }

    let totalSizeStock = 0;
    if (sizes.length > 0) {
      totalSizeStock = sizes.reduce((sum, size) => sum + size.stock, 0);
    }

    const productData: any = {
      barcode,
      name,
      category: { id: category, name: category },
      description,
      purchasePrice: purchasePriceNum,
      salePrice: salePriceNum,
      stock: sizes.length > 0 ? totalSizeStock : stockNum,
      minStock: minStockNum,
      unit,
      shelfLocation,
      supplierId: supplierId || undefined,
      brand,
      material,
      season: season || undefined,
      pattern,
      careInstructions,
      sizes: sizes.length > 0 ? sizes : undefined,
      colors: colors.length > 0 ? colors : undefined,
    };

    try {
      await updateProduct(productId, productData);
      Alert.alert('Başarılı', 'Ürün başarıyla güncellendi', [
        { text: 'Tamam', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Ürün güncellenirken bir hata oluştu');
    }
  };

  const selectedSupplier = suppliers.find(s => s.id === supplierId);

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Card>
          <Text style={styles.sectionTitle}>Temel Bilgiler</Text>
          <Input label="Barkod *" value={barcode} onChangeText={setBarcode} keyboardType="numeric" />
          <Input label="Ürün Adı *" value={name} onChangeText={setName} />
          
          <Text style={styles.inputLabel}>Kategori *</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryChip, category === cat && styles.categoryChipSelected]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[styles.categoryChipText, category === cat && styles.categoryChipTextSelected]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input label="Açıklama" value={description} onChangeText={setDescription} multiline numberOfLines={3} />
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Fiyat ve Stok</Text>
          <View style={styles.row}>
            <Input label="Alış Fiyatı *" value={purchasePrice} onChangeText={setPurchasePrice} keyboardType="decimal-pad" containerStyle={styles.halfInput} leftIcon="currency-try" />
            <Input label="Satış Fiyatı *" value={salePrice} onChangeText={setSalePrice} keyboardType="decimal-pad" containerStyle={styles.halfInput} leftIcon="currency-try" />
          </View>

          <View style={styles.row}>
            <Input label="Stok Miktarı *" value={stock} onChangeText={setStock} keyboardType="numeric" containerStyle={styles.halfInput} editable={sizes.length === 0} />
            <Input label="Min. Stok *" value={minStock} onChangeText={setMinStock} keyboardType="numeric" containerStyle={styles.halfInput} />
          </View>

          {sizes.length > 0 && (
            <Text style={styles.helperText}>
              Toplam Stok (Bedenler): {sizes.reduce((sum, s) => sum + s.stock, 0)} adet
            </Text>
          )}

          <Input label="Raf Konumu" value={shelfLocation} onChangeText={setShelfLocation} />
        </Card>

        {/* Giyim Özellikleri */}
        <Card>
          <Text style={styles.sectionTitle}>Giyim Özellikleri</Text>
          <Input label="Marka" value={brand} onChangeText={setBrand} />
          <Input label="Kumaş" value={material} onChangeText={setMaterial} />

          <Text style={styles.inputLabel}>Sezon</Text>
          <View style={styles.seasonGrid}>
            {[
              { label: 'Yaz', value: Season.SUMMER },
              { label: 'Kış', value: Season.WINTER },
              { label: 'İlkbahar/Sonbahar', value: Season.SPRING_FALL },
              { label: '4 Mevsim', value: Season.ALL_SEASON },
            ].map((s) => (
              <TouchableOpacity
                key={s.value}
                style={[styles.seasonChip, season === s.value && styles.seasonChipSelected]}
                onPress={() => setSeason(s.value)}
              >
                <Text style={[styles.seasonChipText, season === s.value && styles.seasonChipTextSelected]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input label="Desen" value={pattern} onChangeText={setPattern} />
          <Input label="Bakım Talimatları" value={careInstructions} onChangeText={setCareInstructions} multiline numberOfLines={2} />
        </Card>

        {/* Bedenler ve Renkler - EditProduct için kısaltılmış */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bedenler ({sizes.length})</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowSizeModal(true)}>
              <MaterialCommunityIcons name="plus" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          {sizes.length > 0 && (
            <View style={styles.itemsGrid}>
              {sizes.map((size, index) => (
                <View key={index} style={styles.itemCard}>
                  <Text style={styles.itemName}>{size.size}: {size.stock} adet</Text>
                  <TouchableOpacity onPress={() => handleRemoveSize(index)}>
                    <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>

        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Renkler ({colors.length})</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowColorModal(true)}>
              <MaterialCommunityIcons name="plus" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          {colors.length > 0 && (
            <View style={styles.itemsGrid}>
              {colors.map((color, index) => (
                <View key={index} style={styles.itemCard}>
                  {color.hexCode && <View style={[styles.colorPreview, { backgroundColor: color.hexCode }]} />}
                  <Text style={styles.itemName}>{color.name}: {color.stock} adet</Text>
                  <TouchableOpacity onPress={() => handleRemoveColor(index)}>
                    <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </Card>

        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tedarikçi</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => setShowSupplierModal(true)}>
              <MaterialCommunityIcons name="truck" size={20} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
          {selectedSupplier ? (
            <View style={styles.selectedSupplier}>
              <Text style={styles.supplierName}>{selectedSupplier.name}</Text>
              <TouchableOpacity onPress={() => setSupplierId('')}>
                <MaterialCommunityIcons name="close-circle" size={24} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.emptyText}>Tedarikçi seçilmedi</Text>
          )}
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button title="Güncelle" onPress={handleSubmit} loading={isLoading} icon="check" />
      </View>

      {/* Modals - Simplified */}
      <Modal visible={showSizeModal} onClose={() => setShowSizeModal(false)} title="Beden Ekle">
        <View style={styles.quickSizeGrid}>
          {commonSizes.map((size) => (
            <TouchableOpacity key={size} style={styles.quickSizeChip} onPress={() => setNewSize(size)}>
              <Text>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Input label="Beden" value={newSize} onChangeText={setNewSize} />
        <Input label="Stok" value={newSizeStock} onChangeText={setNewSizeStock} keyboardType="numeric" />
        <Button title="Ekle" onPress={handleAddSize} />
      </Modal>

      <Modal visible={showColorModal} onClose={() => setShowColorModal(false)} title="Renk Ekle">
        <Input label="Renk Adı" value={newColorName} onChangeText={setNewColorName} />
        <Input label="Renk Kodu" value={newColorHex} onChangeText={setNewColorHex} />
        <Input label="Stok" value={newColorStock} onChangeText={setNewColorStock} keyboardType="numeric" />
        <Button title="Ekle" onPress={handleAddColor} />
      </Modal>

      <Modal visible={showSupplierModal} onClose={() => setShowSupplierModal(false)} title="Tedarikçi Seç">
        <ScrollView style={{ maxHeight: 300 }}>
          {suppliers.map((supplier) => (
            <TouchableOpacity
              key={supplier.id}
              style={styles.supplierItem}
              onPress={() => {
                setSupplierId(supplier.id);
                setShowSupplierModal(false);
              }}
            >
              <Text>{supplier.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </View>
  );
};

// Styles - reusing most from AddProductScreen
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollView: { flex: 1 },
  sectionTitle: { fontSize: FONT_SIZES.lg, fontWeight: '600', marginBottom: SPACING.md },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: SPACING.md },
  inputLabel: { fontSize: FONT_SIZES.sm, fontWeight: '500', marginBottom: SPACING.xs },
  row: { flexDirection: 'row', gap: SPACING.md },
  halfInput: { flex: 1 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md },
  categoryChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  categoryChipSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  categoryChipText: { fontSize: FONT_SIZES.sm },
  categoryChipTextSelected: { color: COLORS.surface, fontWeight: '600' },
  seasonGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm, marginBottom: SPACING.md },
  seasonChip: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  seasonChipSelected: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  seasonChipText: { fontSize: FONT_SIZES.sm },
  seasonChipTextSelected: { color: COLORS.surface, fontWeight: '600' },
  helperText: { fontSize: FONT_SIZES.sm, color: COLORS.primary, marginTop: -SPACING.sm, marginBottom: SPACING.sm },
  addButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  itemsGrid: { gap: SPACING.sm },
  itemCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.md, backgroundColor: COLORS.background, borderRadius: BORDER_RADIUS.md },
  itemName: { fontSize: FONT_SIZES.md, fontWeight: '500' },
  colorPreview: { width: 20, height: 20, borderRadius: 10, marginRight: SPACING.xs, borderWidth: 1, borderColor: COLORS.border },
  emptyText: { fontSize: FONT_SIZES.sm, color: COLORS.textSecondary, textAlign: 'center', paddingVertical: SPACING.md },
  selectedSupplier: { flexDirection: 'row', justifyContent: 'space-between', padding: SPACING.md, backgroundColor: COLORS.background, borderRadius: BORDER_RADIUS.md },
  supplierName: { fontSize: FONT_SIZES.md, fontWeight: '600' },
  footer: { padding: SPACING.md, backgroundColor: COLORS.surface, borderTopWidth: 1, borderTopColor: COLORS.border },
  quickSizeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.xs, marginBottom: SPACING.md },
  quickSizeChip: { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: BORDER_RADIUS.sm, backgroundColor: COLORS.background, borderWidth: 1, borderColor: COLORS.border },
  supplierItem: { padding: SPACING.md, borderRadius: BORDER_RADIUS.md, backgroundColor: COLORS.background, marginBottom: SPACING.sm },
});
