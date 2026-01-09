/**
 * API Client for CarCompany24 Backend
 * Handles all API calls to the backend with fallback to mock data
 */
import axios from 'axios'
import { getMockVehicles, getMockVehicle } from './mockData'

// API URL: Use environment variable or default to production API
// For GitHub Pages, use production API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname.includes('github.io')
    ? 'https://cc24-api.vercel.app' // Production API URL for GitHub Pages
    : 'http://localhost:8000') // Local development

// Flag to enable/disable mock data fallback
const USE_MOCK_FALLBACK = process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK !== 'false'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 second timeout
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
   * Get all vehicles with fallback to mock data
   */
  async getVehicles(params?: {
    limit?: number
    make?: string
    model?: string
    min_price?: number
    max_price?: number
  }): Promise<Vehicle[]> {
    try {
      const response = await api.get<Vehicle[]>('/api/vehicles', { params })
      return response.data
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API unavailable, using mock data:', error)
        return getMockVehicles(params)
      }
      throw error
    }
  },

  /**
   * Get vehicle by ID with fallback to mock data
   */
  async getVehicle(id: number): Promise<Vehicle> {
    try {
      const response = await api.get<Vehicle>(`/api/vehicles/${id}`)
      return response.data
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API unavailable, using mock data:', error)
        const vehicle = getMockVehicle(id)
        if (vehicle) return vehicle
        throw new Error(`Vehicle ${id} not found in mock data`)
      }
      throw error
    }
  },

  /**
   * Sync vehicles from Mobile.de (not available with mock data)
   */
  async syncMobileDe(params?: {
    make?: string
    model?: string
    limit?: number
  }): Promise<{ message: string }> {
    try {
      const response = await api.post('/api/sync/mobile-de', params)
      return response.data
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API unavailable, sync not possible with mock data')
        throw new Error('Sync functionality requires API connection')
      }
      throw error
    }
  },

  /**
   * Sync vehicles from Mobile.de (synchronous) - not available with mock data
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
    try {
      const response = await api.post('/api/sync/mobile-de/sync-now', params)
      return response.data
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API unavailable, sync not possible with mock data')
        throw new Error('Sync functionality requires API connection')
      }
      throw error
    }
  },

  /**
   * Get sync status with fallback
   */
  async getSyncStatus(): Promise<SyncStatus> {
    try {
      const response = await api.get<SyncStatus>('/api/sync/status')
      return response.data
    } catch (error) {
      if (USE_MOCK_FALLBACK) {
        console.warn('API unavailable, returning mock sync status')
        return {
          total_vehicles: 6,
          active_vehicles: 6,
          synced_vehicles: 6,
          last_sync: new Date().toISOString(),
        }
      }
      throw error
    }
  },
}

export default api
