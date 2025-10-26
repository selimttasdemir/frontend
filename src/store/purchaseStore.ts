import { create } from 'zustand';
import { PurchaseOrder } from '../types';
import purchaseService from '../services/purchase.service';

interface PurchaseStore {
  purchases: PurchaseOrder[];
  currentPurchase: PurchaseOrder | null;
  isLoading: boolean;
  error: string | null;

  fetchPurchases: (filters?: any) => Promise<void>;
  getPurchase: (id: string) => Promise<void>;
  createPurchase: (data: Partial<PurchaseOrder>) => Promise<boolean>;
  updatePurchase: (id: string, data: Partial<PurchaseOrder>) => Promise<boolean>;
  deletePurchase: (id: string) => Promise<boolean>;
  updatePurchaseStatus: (id: string, status: string) => Promise<boolean>;
  setCurrentPurchase: (purchase: PurchaseOrder | null) => void;
  clearError: () => void;
}

export const usePurchaseStore = create<PurchaseStore>((set) => ({
  purchases: [],
  currentPurchase: null,
  isLoading: false,
  error: null,

  fetchPurchases: async (filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await purchaseService.getPurchaseOrders(filters);
      set({ purchases: response.items, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  getPurchase: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const purchase = await purchaseService.getPurchaseOrder(id);
      set({ currentPurchase: purchase, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createPurchase: async (data: Partial<PurchaseOrder>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await purchaseService.createPurchaseOrder(data);
      if (response.success && response.data) {
        set((state) => ({
          purchases: [...state.purchases, response.data!],
          isLoading: false,
        }));
        return true;
      }
      set({ error: response.message || 'Satın alma kaydı oluşturulamadı', isLoading: false });
      return false;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  updatePurchase: async (id: string, data: Partial<PurchaseOrder>) => {
    set({ isLoading: true, error: null });
    try {
      const response = await purchaseService.updatePurchaseOrder(id, data);
      if (response.success && response.data) {
        set((state) => ({
          purchases: state.purchases.map((p) => (p.id === id ? response.data! : p)),
          currentPurchase: state.currentPurchase?.id === id ? response.data! : state.currentPurchase,
          isLoading: false,
        }));
        return true;
      }
      set({ error: response.message || 'Satın alma kaydı güncellenemedi', isLoading: false });
      return false;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  deletePurchase: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await purchaseService.deletePurchaseOrder(id);
      if (response.success) {
        set((state) => ({
          purchases: state.purchases.filter((p) => p.id !== id),
          currentPurchase: state.currentPurchase?.id === id ? null : state.currentPurchase,
          isLoading: false,
        }));
        return true;
      }
      set({ error: response.message || 'Satın alma kaydı silinemedi', isLoading: false });
      return false;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  updatePurchaseStatus: async (id: string, status: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await purchaseService.updatePurchaseStatus(id, status);
      if (response.success && response.data) {
        set((state) => ({
          purchases: state.purchases.map((p) => (p.id === id ? response.data! : p)),
          currentPurchase: state.currentPurchase?.id === id ? response.data! : state.currentPurchase,
          isLoading: false,
        }));
        return true;
      }
      set({ error: response.message || 'Durum güncellenemedi', isLoading: false });
      return false;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      return false;
    }
  },

  setCurrentPurchase: (purchase) => set({ currentPurchase: purchase }),
  clearError: () => set({ error: null }),
}));
