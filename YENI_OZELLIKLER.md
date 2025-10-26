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


# 📱 Barkod/QR Kod Tarama Özelliği

## 🎯 Genel Bakış

Uyglamaya **Barkod ve QR Kod tarama** özelliği başarıyla eklendi. Kullanıcılar kamera ile barkod okuyarak:
- Ürün eklerken barkod girebilir
- Ürün düzenlerken barkodu güncelleyebilir
- Ürün listesinde barkod ile arama yapabilir
- Satış sırasında ürün ekleyebilir

---

## 📦 Yüklenen Paketler

```bash
npx expo install expo-camera expo-barcode-scanner
```

### Paket Detayları:
- **expo-camera**: Kamera erişimi ve kontrol
- **expo-barcode-scanner**: Barkod tanıma teknolojisi

---

## 🎨 Kullanım Alanları

### 1. **Ürün Listesinde Arama**
- **Ekran**: `ProductListScreen`
- **Konum**: Arama çubuğunun yanında altın renkli barkod butonu
- **Fonksiyon**: Barkod okutulunca otomatik ürün arama yapar

### 2. **Yeni Ürün Eklerken**
- **Ekran**: `AddProductScreen`
- **Konum**: Barkod input alanının altında "Barkod Tara" butonu
- **Fonksiyon**: Barkod okutulunca otomatik olarak input alanına yazılır

### 3. **Ürün Düzenlerken**
- **Ekran**: `EditProductScreen`
- **Konum**: Barkod input alanının altında "Barkod Tara" butonu
- **Fonksiyon**: Yeni barkod okutularak güncellenebilir

### 4. **Satış Yaparken**
- **Ekran**: `NewSaleScreen`
- **Konum**: Arama çubuğunun yanında barkod butonu
- **Fonksiyon**: Barkod okutulunca ürün otomatik sepete eklenir

---

## 🛠️ Teknik Detaylar

### Desteklenen Barkod Tipleri:
- ✅ QR Code
- ✅ EAN-13 (Standart ürün barkodu)
- ✅ EAN-8
- ✅ Code 128
- ✅ Code 39
- ✅ Code 93
- ✅ Codabar
- ✅ UPC-A
- ✅ UPC-E

### Özellikler:
- **Flash Desteği**: Karanlık ortamlarda flaş açılabilir
- **Otomatik Tanıma**: Barkod kare içine girdiğinde otomatik taranır
- **Tekrar Tarama**: Yanlış okumada tekrar tarama yapılabilir
- **İzin Yönetimi**: Kamera izni olmadan kullanıcıya bilgi gösterilir

---

## 📱 Ekran Görünümü

### Barkod Tarayıcı Ekranı
```
┌─────────────────────────┐
│  ✕  Barkod Tara    💡  │  ← Top bar (kapat, flash)
├─────────────────────────┤
│                         │
│   ┌───────────────┐    │
│   │               │    │  ← Scanner frame
│   │    BARKOD     │    │  (köşe işaretleri)
│   │               │    │
│   └───────────────┘    │
│                         │
│   📱 Barkod Tara        │  ← Icon
│   Barkodu kare içine   │  ← Instructions
│   yerleştirin           │
│                         │
│   🔄 Tekrar Tara        │  ← Rescan button (scanned ise)
└─────────────────────────┘
```

---

## 🔐 İzinler

### iOS (`app.json`)
```json
"infoPlist": {
  "NSCameraUsageDescription": "Bu uygulama barkod taramak için kameranıza erişmek istiyor."
}
```

### Android (`app.json`)
```json
"permissions": [
  "CAMERA",
  "android.permission.CAMERA"
]
```

### Plugins
```json
"plugins": [
  [
    "expo-camera",
    {
      "cameraPermission": "Barkod taramak için kameranıza erişmek istiyoruz."
    }
  ]
]
```

---

## 💻 Kod Kullanımı

### Navigasyon ile Tarayıcıyı Açma:
```typescript
navigation.navigate('BarcodeScanner', {
  onBarcodeScanned: (barcode: string) => {
    // Barkod okundu, burada işlem yapın
    console.log('Okunan barkod:', barcode);
  },
});
```

### Ürün Listesinde Kullanım:
```typescript
const handleScanBarcode = () => {
  navigation.navigate('BarcodeScanner', {
    onBarcodeScanned: (barcode: string) => {
      setSearchQuery(barcode);
      fetchProducts({ search: barcode });
    },
  });
};
```

### Satışta Kullanım:
```typescript
const handleScanBarcode = () => {
  navigation.navigate('BarcodeScanner', {
    onBarcodeScanned: (barcode: string) => {
      const product = products.find((p) => p.barcode === barcode);
      if (product) {
        handleAddProduct(product);
        Alert.alert('Başarılı', `${product.name} sepete eklendi`);
      } else {
        Alert.alert('Ürün Bulunamadı', `Barkod: ${barcode}`);
      }
    },
  });
};
```

---

## 🎨 UI/UX Özellikleri

### Renkler:
- **Scanner Frame**: Primary renk (`#8B4789`)
- **Barkod Butonu**: Secondary (altın) renk (`#D4AF37`)
- **Overlay**: Karartma efekti (rgba opacity)

### Animasyonlar:
- Köşe işaretleri (corner borders)
- Smooth geçişler
- Touch feedback (activeOpacity)

### Responsive Tasarım:
- Küçük ekranlarda uyumlu
- Tablet destekli
- Web uyumlu (kamera izni kontrolü)

---

## 🐛 Hata Yönetimi

### İzin Reddedilirse:
```
┌─────────────────────────┐
│   📷 (kapalı icon)      │
│                         │
│  Kamera erişimi         │
│  reddedildi             │
│                         │
│  Ayarlardan kamera      │
│  iznini açmanız         │
│  gerekiyor              │
│                         │
│   [ Geri Dön ]          │
└─────────────────────────┘
```

### Ürün Bulunamadığında:
- Alert gösterilir
- Barkod numarası bildirilir
- Tekrar tarama seçeneği sunulur

---

## 🚀 Test Etme

### Manuel Test:
1. Ürünler sayfasına git
2. Barkod butonuna tıkla
3. Test barkodu tara (örn: 8690001000001)
4. Ürünün bulunup bulunmadığını kontrol et

### Satış Testi:
1. Satış ekranına git
2. Barkod butonuna tıkla
3. Ürün barkodu tara
4. Sepete eklendiğini kontrol et

### Ürün Ekleme Testi:
1. "Yeni Ürün Ekle"ye tıkla
2. "Barkod Tara" butonuna tıkla
3. Barkod tara
4. Input alanına yazıldığını kontrol et

---

## 📋 Type Tanımları

```typescript
// ProductStackParamList güncellendi
export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetail: { productId: string };
  AddProduct: undefined;
  EditProduct: { productId: string };
  BarcodeScanner: { 
    onBarcodeScanned: (barcode: string) => void 
  };
};

// SalesStackParamList'e eklendi
export type SalesStackParamList = {
  SalesList: undefined;
  NewSale: undefined;
  SaleDetail: { saleId: string };
  BarcodeScanner: { 
    onBarcodeScanned: (barcode: string) => void 
  };
};
```

---

## 📁 Yeni Dosyalar

```
src/
  screens/
    products/
      BarcodeScannerScreen.tsx  ← YENİ (580 satır)
```

---

## 🔄 Güncellenen Dosyalar

1. **ProductNavigator.tsx** - BarcodeScanner route eklendi
2. **SalesNavigator.tsx** - BarcodeScanner route eklendi
3. **ProductListScreen.tsx** - Barkod butonu eklendi
4. **AddProductScreen.tsx** - Barkod tarama özelliği
5. **EditProductScreen.tsx** - Barkod tarama özelliği
6. **NewSaleScreen.tsx** - Satış sırasında barkod okuma
7. **app.json** - Kamera izinleri ve plugin konfigürasyonu
8. **package.json** - expo-camera ve expo-barcode-scanner eklendi

---

## 🎯 Sonuç

Barkod tarama özelliği başarıyla entegre edildi! Artık kullanıcılar:
- ✅ Hızlı ürün arayabilir
- ✅ Kolay ürün ekleyebilir
- ✅ Hızlı satış yapabilir
- ✅ Stok yönetimi yapabilir

**Profesyonel bir market otomasyon sistemi için kritik özellik eklendi!** 🎉

---

## 📞 Notlar

- Kamera izni ilk kullanımda kullanıcıdan otomatik istenir
- Web'de kamera API'si tarayıcı desteğine bağlıdır
- Simulator'da kamera çalışmaz, gerçek cihaz gereklidir
- Geliştirme sırasında Expo Go uygulaması kullanılabilir

---

**Son Güncelleme**: 26 Ekim 2025
**Versiyon**: 1.0.0
**Platform**: Expo SDK 51
