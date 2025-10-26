// API Base URL
export const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8000/api/v1' 
  : 'https://api.mobilmarket.com/api/v1';

// Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  THEME: '@theme',
  LANGUAGE: '@language',
  OFFLINE_SALES: '@offline_sales',
  LAST_SYNC: '@last_sync',
} as const;

// App Colors - Tesettür Giyim Teması
export const COLORS = {
  primary: '#8B4789', // Mürdüm/Mor - Zarif ve feminen
  primaryDark: '#6A3068',
  primaryLight: '#A65BA4',
  secondary: '#D4AF37', // Altın - Premium his
  accent: '#E91E63', // Pembe - Genç ve dinamik
  background: '#F9F5F0', // Krem - Sıcak ve davetkar
  surface: '#FFFFFF',
  text: '#2C2C2C',
  textSecondary: '#757575',
  border: '#E8DDD5',
  error: '#D32F2F',
  warning: '#F57C00',
  success: '#388E3C',
  info: '#1976D2',
  
  // Giyim Kategorileri için Renkler
  categoryColors: {
    elbise: '#E91E63',      // Pembe
    tunik: '#9C27B0',       // Mor
    ferace: '#673AB7',      // Koyu Mor
    sal: '#3F51B5',         // İndigo
    esarp: '#2196F3',       // Mavi
    pardesu: '#5C6BC0',     // Mavi Gri
    carsaf: '#8D6E63',      // Toprak Tonu
    bone: '#26A69A',        // Turkuaz
    pece: '#455A64',        // Koyu Mavi Gri
    takim: '#009688',       // Teal
    aksesuar: '#FF9800',    // Turuncu
    ayakkabi: '#795548',    // Kahverengi
    canta: '#9E9E9E',       // Gri
    diger: '#607D8B',       // Blue Grey
  },
} as const;

// App Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Font Sizes
export const FONT_SIZES = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Border Radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 999,
} as const;

// Screen Dimensions
export const SCREEN = {
  TABLET_MIN_WIDTH: 768,
  DESKTOP_MIN_WIDTH: 1024,
} as const;

// Animation Durations
export const ANIMATION = {
  fast: 200,
  normal: 300,
  slow: 500,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// Validation Rules
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 50,
  MIN_PHONE_LENGTH: 10,
  MAX_PHONE_LENGTH: 15,
  BARCODE_LENGTH: 13,
} as const;

// Stock Alert Levels
export const STOCK_LEVELS = {
  CRITICAL: 5,
  LOW: 10,
  NORMAL: 20,
} as const;

// Tax Rate (KDV)
export const TAX_RATE = 0.18; // %18

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: "yyyy-MM-dd'T'HH:mm:ss",
  TIME_ONLY: 'HH:mm',
} as const;

// Kategoriler (Varsayılan) - Tesettür Giyim Odaklı
export const DEFAULT_CATEGORIES = [
  { id: '1', name: 'Ferace', icon: 'robe', color: COLORS.categoryColors.ferace },
  { id: '2', name: 'Tunik', icon: 'tshirt-crew', color: COLORS.categoryColors.tunik },
  { id: '3', name: 'Pardesü', icon: 'coat-rack', color: COLORS.categoryColors.pardesu },
  { id: '4', name: 'Eşarp', icon: 'butterfly', color: COLORS.categoryColors.esarp },
  { id: '5', name: 'Şal', icon: 'scarf', color: COLORS.categoryColors.sal },
  { id: '6', name: 'Bone', icon: 'account-circle-outline', color: COLORS.categoryColors.bone },
  { id: '7', name: 'Peçe', icon: 'account-box-outline', color: COLORS.categoryColors.pece },
  { id: '8', name: 'Çarşaf', icon: 'bed-outline', color: COLORS.categoryColors.carsaf },
  { id: '9', name: 'Aksesuar', icon: 'star-circle', color: COLORS.categoryColors.aksesuar },
  { id: '10', name: 'Diğer', icon: 'dots-horizontal', color: COLORS.categoryColors.diger },
] as const;

// Payment Method Icons
export const PAYMENT_ICONS = {
  nakit: 'cash',
  kart: 'credit-card',
  veresiye: 'calendar-clock',
  karma: 'wallet',
} as const;

// User Role Labels
export const ROLE_LABELS = {
  admin: 'Yönetici',
  manager: 'Müdür',
  cashier: 'Kasiyer',
  stock_keeper: 'Stokçu',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'İnternet bağlantısı yok',
  SERVER_ERROR: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.',
  UNAUTHORIZED: 'Oturum süreniz doldu. Lütfen tekrar giriş yapın.',
  VALIDATION_ERROR: 'Lütfen tüm alanları doğru şekilde doldurun.',
  NOT_FOUND: 'İstenen kayıt bulunamadı.',
  UNKNOWN_ERROR: 'Bilinmeyen bir hata oluştu.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Giriş başarılı!',
  LOGOUT: 'Çıkış yapıldı.',
  SAVED: 'Başarıyla kaydedildi.',
  UPDATED: 'Başarıyla güncellendi.',
  DELETED: 'Başarıyla silindi.',
  SALE_COMPLETED: 'Satış tamamlandı.',
} as const;
