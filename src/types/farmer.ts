export interface Farmer {
  id: string;
  name: string;
  age: number;
  photo: string;
  address: string;
  phone: string;
  experience: number; // years of farming experience
  landSize: number; // in hectares
  tobaccoVariety: string;
  certifications?: string[];
}

export interface Plantation {
  id: string;
  farmerId: string;
  location: string;
  size: number; // in hectares
  tobaccoVariety: string;
  plantingDate: string;
  expectedHarvestDate: string;
  status: 'planting' | 'growing' | 'harvesting' | 'harvested';
  soilType: string;
  irrigationType: string;
}

export interface Village {
  name: string;
  totalFarmers: number;
  totalLandArea: number;
  description: string;
}
