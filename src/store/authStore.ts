import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { STORAGE_KEYS } from '../constants';
import authService from '../services/auth.service';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    // DEMO MODE: Backend olmadığı için mock data kullanıyoruz
    // Backend hazır olduğunda aşağıdaki kodu aktif edin
    
    try {
      // Simüle edilmiş gecikme
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock kullanıcı verisi
      const mockUser = {
        id: '1',
        email: email,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        role: 'admin' as any,
        phone: '+90 555 123 4567',
        createdAt: new Date().toISOString(),
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, mockToken);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser));

      set({
        user: mockUser,
        token: mockToken,
        isAuthenticated: true,
        isLoading: false,
      });
      
      /* BACKEND HAZIR OLDUĞUNDA BU KODU AKTİF EDİN:
      const response = await authService.login({ email, password });
      
      await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.access_token);
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(response.user));

      set({
        user: response.user,
        token: response.access_token,
        isAuthenticated: true,
        isLoading: false,
      });
      */
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Giriş başarısız',
        isLoading: false,
      });
      throw error;
    }
  },

  register: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null });
    try {
      await authService.register({ email, password, name });
      set({ isLoading: false });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Kayıt başarısız',
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      set({
        user: null,
        token: null,
        isAuthenticated: false,
      });
    }
  },

  loadUser: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

      if (token && userData) {
        const user = JSON.parse(userData);
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.log('Load user error:', error);
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
