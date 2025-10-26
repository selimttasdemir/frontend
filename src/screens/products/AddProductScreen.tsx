import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput as RNTextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useProductStore } from '../../store/productStore';
import { useSupplierStore } from '../../store/supplierStore';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { COLORS, SPACING, FONT_SIZES, BORDER_RADIUS } from '../../constants';
import { ProductUnit, Season, ClothingSize, ClothingColor } from '../../types';

export const AddProductScreen = ({ navigation }: any) => {
  const { createProduct, isLoading } = useProductStore();
  const { suppliers, fetchSuppliers } = useSupplierStore();

  // Temel bilgiler
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

  // Giyim spesifik
  const [brand, setBrand] = useState('');
  const [material, setMaterial] = useState('');
  const [season, setSeason] = useState<Season | ''>('');
  const [pattern, setPattern] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  
  // Bedenler ve Renkler
  const [sizes, setSizes] = useState<ClothingSize[]>([]);
  const [colors, setColors] = useState<ClothingColor[]>([]);

  // Modal states
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);

  // Size modal inputs
  const [newSize, setNewSize] = useState('');
  const [newSizeStock, setNewSizeStock] = useState('');

  // Color modal inputs
  const [newColorName, setNewColorName] = useState('');
  const [newColorHex, setNewColorHex] = useState('');
  const [newColorStock, setNewColorStock] = useState('');

  const categories = [
    'Ferace', 'Tunik', 'Pardesü', 'Şal', 'Eşarp', 
    'Bone', 'Peçe', 'Çarşaf', 'Etek', 'Pantolon'
  ];

  const commonSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '38', '40', '42', '44', '46'];

  useEffect(() => {
    fetchSuppliers();
  }, []);

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
    // Validasyon
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

    // Toplam stok kontrolü (sizes varsa)
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
      isActive: true,
    };

    try {
      await createProduct(productData);
      Alert.alert('Başarılı', 'Ürün başarıyla eklendi', [
        { text: 'Tamam', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Hata', 'Ürün eklenirken bir hata oluştu');
    }
  };

  const selectedSupplier = suppliers.find(s => s.id === supplierId);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Temel Bilgiler */}
        <Card>
          <Text style={styles.sectionTitle}>Temel Bilgiler</Text>
          
          <Input
            label="Barkod *"
            value={barcode}
            onChangeText={setBarcode}
            placeholder="8690001000001"
            keyboardType="numeric"
          />

          <Input
            label="Ürün Adı *"
            value={name}
            onChangeText={setName}
            placeholder="Ürün adını girin"
          />

          <Text style={styles.inputLabel}>Kategori *</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.categoryChipSelected
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.categoryChipText,
                  category === cat && styles.categoryChipTextSelected
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Açıklama"
            value={description}
            onChangeText={setDescription}
            placeholder="Ürün açıklaması"
            multiline
            numberOfLines={3}
          />
        </Card>

        {/* Fiyat ve Stok */}
        <Card>
          <Text style={styles.sectionTitle}>Fiyat ve Stok</Text>
          
          <View style={styles.row}>
            <Input
              label="Alış Fiyatı *"
              value={purchasePrice}
              onChangeText={setPurchasePrice}
              placeholder="0.00"
              keyboardType="decimal-pad"
              containerStyle={styles.halfInput}
              leftIcon="currency-try"
            />

            <Input
              label="Satış Fiyatı *"
              value={salePrice}
              onChangeText={setSalePrice}
              placeholder="0.00"
              keyboardType="decimal-pad"
              containerStyle={styles.halfInput}
              leftIcon="currency-try"
            />
          </View>

          <View style={styles.row}>
            <Input
              label="Stok Miktarı *"
              value={stock}
              onChangeText={setStock}
              placeholder="0"
              keyboardType="numeric"
              containerStyle={styles.halfInput}
              editable={sizes.length === 0}
            />

            <Input
              label="Min. Stok *"
              value={minStock}
              onChangeText={setMinStock}
              placeholder="0"
              keyboardType="numeric"
              containerStyle={styles.halfInput}
            />
          </View>

          {sizes.length > 0 && (
            <Text style={styles.helperText}>
              Toplam Stok (Bedenler): {sizes.reduce((sum, s) => sum + s.stock, 0)} adet
            </Text>
          )}

          <Input
            label="Raf Konumu"
            value={shelfLocation}
            onChangeText={setShelfLocation}
            placeholder="Raf-12-C"
          />
        </Card>

        {/* Giyim Özellikleri */}
        <Card>
          <Text style={styles.sectionTitle}>Giyim Özellikleri</Text>
          
          <Input
            label="Marka"
            value={brand}
            onChangeText={setBrand}
            placeholder="Modanisa, Sefamerve, vb."
          />

          <Input
            label="Kumaş"
            value={material}
            onChangeText={setMaterial}
            placeholder="%100 Pamuk, Viskon, vb."
          />

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
                style={[
                  styles.seasonChip,
                  season === s.value && styles.seasonChipSelected
                ]}
                onPress={() => setSeason(s.value)}
              >
                <Text style={[
                  styles.seasonChipText,
                  season === s.value && styles.seasonChipTextSelected
                ]}>
                  {s.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Input
            label="Desen"
            value={pattern}
            onChangeText={setPattern}
            placeholder="Düz, Çiçekli, Çizgili, vb."
          />

          <Input
            label="Bakım Talimatları"
            value={careInstructions}
            onChangeText={setCareInstructions}
            placeholder="30°C'de yıkayınız"
            multiline
            numberOfLines={2}
          />
        </Card>

        {/* Bedenler */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bedenler</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowSizeModal(true)}
            >
              <MaterialCommunityIcons name="plus" size={20} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Ekle</Text>
            </TouchableOpacity>
          </View>

          {sizes.length > 0 ? (
            <View style={styles.itemsGrid}>
              {sizes.map((size, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{size.size}</Text>
                    <Text style={styles.itemStock}>{size.stock} adet</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveSize(index)}>
                    <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Henüz beden eklenmedi</Text>
          )}
        </Card>

        {/* Renkler */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Renkler</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowColorModal(true)}
            >
              <MaterialCommunityIcons name="plus" size={20} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Ekle</Text>
            </TouchableOpacity>
          </View>

          {colors.length > 0 ? (
            <View style={styles.itemsGrid}>
              {colors.map((color, index) => (
                <View key={index} style={styles.itemCard}>
                  <View style={styles.itemInfo}>
                    {color.hexCode && (
                      <View
                        style={[styles.colorPreview, { backgroundColor: color.hexCode }]}
                      />
                    )}
                    <View>
                      <Text style={styles.itemName}>{color.name}</Text>
                      <Text style={styles.itemStock}>{color.stock} adet</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveColor(index)}>
                    <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <Text style={styles.emptyText}>Henüz renk eklenmedi</Text>
          )}
        </Card>

        {/* Tedarikçi */}
        <Card>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tedarikçi</Text>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setShowSupplierModal(true)}
            >
              <MaterialCommunityIcons name="truck" size={20} color={COLORS.primary} />
              <Text style={styles.addButtonText}>Seç</Text>
            </TouchableOpacity>
          </View>

          {selectedSupplier ? (
            <View style={styles.selectedSupplier}>
              <View>
                <Text style={styles.supplierName}>{selectedSupplier.name}</Text>
                <Text style={styles.supplierPhone}>{selectedSupplier.phone}</Text>
              </View>
              <TouchableOpacity onPress={() => setSupplierId('')}>
                <MaterialCommunityIcons name="close-circle" size={24} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.emptyText}>Tedarikçi seçilmedi</Text>
          )}
        </Card>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.footer}>
        <Button
          title="Ürünü Kaydet"
          onPress={handleSubmit}
          loading={isLoading}
          icon="check"
        />
      </View>

      {/* Size Modal */}
      <Modal
        visible={showSizeModal}
        onClose={() => setShowSizeModal(false)}
        title="Beden Ekle"
      >
        <Text style={styles.modalLabel}>Hazır Bedenler:</Text>
        <View style={styles.quickSizeGrid}>
          {commonSizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={styles.quickSizeChip}
              onPress={() => setNewSize(size)}
            >
              <Text style={styles.quickSizeText}>{size}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input
          label="Beden"
          value={newSize}
          onChangeText={setNewSize}
          placeholder="M, L, 38, vb."
        />

        <Input
          label="Stok Miktarı"
          value={newSizeStock}
          onChangeText={setNewSizeStock}
          placeholder="0"
          keyboardType="numeric"
        />

        <View style={styles.modalButtons}>
          <Button
            title="İptal"
            onPress={() => setShowSizeModal(false)}
            variant="secondary"
            style={styles.modalButton}
          />
          <Button
            title="Ekle"
            onPress={handleAddSize}
            style={styles.modalButton}
          />
        </View>
      </Modal>

      {/* Color Modal */}
      <Modal
        visible={showColorModal}
        onClose={() => setShowColorModal(false)}
        title="Renk Ekle"
      >
        <Input
          label="Renk Adı"
          value={newColorName}
          onChangeText={setNewColorName}
          placeholder="Siyah, Beyaz, vb."
        />

        <Input
          label="Renk Kodu (İsteğe bağlı)"
          value={newColorHex}
          onChangeText={setNewColorHex}
          placeholder="#000000"
        />

        <Input
          label="Stok Miktarı"
          value={newColorStock}
          onChangeText={setNewColorStock}
          placeholder="0"
          keyboardType="numeric"
        />

        <View style={styles.modalButtons}>
          <Button
            title="İptal"
            onPress={() => setShowColorModal(false)}
            variant="secondary"
            style={styles.modalButton}
          />
          <Button
            title="Ekle"
            onPress={handleAddColor}
            style={styles.modalButton}
          />
        </View>
      </Modal>

      {/* Supplier Modal */}
      <Modal
        visible={showSupplierModal}
        onClose={() => setShowSupplierModal(false)}
        title="Tedarikçi Seç"
      >
        <ScrollView style={styles.supplierList}>
          {suppliers.map((supplier) => (
            <TouchableOpacity
              key={supplier.id}
              style={styles.supplierItem}
              onPress={() => {
                setSupplierId(supplier.id);
                setShowSupplierModal(false);
              }}
            >
              <View>
                <Text style={styles.supplierItemName}>{supplier.name}</Text>
                <Text style={styles.supplierItemPhone}>{supplier.phone}</Text>
              </View>
              {supplierId === supplier.id && (
                <MaterialCommunityIcons name="check-circle" size={24} color={COLORS.primary} />
              )}
            </TouchableOpacity>
          ))}
          {suppliers.length === 0 && (
            <Text style={styles.emptyText}>Henüz tedarikçi eklenmemiş</Text>
          )}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  halfInput: {
    flex: 1,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  categoryChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  categoryChipTextSelected: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  seasonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  seasonChip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  seasonChipSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  seasonChipText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text,
  },
  seasonChipTextSelected: {
    color: COLORS.surface,
    fontWeight: '600',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '600',
  },
  itemsGrid: {
    gap: SPACING.sm,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  itemName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  itemStock: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
  },
  colorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    textAlign: 'center',
    paddingVertical: SPACING.md,
  },
  selectedSupplier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.md,
  },
  supplierName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  supplierPhone: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  helperText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    fontWeight: '500',
    marginTop: -SPACING.sm,
    marginBottom: SPACING.sm,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  modalLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  quickSizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
    marginBottom: SPACING.md,
  },
  quickSizeChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickSizeText: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.text,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  modalButton: {
    flex: 1,
  },
  supplierList: {
    maxHeight: 300,
  },
  supplierItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.background,
    marginBottom: SPACING.sm,
  },
  supplierItemName: {
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
    color: COLORS.text,
  },
  supplierItemPhone: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
});
