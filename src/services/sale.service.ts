import apiService from './api.service';
import { Sale, SaleItem, ApiResponse, PaginatedResponse } from '@types/index';

interface CreateSaleRequest {
  items: {
    productId: string;
    quantity: number;
    unitPrice: number;
    discount?: number;
  }[];
  paymentMethod: string;
  customerId?: string;
  discount?: number;
}

interface SaleFilters {
  startDate?: string;
  endDate?: string;
  paymentMethod?: string;
  customerId?: string;
  cashierId?: string;
  page?: number;
  pageSize?: number;
}

class SaleService {
  async getSales(filters?: SaleFilters): Promise<PaginatedResponse<Sale>> {
    return await apiService.get<PaginatedResponse<Sale>>('/sales', filters);
  }

  async getSale(id: string): Promise<Sale> {
    return await apiService.get<Sale>(`/sales/${id}`);
  }

  async createSale(data: CreateSaleRequest): Promise<ApiResponse<Sale>> {
    return await apiService.post<ApiResponse<Sale>>('/sales', data);
  }

  async cancelSale(id: string, reason?: string): Promise<ApiResponse<void>> {
    return await apiService.post<ApiResponse<void>>(`/sales/${id}/cancel`, { reason });
  }

  async getDailySales(date?: string): Promise<Sale[]> {
    return await apiService.get<Sale[]>('/sales/daily', { date });
  }

  async getDailyReport(date?: string): Promise<any> {
    return await apiService.get('/sales/daily-report', { date });
  }

  async generateReceipt(saleId: string): Promise<Blob> {
    return await apiService.get<Blob>(`/sales/${saleId}/receipt`);
  }
}

export default new SaleService();
