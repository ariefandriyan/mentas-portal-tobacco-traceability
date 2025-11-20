# Supabase Integration Guide

## Setup Instructions

### 1. Create Database Tables

Jalankan SQL berikut di Supabase SQL Editor untuk membuat tabel:

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Buka **SQL Editor** dari sidebar
4. Buat query baru dan copy-paste isi file `supabase-schema.sql`
5. Klik **Run** untuk menjalankan

### 2. Insert Sample Data (Optional)

Jika Anda ingin mengisi database dengan data sample:

1. Di SQL Editor, buat query baru
2. Copy-paste isi file `supabase-seed.sql`
3. Klik **Run** untuk menjalankan

### 3. Environment Variables

File `.env` sudah dikonfigurasi dengan credentials Supabase Anda:

```env
VITE_SUPABASE_URL=https://dbftjwiwvflbdfbcjoal.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Row Level Security (RLS) Policies

Schema sudah termasuk RLS policies:

- **Read (SELECT)**: Semua user bisa membaca data (public access)
- **Write (INSERT/UPDATE/DELETE)**: Hanya authenticated users

Jika Anda ingin mengubah policy:
1. Buka **Authentication** > **Policies** di Supabase Dashboard
2. Pilih table yang ingin dimodifikasi
3. Edit atau tambahkan policy baru

### 5. Authentication (Optional)

Jika Anda ingin menambahkan authentication:

```typescript
// Example login
import { supabase } from './lib/supabase';

const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

// Example signup
const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};
```

## API Usage

### Farmers

```typescript
import { useFarmers } from './hooks/useFarmers';

function MyComponent() {
  const { 
    farmers,           // Array of farmers
    loading,           // Loading state
    error,             // Error object if any
    createFarmer,      // Function to create farmer
    updateFarmer,      // Function to update farmer
    deleteFarmer,      // Function to delete farmer
    searchFarmers,     // Function to search farmers
  } = useFarmers();

  // Example: Create new farmer
  const handleCreate = async () => {
    await createFarmer({
      name: 'New Farmer',
      age: 35,
      photo: '',
      address: 'Village Address',
      phone: '+62 xxx-xxxx-xxxx',
      experience: 10,
      landSize: 3.5,
      tobaccoVariety: 'Virginia',
      certifications: ['GAP Certified'],
    });
  };
}
```

### Plantations

```typescript
import { usePlantations } from './hooks/usePlantations';

function MyComponent() {
  const { 
    plantations,        // Array of plantations
    loading,            // Loading state
    error,              // Error object if any
    createPlantation,   // Function to create plantation
    updatePlantation,   // Function to update plantation
    deletePlantation,   // Function to delete plantation
    searchPlantations,  // Function to search plantations
    filterByStatus,     // Function to filter by status
  } = usePlantations();

  // Example: Update plantation status
  const handleUpdate = async (id: string) => {
    await updatePlantation(id, {
      status: 'harvesting',
    });
  };
}
```

## Database Schema

### farmers table
- `id` (UUID, Primary Key)
- `created_at` (Timestamp)
- `name` (Text)
- `age` (Integer)
- `photo` (Text, nullable)
- `address` (Text)
- `phone` (Text)
- `experience` (Integer)
- `land_size` (Numeric)
- `tobacco_variety` (Text)
- `certifications` (Text Array, nullable)

### plantations table
- `id` (UUID, Primary Key)
- `created_at` (Timestamp)
- `farmer_id` (UUID, Foreign Key to farmers)
- `location` (Text)
- `size` (Numeric)
- `tobacco_variety` (Text)
- `planting_date` (Date)
- `expected_harvest_date` (Date)
- `status` (Text: 'planting' | 'growing' | 'harvesting' | 'harvested')
- `soil_type` (Text)
- `irrigation_type` (Text)

## Troubleshooting

### Error: "Missing Supabase environment variables"
- Pastikan file `.env` ada di root project
- Restart development server setelah mengubah `.env`

### Error: "relation does not exist"
- Jalankan `supabase-schema.sql` di SQL Editor
- Periksa nama table sudah benar (huruf kecil semua)

### Error: "permission denied"
- Periksa RLS policies di Supabase Dashboard
- Pastikan policy mengizinkan operasi yang Anda lakukan

### Data tidak muncul
- Periksa browser console untuk error
- Pastikan credentials di `.env` sudah benar
- Jalankan `supabase-seed.sql` untuk insert sample data

## Next Steps

1. ✅ Schema database sudah dibuat
2. ✅ Hooks untuk CRUD operations sudah siap
3. ✅ Pages sudah terintegrasi dengan Supabase
4. 🔄 (Optional) Tambahkan authentication
5. 🔄 (Optional) Tambahkan real-time subscriptions
6. 🔄 (Optional) Tambahkan form untuk create/edit data
