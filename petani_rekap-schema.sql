-- Create petani_rekap table
CREATE TABLE petani_rekap (
  id BIGSERIAL PRIMARY KEY,
  nama VARCHAR(100),
  umur INTEGER,
  nomor_hp VARCHAR(40),
  alamat_petani TEXT,
  jabatan VARCHAR(100),
  kelompok_tani VARCHAR(100),
  alamat_lahan TEXT,
  aksesibilitas VARCHAR(100),
  luas_lahan FLOAT,
  koordinat VARCHAR(100),
  tanggal_tanam DATE,
  tanggal_panen DATE,
  varietas VARCHAR(100),
  estimasi_panen TEXT,
  penggunaan_pestisida TEXT,
  sudah_ada_pembeli TEXT,
  nama_pembeli VARCHAR(100),
  alamat_pembeli TEXT,
  no_hp_pembeli VARCHAR(100),
  estimasi_harga_jual_per_kilo FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index for common queries
CREATE INDEX idx_petani_rekap_nama ON petani_rekap(nama);
CREATE INDEX idx_petani_rekap_kelompok_tani ON petani_rekap(kelompok_tani);
CREATE INDEX idx_petani_rekap_tanggal_tanam ON petani_rekap(tanggal_tanam);

-- Enable Row Level Security (RLS)
ALTER TABLE petani_rekap ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (adjust as needed)
CREATE POLICY "Allow public read access" ON petani_rekap
  FOR SELECT USING (true);

-- Create policy to allow authenticated users to insert (adjust as needed)
CREATE POLICY "Allow authenticated insert" ON petani_rekap
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update (adjust as needed)
CREATE POLICY "Allow authenticated update" ON petani_rekap
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to delete (adjust as needed)
CREATE POLICY "Allow authenticated delete" ON petani_rekap
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_petani_rekap_updated_at
  BEFORE UPDATE ON petani_rekap
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
