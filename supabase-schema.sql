-- Create farmers table
CREATE TABLE IF NOT EXISTS farmers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  photo TEXT,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  experience INTEGER NOT NULL,
  land_size NUMERIC NOT NULL,
  tobacco_variety TEXT NOT NULL,
  certifications TEXT[]
);

-- Create plantations table
CREATE TABLE IF NOT EXISTS plantations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  farmer_id UUID NOT NULL REFERENCES farmers(id) ON DELETE CASCADE,
  location TEXT NOT NULL,
  size NUMERIC NOT NULL,
  tobacco_variety TEXT NOT NULL,
  planting_date DATE NOT NULL,
  expected_harvest_date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('planting', 'growing', 'harvesting', 'harvested')),
  soil_type TEXT NOT NULL,
  irrigation_type TEXT NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plantations_farmer_id ON plantations(farmer_id);
CREATE INDEX IF NOT EXISTS idx_plantations_status ON plantations(status);
CREATE INDEX IF NOT EXISTS idx_farmers_name ON farmers(name);

-- Enable Row Level Security (RLS)
ALTER TABLE farmers ENABLE ROW LEVEL SECURITY;
ALTER TABLE plantations ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Enable read access for all users" ON farmers
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON plantations
  FOR SELECT USING (true);

-- Create policies for authenticated write access
-- You can modify these based on your authentication requirements
CREATE POLICY "Enable insert for authenticated users only" ON farmers
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON farmers
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON farmers
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only" ON plantations
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON plantations
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON plantations
  FOR DELETE USING (auth.role() = 'authenticated');
