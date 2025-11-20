// Database types generated from Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      farmers: {
        Row: {
          id: string
          created_at: string
          name: string
          age: number
          photo: string | null
          address: string
          phone: string
          experience: number
          land_size: number
          tobacco_variety: string
          certifications: string[] | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          age: number
          photo?: string | null
          address: string
          phone: string
          experience: number
          land_size: number
          tobacco_variety: string
          certifications?: string[] | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          age?: number
          photo?: string | null
          address?: string
          phone?: string
          experience?: number
          land_size?: number
          tobacco_variety?: string
          certifications?: string[] | null
        }
      }
      plantations: {
        Row: {
          id: string
          created_at: string
          farmer_id: string
          location: string
          size: number
          tobacco_variety: string
          planting_date: string
          expected_harvest_date: string
          status: 'planting' | 'growing' | 'harvesting' | 'harvested'
          soil_type: string
          irrigation_type: string
        }
        Insert: {
          id?: string
          created_at?: string
          farmer_id: string
          location: string
          size: number
          tobacco_variety: string
          planting_date: string
          expected_harvest_date: string
          status?: 'planting' | 'growing' | 'harvesting' | 'harvested'
          soil_type: string
          irrigation_type: string
        }
        Update: {
          id?: string
          created_at?: string
          farmer_id?: string
          location?: string
          size?: number
          tobacco_variety?: string
          planting_date?: string
          expected_harvest_date?: string
          status?: 'planting' | 'growing' | 'harvesting' | 'harvested'
          soil_type?: string
          irrigation_type?: string
        }
      }
    }
  }
}
