import { supabase } from '../lib/supabase';
import type { Plantation } from '../types/farmer';

// Helper to convert database row to Plantation type
const dbToPlantation = (row: any): Plantation => ({
  id: row.id,
  farmerId: row.farmer_id,
  location: row.location,
  size: row.size,
  tobaccoVariety: row.tobacco_variety,
  plantingDate: row.planting_date,
  expectedHarvestDate: row.expected_harvest_date,
  status: row.status,
  soilType: row.soil_type,
  irrigationType: row.irrigation_type,
});

// Helper to convert Plantation type to database format
const plantationToDb = (plantation: Partial<Plantation>) => ({
  farmer_id: plantation.farmerId,
  location: plantation.location,
  size: plantation.size,
  tobacco_variety: plantation.tobaccoVariety,
  planting_date: plantation.plantingDate,
  expected_harvest_date: plantation.expectedHarvestDate,
  status: plantation.status,
  soil_type: plantation.soilType,
  irrigation_type: plantation.irrigationType,
});

export const plantationService = {
  // Get all plantations
  async getAll(): Promise<Plantation[]> {
    const { data, error } = await supabase
      .from('plantations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(dbToPlantation);
  },

  // Get plantation by ID
  async getById(id: string): Promise<Plantation | null> {
    const { data, error } = await supabase
      .from('plantations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data ? dbToPlantation(data) : null;
  },

  // Get plantations by farmer ID
  async getByFarmerId(farmerId: string): Promise<Plantation[]> {
    const { data, error } = await supabase
      .from('plantations')
      .select('*')
      .eq('farmer_id', farmerId)
      .order('planting_date', { ascending: false });

    if (error) throw error;
    return data.map(dbToPlantation);
  },

  // Get plantations by status
  async getByStatus(status: Plantation['status']): Promise<Plantation[]> {
    const { data, error } = await supabase
      .from('plantations')
      .select('*')
      .eq('status', status)
      .order('planting_date', { ascending: false });

    if (error) throw error;
    return data.map(dbToPlantation);
  },

  // Create new plantation
  async create(plantation: Omit<Plantation, 'id'>): Promise<Plantation> {
    const { data, error } = await (supabase as any)
      .from('plantations')
      .insert([plantationToDb(plantation)])
      .select()
      .single();

    if (error) throw error;
    return dbToPlantation(data);
  },

  // Update plantation
  async update(id: string, plantation: Partial<Plantation>): Promise<Plantation> {
    const { data, error } = await (supabase as any)
      .from('plantations')
      .update(plantationToDb(plantation))
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return dbToPlantation(data);
  },

  // Delete plantation
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('plantations')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Search plantations
  async search(query: string): Promise<Plantation[]> {
    const { data, error } = await supabase
      .from('plantations')
      .select('*')
      .or(`location.ilike.%${query}%,tobacco_variety.ilike.%${query}%,soil_type.ilike.%${query}%`)
      .order('planting_date', { ascending: false });

    if (error) throw error;
    return data.map(dbToPlantation);
  },
};
