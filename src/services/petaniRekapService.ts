import { supabase } from '../lib/supabase';

export interface PetaniRekap {
  id: number;
  nama: string;
  umur: number;
  nomor_hp: string;
  alamat_petani: string;
  jabatan: string;
  kelompok_tani: string;
  alamat_lahan: string;
  aksesibilitas: string;
  luas_lahan: number;
  koordinat: string;
  tanggal_tanam: string;
  tanggal_panen: string;
  varietas: string;
  estimasi_panen: string;
  penggunaan_pestisida: string;
  sudah_ada_pembeli: string;
  nama_pembeli: string;
  alamat_pembeli: string;
  no_hp_pembeli: string;
  estimasi_harga_jual_per_kilo: number;
  created_at: string;
  updated_at: string;
}

export const petaniRekapService = {
  async getAll(limit = 10) {
    const { data, error } = await supabase
      .from('petani_rekap')
      .select('*')
      .limit(limit);

    if (error) throw error;
    return data as PetaniRekap[];
  },

  async getById(id: number) {
    const { data, error } = await supabase
      .from('petani_rekap')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as PetaniRekap;
  },
};
