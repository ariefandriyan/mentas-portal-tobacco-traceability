import { supabase } from '../lib/supabase';
import type { Farmer } from '../types/farmer';

// Helper to convert database row to Farmer type
const dbToFarmer = (row: any): Farmer => ({
  id: row.id,
  name: row.name,
  age: row.age,
  photo: row.photo || '',
  address: row.address,
  phone: row.phone,
  experience: row.experience,
  landSize: row.land_size,
  tobaccoVariety: row.tobacco_variety,
  certifications: row.certifications || [],
});

// Helper to convert Farmer type to database format
const farmerToDb = (farmer: Partial<Farmer>) => ({
  name: farmer.name,
  age: farmer.age,
  photo: farmer.photo,
  address: farmer.address,
  phone: farmer.phone,
  experience: farmer.experience,
  land_size: farmer.landSize,
  tobacco_variety: farmer.tobaccoVariety,
  certifications: farmer.certifications,
});

export const farmerService = {
  // Get all farmers
  async getAll(): Promise<Farmer[]> {
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw error;
    return data.map(dbToFarmer);
  },

  // Get farmer by ID
  async getById(id: string): Promise<Farmer | null> {
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data ? dbToFarmer(data) : null;
  },

  // Create new farmer
  async create(farmer: Omit<Farmer, 'id'>): Promise<Farmer> {
    const { data, error } = await (supabase as any)
      .from('farmers')
      .insert([farmerToDb(farmer)])
      .select()
      .single();

    if (error) throw error;
    return dbToFarmer(data);
  },

  // Update farmer
  async update(id: string, farmer: Partial<Farmer>): Promise<Farmer> {
    const { data, error } = await (supabase as any)
      .from('farmers')
      .update(farmerToDb(farmer))
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return dbToFarmer(data);
  },

  // Delete farmer
  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('farmers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Search farmers
  async search(query: string): Promise<Farmer[]> {
    const { data, error } = await supabase
      .from('farmers')
      .select('*')
      .or(`name.ilike.%${query}%,address.ilike.%${query}%,tobacco_variety.ilike.%${query}%`)
      .order('name', { ascending: true });

    if (error) throw error;
    return data.map(dbToFarmer);
  },
};
