/**
 * API Client for CarCompany24 Backend
 * Handles all API calls to the backend
 */
import axios from 'axios'

// API URL: Use environment variable or default to production API
// For GitHub Pages, use production API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname.includes('github.io')
    ? 'https://cc24-api.vercel.app' // Production API URL for GitHub Pages
    : 'http://localhost:8000') // Local development

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface Vehicle {
  id: number
  mobile_de_id?: string
  title: string
  brand?: string
  model?: string
  year?: number
  price: number
  mileage?: number
  fuel_type?: string
  power_kw?: number
  power_hp?: number
  transmission?: string
  doors?: number
  seats?: number
  color?: string
  description?: string
  image_urls: string[]
  main_image_url?: string
  mobile_de_url?: string
  dealer_name?: string
  dealer_location?: string
  first_registration?: string
  created_at?: string
  updated_at?: string
}

export interface SyncStatus {
  total_vehicles: number
  active_vehicles: number
  synced_vehicles: number
  last_sync?: string
}

export const vehicleApi = {
  /**
   * Get all vehicles
   */
  async getVehicles(params?: {
    limit?: number
    make?: string
    model?: string
    min_price?: number
    max_price?: number
  }): Promise<Vehicle[]> {
    const response = await api.get<Vehicle[]>('/api/vehicles', { params })
    return response.data
  },

  /**
   * Get vehicle by ID
   */
  async getVehicle(id: number): Promise<Vehicle> {
    const response = await api.get<Vehicle>(`/api/vehicles/${id}`)
    return response.data
  },

  /**
   * Sync vehicles from Mobile.de
   */
  async syncMobileDe(params?: {
    make?: string
    model?: string
    limit?: number
  }): Promise<{ message: string }> {
    const response = await api.post('/api/sync/mobile-de', params)
    return response.data
  },

  /**
   * Sync vehicles from Mobile.de (synchronous)
   */
  async syncMobileDeNow(params?: {
    make?: string
    model?: string
    limit?: number
  }): Promise<{
    success: boolean
    synced: number
    created: number
    updated: number
  }> {
    const response = await api.post('/api/sync/mobile-de/sync-now', params)
    return response.data
  },

  /**
   * Get sync status
   */
  async getSyncStatus(): Promise<SyncStatus> {
    const response = await api.get<SyncStatus>('/api/sync/status')
    return response.data
  },
}

export default api
