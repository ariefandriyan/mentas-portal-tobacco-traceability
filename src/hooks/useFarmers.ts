import { useState, useEffect } from 'react';
import { farmerService } from '../services/farmerService';
import type { Farmer } from '../types/farmer';

export const useFarmers = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const data = await farmerService.getAll();
      setFarmers(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching farmers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const createFarmer = async (farmer: Omit<Farmer, 'id'>) => {
    try {
      const newFarmer = await farmerService.create(farmer);
      setFarmers([...farmers, newFarmer]);
      return newFarmer;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateFarmer = async (id: string, farmer: Partial<Farmer>) => {
    try {
      const updatedFarmer = await farmerService.update(id, farmer);
      setFarmers(farmers.map(f => f.id === id ? updatedFarmer : f));
      return updatedFarmer;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteFarmer = async (id: string) => {
    try {
      await farmerService.delete(id);
      setFarmers(farmers.filter(f => f.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const searchFarmers = async (query: string) => {
    try {
      setLoading(true);
      const data = await farmerService.search(query);
      setFarmers(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error searching farmers:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    farmers,
    loading,
    error,
    fetchFarmers,
    createFarmer,
    updateFarmer,
    deleteFarmer,
    searchFarmers,
  };
};
