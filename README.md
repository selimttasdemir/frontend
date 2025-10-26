# Frontend - Mobil Market Uygulaması

React Native ile geliştirilmiş market otomasyon mobil uygulaması.

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Uygulamayı başlat
npx expo start

# Android için
npx expo start --android

# iOS için  
npx expo start --ios
```

## 📁 Proje Yapısı

```
src/
├── components/       # Reusable UI bileşenleri
│   ├── common/      # Genel bileşenler (Button, Input, Card, Modal)
│   └── ...
├── screens/         # Uygulama ekranları
│   ├── auth/        # Login, Register
│   ├── dashboard/   # Ana sayfa
│   ├── products/    # Ürün yönetimi
│   ├── sales/       # Satış işlemleri
│   └── ...
├── navigation/      # Navigation yapıları
├── store/           # Zustand state management
├── services/        # API servisleri
├── types/           # TypeScript tipleri
├── constants/       # Sabitler ve temalar
└── utils/           # Yardımcı fonksiyonlar
```

## 🎨 Özellikler

### ✅ Tamamlanan
- Authentication (Login)
- Dashboard
- Ürün Listeleme
- Yeni Satış Ekranı
- Sepet Yönetimi
- State Management (Zustand)
- API Servisleri
- Reusable Components

### 🔄 Devam Eden
- Ürün Ekleme/Düzenleme
- Barkod Tarama
- Müşteri Yönetimi
- Raporlama

### 📅 Planlanan
- Offline Mode
- Push Bildirimleri
- AI Tahminleme
- E-Fatura Entegrasyonu

## 🛠️ Teknolojiler

- **React Native** - Mobil uygulama framework
- **Expo** - Development tooling
- **TypeScript** - Type safety
- **Zustand** - State management
- **React Navigation** - Navigation
- **Axios** - HTTP client
- **React Native Paper** - UI components
- **Expo Barcode Scanner** - Barkod okuma

## 🔧 Yapılandırma

### API Endpoint
`src/services/api.service.ts` dosyasında API URL'ini güncelleyin:

```typescript
const API_BASE_URL = 'http://YOUR_SERVER_IP:8000/api/v1';
```

### Environment Variables
`.env` dosyası oluşturun:

```env
API_URL=http://localhost:8000/api/v1
```

## 📱 Ekranlar

1. **Login** - Kullanıcı girişi
2. **Dashboard** - Ana sayfa, istatistikler
3. **Ürünler** - Ürün listesi ve yönetimi
4. **Satış** - Hızlı satış ekranı
5. **Raporlar** - Satış raporları
6. **Ayarlar** - Uygulama ayarları

## 🎯 Geliştirme Notları

- TypeScript strict mode aktif
- ESLint kullanılıyor
- Component-based architecture
- Modüler yapı
- Type-safe API calls

## 📄 Lisans

MIT
