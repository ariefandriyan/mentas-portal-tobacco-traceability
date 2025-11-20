import { useState, useEffect } from 'react';
import { petaniRekapService, type PetaniRekap } from '../services/petaniRekapService';

export const usePetaniRekap = () => {
  const [petaniRekap, setPetaniRekap] = useState<PetaniRekap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPetaniRekap = async () => {
      try {
        setLoading(true);
        const data = await petaniRekapService.getAll(1000); // Get all records
        setPetaniRekap(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching petani rekap:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPetaniRekap();
  }, []);

  return { petaniRekap, loading, error };
};
