import { useState, useEffect } from 'react';
import { plantationService } from '../services/plantationService';
import type { Plantation } from '../types/farmer';

export const usePlantations = () => {
  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPlantations = async () => {
    try {
      setLoading(true);
      const data = await plantationService.getAll();
      setPlantations(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching plantations:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlantations();
  }, []);

  const createPlantation = async (plantation: Omit<Plantation, 'id'>) => {
    try {
      const newPlantation = await plantationService.create(plantation);
      setPlantations([...plantations, newPlantation]);
      return newPlantation;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updatePlantation = async (id: string, plantation: Partial<Plantation>) => {
    try {
      const updatedPlantation = await plantationService.update(id, plantation);
      setPlantations(plantations.map(p => p.id === id ? updatedPlantation : p));
      return updatedPlantation;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deletePlantation = async (id: string) => {
    try {
      await plantationService.delete(id);
      setPlantations(plantations.filter(p => p.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const searchPlantations = async (query: string) => {
    try {
      setLoading(true);
      const data = await plantationService.search(query);
      setPlantations(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error searching plantations:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = async (status: Plantation['status']) => {
    try {
      setLoading(true);
      const data = await plantationService.getByStatus(status);
      setPlantations(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
      console.error('Error filtering plantations:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    plantations,
    loading,
    error,
    fetchPlantations,
    createPlantation,
    updatePlantation,
    deletePlantation,
    searchPlantations,
    filterByStatus,
  };
};
