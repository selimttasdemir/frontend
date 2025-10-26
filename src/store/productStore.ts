import { create } from 'zustand';
import { Product } from '../types';
import productService from '../services/product.service';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  
  // Pagination
  currentPage: number;
  totalPages: number;
  totalItems: number;

  // Actions
  fetchProducts: (filters?: any) => Promise<void>;
  fetchProduct: (id: string) => Promise<void>;
  searchProducts: (query: string) => Promise<void>;
  createProduct: (data: Partial<Product>) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  clearSelectedProduct: () => void;
  clearError: () => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  selectedProduct: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalItems: 0,

  fetchProducts: async (filters = {}) => {
    set({ isLoading: true, error: null });
    
    // DEMO MODE: Mock data kullanıyoruz
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock ürünler - Tesettür Giyim
      const mockProducts = [
        {
          id: '1',
          barcode: '8690001000001',
          name: 'Klasik Siyah Ferace',
          category: { id: '3', name: 'Ferace' },
          description: 'Şık ve rahat kullanımlı günlük ferace',
          purchasePrice: 250,
          salePrice: 450,
          stock: 15,
          minStock: 5,
          unit: 'adet' as any,
          sizes: [
            { size: 'S', stock: 3 },
            { size: 'M', stock: 5 },
            { size: 'L', stock: 4 },
            { size: 'XL', stock: 3 },
          ],
          colors: [
            { name: 'Siyah', hexCode: '#000000', stock: 15 },
          ],
          material: '%100 Polyester',
          brand: 'Modanisa',
          season: 'dort_mevsim' as any,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          barcode: '8690001000002',
          name: 'Çiçek Desenli Tunik',
          category: { id: '2', name: 'Tunik' },
          description: 'Yazlık çiçek desenli şık tunik',
          purchasePrice: 120,
          salePrice: 220,
          stock: 25,
          minStock: 10,
          unit: 'adet' as any,
          sizes: [
            { size: 'S', stock: 5 },
            { size: 'M', stock: 10 },
            { size: 'L', stock: 7 },
            { size: 'XL', stock: 3 },
          ],
          colors: [
            { name: 'Pembe', hexCode: '#FFB6C1', stock: 12 },
            { name: 'Mavi', hexCode: '#87CEEB', stock: 8 },
            { name: 'Beyaz', hexCode: '#FFFFFF', stock: 5 },
          ],
          material: '%95 Viskon %5 Elastan',
          brand: 'Sefamerve',
          season: 'yaz' as any,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          barcode: '8690001000003',
          name: 'Şifon Şal',
          category: { id: '4', name: 'Şal' },
          description: 'Yumuşak dokulu şifon şal',
          purchasePrice: 35,
          salePrice: 65,
          stock: 8,
          minStock: 10,
          unit: 'adet' as any,
          colors: [
            { name: 'Mürdüm', hexCode: '#8B4789', stock: 3 },
            { name: 'Lacivert', hexCode: '#000080', stock: 2 },
            { name: 'Bordo', hexCode: '#800020', stock: 3 },
          ],
          material: '%100 Şifon',
          brand: 'Armine',
          season: 'dort_mevsim' as any,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '4',
          barcode: '8690001000004',
          name: 'Pamuklu Eşarp',
          category: { id: '5', name: 'Eşarp' },
          description: 'Nefes alabilen pamuklu eşarp',
          purchasePrice: 25,
          salePrice: 45,
          stock: 40,
          minStock: 15,
          unit: 'adet' as any,
          colors: [
            { name: 'Bej', hexCode: '#F5F5DC', stock: 15 },
            { name: 'Kahverengi', hexCode: '#8B4513', stock: 12 },
            { name: 'Yeşil', hexCode: '#228B22', stock: 13 },
          ],
          material: '%100 Pamuk',
          brand: 'Silk Home',
          season: 'dort_mevsim' as any,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '5',
          barcode: '8690001000005',
          name: 'Tesettür Elbise - Desenli',
          category: { id: '1', name: 'Elbise' },
          description: 'Özel gün için şık tesettür elbise',
          purchasePrice: 300,
          salePrice: 550,
          stock: 10,
          minStock: 5,
          unit: 'adet' as any,
          sizes: [
            { size: '36', stock: 2 },
            { size: '38', stock: 3 },
            { size: '40', stock: 3 },
            { size: '42', stock: 2 },
          ],
          colors: [
            { name: 'Altın', hexCode: '#D4AF37', stock: 5 },
            { name: 'Gümüş', hexCode: '#C0C0C0', stock: 5 },
          ],
          material: '%70 Polyester %30 Viskon',
          brand: 'Tuğba',
          season: 'dort_mevsim' as any,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '6',
          barcode: '8690001000006',
          name: 'Kot Pantolon - Tesettür',
          category: { id: '6', name: 'Pantolon' },
          description: 'Bol kesim rahat kot pantolon',
          purchasePrice: 150,
          salePrice: 280,
          stock: 20,
          minStock: 8,
          unit: 'adet' as any,
          sizes: [
            { size: '36', stock: 4 },
            { size: '38', stock: 6 },
            { size: '40', stock: 5 },
            { size: '42', stock: 3 },
            { size: '44', stock: 2 },
          ],
          colors: [
            { name: 'Koyu Mavi', hexCode: '#00008B', stock: 12 },
            { name: 'Siyah', hexCode: '#000000', stock: 8 },
          ],
          material: '%98 Pamuk %2 Elastan',
          brand: 'Neva Style',
          season: 'dort_mevsim' as any,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      
      set({
        products: mockProducts,
        currentPage: 1,
        totalPages: 1,
        totalItems: mockProducts.length,
        isLoading: false,
      });
      
      /* BACKEND HAZIR OLDUĞUNDA:
      const response = await productService.getProducts(filters);
      set({
        products: response.items,
        currentPage: response.page,
        totalPages: response.totalPages,
        totalItems: response.total,
        isLoading: false,
      });
      */
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ürünler yüklenemedi',
        isLoading: false,
      });
    }
  },

  fetchProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const product = await productService.getProduct(id);
      set({ selectedProduct: product, isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ürün bulunamadı',
        isLoading: false,
      });
    }
  },

  searchProducts: async (query: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await productService.getProducts({ search: query });
      set({
        products: response.items,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Arama başarısız',
        isLoading: false,
      });
    }
  },

  createProduct: async (data: Partial<Product>) => {
    set({ isLoading: true, error: null });
    try {
      await productService.createProduct(data);
      // Refresh the list
      await get().fetchProducts();
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ürün eklenemedi',
        isLoading: false,
      });
      throw error;
    }
  },

  updateProduct: async (id: string, data: Partial<Product>) => {
    set({ isLoading: true, error: null });
    try {
      await productService.updateProduct(id, data);
      // Refresh the list
      await get().fetchProducts();
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ürün güncellenemedi',
        isLoading: false,
      });
      throw error;
    }
  },

  deleteProduct: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await productService.deleteProduct(id);
      // Remove from list
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        isLoading: false,
      }));
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Ürün silinemedi',
        isLoading: false,
      });
      throw error;
    }
  },

  clearSelectedProduct: () => set({ selectedProduct: null }),
  clearError: () => set({ error: null }),
}));
