# Frontend - Yeni Eklenen Özellikler

## 📋 Genel Bakış

Frontend uygulamasına **ürün yönetimi CRUD işlemleri**, **tedarikçi yönetimi** ve **admin yetkilendirme sistemi** eklendi.

---

## ✨ Eklenen Özellikler

### 1. **Ürün Yönetimi (CRUD)**

#### Sayfalar:
- **ProductListScreen** - Ürün listesi (zaten vardı, güncellendi)
- **ProductDetailScreen** - Ürün detayları, beden/renk stok bilgileri
- **AddProductScreen** - Yeni ürün ekleme (beden, renk, tedarikçi seçimi)
- **EditProductScreen** - Ürün düzenleme

#### Özellikler:
- ✅ Ürün ekleme, düzenleme, silme
- ✅ Beden yönetimi (XS, S, M, L, XL, 36, 38, 40, vb.)
- ✅ Renk yönetimi (renk adı, hex kodu, stok)
- ✅ Tedarikçi seçimi
- ✅ Giyim özellikleri (marka, kumaş, sezon, desen, bakım talimatları)
- ✅ Kategori seçimi (Ferace, Tunik, Pardesü, Şal, Eşarp, vb.)
- ✅ Stok takibi (beden/renk bazlı)

---

### 2. **Tedarikçi Yönetimi**

#### Sayfalar:
- **SupplierListScreen** - Tedarikçi listesi
- **AddSupplierScreen** - Yeni tedarikçi ekleme
- **EditSupplierScreen** - Tedarikçi düzenleme (TODO)
- **SupplierDetailScreen** - Tedarikçi detayları (TODO)

#### Özellikler:
- ✅ Tedarikçi ekleme, listeleme
- ✅ Tedarikçi bilgileri (firma adı, yetkili, telefon, email, adres, vergi no)
- 🔜 Tedarikçiye ait ürünleri görüntüleme
- 🔜 Tedarikçiden yapılan alımları görüntüleme

---

### 3. **Admin Yetkilendirme Sistemi**

#### Yeni User Role'ler:
```typescript
export enum UserRole {
  ADMIN = 'admin',
  ADMIN_1 = 'admin_1',  // İlk Admin
  ADMIN_2 = 'admin_2',  // İkinci Admin
  MANAGER = 'manager',
  CASHIER = 'cashier',
  STOCK_KEEPER = 'stock_keeper'
}
```

#### Satın Alma Takibi:
```typescript
export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplier: Supplier;
  items: PurchaseOrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: PurchaseOrderStatus;
  purchasedBy: User;  // Hangi admin aldı!
  notes?: string;
  deliveryDate?: string;
  createdAt: string;
  updatedAt: string;
}
```

**PurchaseOrder** ile hangi ürünün hangi toptancıdan (supplier) hangi admin tarafından alındığı takip edilebilir.

---

## 🗂️ Dosya Yapısı

```
frontend/
├── src/
│   ├── screens/
│   │   ├── products/
│   │   │   ├── ProductListScreen.tsx        ✅
│   │   │   ├── ProductDetailScreen.tsx      ✅ YENİ
│   │   │   ├── AddProductScreen.tsx         ✅ YENİ
│   │   │   └── EditProductScreen.tsx        ✅ YENİ
│   │   ├── suppliers/
│   │   │   ├── SupplierListScreen.tsx       ✅ YENİ
│   │   │   └── AddSupplierScreen.tsx        ✅ YENİ
│   ├── services/
│   │   ├── product.service.ts               ✅
│   │   ├── supplier.service.ts              ✅ YENİ
│   │   └── purchase.service.ts              ✅ YENİ
│   ├── store/
│   │   ├── productStore.ts                  ✅
│   │   ├── supplierStore.ts                 ✅ YENİ
│   │   └── purchaseStore.ts                 ✅ YENİ
│   ├── navigation/
│   │   ├── ProductNavigator.tsx             ✅ Güncellendi
│   │   ├── SupplierNavigator.tsx            ✅ YENİ
│   │   └── MainNavigator.tsx                ✅ Güncellendi (Tedarikçi tab eklendi)
│   └── types/
│       └── index.ts                         ✅ Güncellendi
```

---

## 🎨 Ekran Görünümleri

### Alt Navigasyon:
1. 🏠 **Ana Sayfa** - Dashboard
2. 📦 **Ürünler** - Ürün yönetimi (CRUD)
3. 🛒 **Satış** - Satış işlemleri
4. 🚚 **Tedarikçi** - Tedarikçi yönetimi ← **YENİ**
5. 📊 **Raporlar** - Raporlar

---

## 🔄 Kullanım Akışı

### Ürün Ekleme Akışı:
1. **Ürünler** sekmesine git
2. **+** butonuna bas
3. Temel bilgileri doldur (barkod, ad, kategori)
4. Fiyat ve stok bilgilerini gir
5. **Beden Ekle** → Bedenler ve stok miktarlarını ekle
6. **Renk Ekle** → Renkler ve stok miktarlarını ekle
7. **Tedarikçi Seç** → Ürünü hangi tedarikçiden aldığını seç
8. Giyim özelliklerini doldur (marka, kumaş, sezon, vb.)
9. **Kaydet**

### Tedarikçi Ekleme Akışı:
1. **Tedarikçi** sekmesine git
2. **+** butonuna bas
3. Firma bilgilerini doldur (ad, yetkili, telefon)
4. Ek bilgileri doldur (email, adres, vergi no)
5. **Kaydet**

---

## 🔮 Gelecek Geliştirmeler (TODO)

### Satın Alma Yönetimi:
- [ ] Satın alma siparişi oluşturma ekranı
- [ ] Satın alma geçmişi
- [ ] Hangi admin hangi ürünü aldı raporu
- [ ] Tedarikçi bazlı satın alma istatistikleri

### Tedarikçi Detayları:
- [ ] SupplierDetailScreen (tedarikçi detay sayfası)
- [ ] EditSupplierScreen (tedarikçi düzenleme)
- [ ] Tedarikçiden alınan ürünler listesi
- [ ] Tedarikçi bazlı satın alma geçmişi

### Raporlar:
- [ ] Admin bazlı satın alma raporu
- [ ] Tedarikçi performans raporu
- [ ] Beden/renk bazlı stok raporu
- [ ] En çok satan ürünler (beden/renk bazlı)

### Kullanıcı Yönetimi:
- [ ] Admin profil sayfası
- [ ] Admin bazlı yetki kontrolü
- [ ] Satın alma yetkisi kontrolü (sadece ADMIN_1 ve ADMIN_2)

---

## 🎯 Önemli Notlar

1. **Backend Entegrasyonu**: Şu anda tüm servisler mock data kullanıyor. Backend hazır olduğunda:
   - `product.service.ts`
   - `supplier.service.ts`
   - `purchase.service.ts`
   dosyalarındaki API endpoint'leri aktif edilmeli.

2. **Admin Kontrolü**: Satın alma işlemlerinde `purchasedBy` alanı ile hangi admin'in ürünü aldığı kaydediliyor. Bu sayede:
   - Admin 1 ve Admin 2 ayrı ayrı stok alımı yapabilir
   - Her admin kendi aldığı ürünleri görebilir
   - Raporlarda admin bazlı filtreleme yapılabilir

3. **Stok Yönetimi**: 
   - Beden eklenirse, toplam stok bedenlerden hesaplanır
   - Renk eklenirse, her renk için ayrı stok takibi yapılır
   - Stok kartı "Stok Miktarı" alanı bedenler varsa otomatik devre dışı kalır

4. **Tedarikçi İlişkisi**:
   - Her ürün bir tedarikçiye bağlanabilir
   - Tedarikçi bilgileri ürün detayında gösterilir
   - Gelecekte tedarikçi bazlı raporlar eklenebilir

---

## 🚀 Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Expo ile çalıştır
npx expo start

# Android emulator
npm run android

# iOS simulator (Mac)
npm run ios

# Web
npm run web
```

---

## 📝 Kod Örnekleri

### Ürün Ekleme:
```typescript
const productData = {
  barcode: '8690001000001',
  name: 'Klasik Siyah Ferace',
  category: { id: '3', name: 'Ferace' },
  purchasePrice: 250,
  salePrice: 450,
  sizes: [
    { size: 'S', stock: 3 },
    { size: 'M', stock: 5 },
    { size: 'L', stock: 4 },
  ],
  colors: [
    { name: 'Siyah', hexCode: '#000000', stock: 12 },
  ],
  supplierId: 'supplier-123',
  brand: 'Modanisa',
  material: '%100 Polyester',
  season: Season.ALL_SEASON,
};

await createProduct(productData);
```

### Tedarikçi Ekleme:
```typescript
const supplierData = {
  name: 'ABC Tekstil Ltd. Şti.',
  contactPerson: 'Ahmet Yılmaz',
  phone: '0532 123 45 67',
  email: 'info@abc.com',
  address: 'İstanbul, Türkiye',
  taxNumber: '1234567890',
};

await createSupplier(supplierData);
```

---

## 🎉 Sonuç

Frontend uygulaması artık tam özellikli bir **giyim mağazası yönetim sistemi** haline geldi:

✅ Ürün CRUD işlemleri (Ekleme, Silme, Düzenleme, Listeleme)
✅ Beden ve renk yönetimi
✅ Tedarikçi yönetimi
✅ Admin bazlı takip sistemi
✅ Giyim spesifik özellikler (marka, kumaş, sezon, vb.)

**Bir sonraki adım**: Backend ile entegrasyon ve satın alma yönetimi ekranlarının eklenmesi! 🚀
