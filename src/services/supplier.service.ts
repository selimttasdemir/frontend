import apiService from './api.service';
import { Supplier, ApiResponse, PaginatedResponse } from '../types';

interface SupplierFilters {
  search?: string;
  page?: number;
  pageSize?: number;
}

class SupplierService {
  async getSuppliers(filters?: SupplierFilters): Promise<PaginatedResponse<Supplier>> {
    return await apiService.get<PaginatedResponse<Supplier>>('/suppliers', filters);
  }

  async getSupplier(id: string): Promise<Supplier> {
    return await apiService.get<Supplier>(`/suppliers/${id}`);
  }

  async createSupplier(data: Partial<Supplier>): Promise<ApiResponse<Supplier>> {
    return await apiService.post<ApiResponse<Supplier>>('/suppliers', data);
  }

  async updateSupplier(id: string, data: Partial<Supplier>): Promise<ApiResponse<Supplier>> {
    return await apiService.put<ApiResponse<Supplier>>(`/suppliers/${id}`, data);
  }

  async deleteSupplier(id: string): Promise<ApiResponse<void>> {
    return await apiService.delete<ApiResponse<void>>(`/suppliers/${id}`);
  }

  async getSupplierProducts(supplierId: string): Promise<any[]> {
    return await apiService.get<any[]>(`/suppliers/${supplierId}/products`);
  }
}

export default new SupplierService();
