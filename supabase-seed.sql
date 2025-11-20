-- Insert sample farmers data
INSERT INTO farmers (id, name, age, photo, address, phone, experience, land_size, tobacco_variety, certifications) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'John Smith', 45, '', 'North Village, Plot 12', '+62 812-3456-7890', 20, 5.5, 'Virginia', ARRAY['Organic Certified', 'GAP Certified']),
('550e8400-e29b-41d4-a716-446655440002', 'Maria Garcia', 38, '', 'East Village, Plot 8', '+62 813-2345-6789', 15, 4.2, 'Burley', ARRAY['GAP Certified']),
('550e8400-e29b-41d4-a716-446655440003', 'David Wong', 52, '', 'South Village, Plot 5', '+62 814-3456-7891', 25, 7.8, 'Oriental', ARRAY['Organic Certified', 'Fair Trade', 'GAP Certified']),
('550e8400-e29b-41d4-a716-446655440004', 'Sarah Johnson', 41, '', 'West Village, Plot 15', '+62 815-4567-8901', 18, 6.3, 'Virginia', ARRAY['GAP Certified']),
('550e8400-e29b-41d4-a716-446655440005', 'Ahmad Hassan', 48, '', 'Central Village, Plot 3', '+62 816-5678-9012', 22, 5.0, 'Burley', ARRAY['Organic Certified']),
('550e8400-e29b-41d4-a716-446655440006', 'Linda Chen', 36, '', 'North Village, Plot 20', '+62 817-6789-0123', 12, 3.5, 'Virginia', ARRAY[]::TEXT[]),
('550e8400-e29b-41d4-a716-446655440007', 'Robert Miller', 55, '', 'East Village, Plot 18', '+62 818-7890-1234', 30, 8.5, 'Oriental', ARRAY['Organic Certified', 'GAP Certified']),
('550e8400-e29b-41d4-a716-446655440008', 'Priya Sharma', 42, '', 'South Village, Plot 11', '+62 819-8901-2345', 16, 4.8, 'Burley', ARRAY['Fair Trade']);

-- Insert sample plantations data
INSERT INTO plantations (farmer_id, location, size, tobacco_variety, planting_date, expected_harvest_date, status, soil_type, irrigation_type) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'North Field A', 2.5, 'Virginia', '2024-03-15', '2024-09-15', 'growing', 'Sandy Loam', 'Drip Irrigation'),
('550e8400-e29b-41d4-a716-446655440001', 'North Field B', 3.0, 'Virginia', '2024-04-01', '2024-10-01', 'growing', 'Clay Loam', 'Sprinkler'),
('550e8400-e29b-41d4-a716-446655440002', 'East Field C', 4.2, 'Burley', '2024-02-20', '2024-08-20', 'harvesting', 'Silt Loam', 'Flood Irrigation'),
('550e8400-e29b-41d4-a716-446655440003', 'South Field D', 3.5, 'Oriental', '2024-03-10', '2024-09-10', 'growing', 'Sandy Loam', 'Drip Irrigation'),
('550e8400-e29b-41d4-a716-446655440003', 'South Field E', 4.3, 'Oriental', '2024-01-15', '2024-07-15', 'harvested', 'Clay', 'Drip Irrigation'),
('550e8400-e29b-41d4-a716-446655440004', 'West Field F', 6.3, 'Virginia', '2024-05-01', '2024-11-01', 'planting', 'Loam', 'Sprinkler'),
('550e8400-e29b-41d4-a716-446655440005', 'Central Field G', 5.0, 'Burley', '2024-03-25', '2024-09-25', 'growing', 'Sandy Clay', 'Flood Irrigation'),
('550e8400-e29b-41d4-a716-446655440006', 'North Field H', 3.5, 'Virginia', '2024-04-10', '2024-10-10', 'growing', 'Silt Loam', 'Drip Irrigation'),
('550e8400-e29b-41d4-a716-446655440007', 'East Field I', 4.0, 'Oriental', '2024-02-10', '2024-08-10', 'harvesting', 'Sandy Loam', 'Sprinkler'),
('550e8400-e29b-41d4-a716-446655440007', 'East Field J', 4.5, 'Oriental', '2024-03-05', '2024-09-05', 'growing', 'Clay Loam', 'Drip Irrigation'),
('550e8400-e29b-41d4-a716-446655440008', 'South Field K', 4.8, 'Burley', '2024-01-20', '2024-07-20', 'harvested', 'Loam', 'Flood Irrigation');
