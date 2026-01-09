/**
 * CC24 API Client
 * Zentrale API-Kommunikation für alle Services
 */

import axios, { AxiosInstance } from 'axios';

export class CC24APIClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request Interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('cc24_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response Interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        // Global error handling
        if (error.response?.status === 401) {
          // Handle unauthorized
          localStorage.removeItem('cc24_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // ============================================================================
  // VEHICLES API
  // ============================================================================

  async getVehicles(filters?: {
    make?: string;
    model?: string;
    minPrice?: number;
    maxPrice?: number;
    fuel?: string;
  }) {
    const response = await this.client.get('/api/vehicles', { params: filters });
    return response.data;
  }

  async getVehicle(id: string) {
    const response = await this.client.get(`/api/vehicles/${id}`);
    return response.data;
  }

  async createVehicle(data: any) {
    const response = await this.client.post('/api/vehicles', data);
    return response.data;
  }

  async updateVehicle(id: string, data: any) {
    const response = await this.client.put(`/api/vehicles/${id}`, data);
    return response.data;
  }

  async deleteVehicle(id: string) {
    const response = await this.client.delete(`/api/vehicles/${id}`);
    return response.data;
  }

  // ============================================================================
  // FINANCING API
  // ============================================================================

  async calculateFinancing(data: {
    kaufpreis: number;
    Anzahlung: number;
    laufzeit: number;
    sollzinssatz: number;
  }) {
    const response = await this.client.post('/api/financing/calculate', data);
    return response.data;
  }

  async submitFinancingRequest(data: {
    vehicleId: string;
    customerId: string;
    financingData: any;
  }) {
    const response = await this.client.post('/api/financing/request', data);
    return response.data;
  }

  // ============================================================================
  // VAVSR SHOWROOM API
  // ============================================================================

  async upload360Images(vehicleId: string, files: File[]) {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
      formData.append(`angle_${index}`, String(index * 45));
    });
    formData.append('vehicleId', vehicleId);

    const response = await this.client.post('/api/vavsr/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async generate360Showroom(vehicleId: string, background: string = 'vavsr_cyan') {
    const response = await this.client.post('/api/vavsr/generate', {
      vehicleId,
      background,
      frames: 36,
    });
    return response.data;
  }

  async getShowroom(vehicleId: string) {
    const response = await this.client.get(`/api/vavsr/${vehicleId}`);
    return response.data;
  }

  // ============================================================================
  // BÖRSE API
  // ============================================================================

  async searchBoerse(filters: {
    query?: string;
    make?: string;
    minPrice?: number;
    maxPrice?: number;
    location?: string;
  }) {
    const response = await this.client.get('/api/boerse/search', { params: filters });
    return response.data;
  }

  async createListing(data: {
    vehicleId: string;
    dealerId: string;
    price: number;
    financingAvailable: boolean;
  }) {
    const response = await this.client.post('/api/boerse/listings', data);
    return response.data;
  }

  // ============================================================================
  // DEALER API
  // ============================================================================

  async getDealerStats(dealerId: string) {
    const response = await this.client.get(`/api/dealer/${dealerId}/stats`);
    return response.data;
  }

  async getDealerVehicles(dealerId: string) {
    const response = await this.client.get(`/api/dealer/${dealerId}/vehicles`);
    return response.data;
  }

  async getFinancingRequests(dealerId: string) {
    const response = await this.client.get(`/api/dealer/${dealerId}/financing`);
    return response.data;
  }

  // ============================================================================
  // ANALYTICS API
  // ============================================================================

  async getAnalytics(period: 'day' | 'week' | 'month' | 'year' = 'month') {
    const response = await this.client.get('/api/analytics', { params: { period } });
    return response.data;
  }

  async getRevenueData(period: 'day' | 'week' | 'month' | 'year' = 'month') {
    const response = await this.client.get('/api/analytics/revenue', { params: { period } });
    return response.data;
  }

  // ============================================================================
  // MOBILE.DE SYNC
  // ============================================================================

  async syncToMobileDe(vehicleId: string) {
    const response = await this.client.post(`/api/integrations/mobilede/sync/${vehicleId}`);
    return response.data;
  }

  async syncFromMobileDe() {
    const response = await this.client.post('/api/integrations/mobilede/sync-all');
    return response.data;
  }
}

// Singleton Instance
export const apiClient = new CC24APIClient();
