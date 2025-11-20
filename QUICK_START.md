# 🚀 Quick Start - Supabase Integration

Aplikasi Anda sudah siap terhubung dengan Supabase! Ikuti langkah-langkah berikut:

## ✅ Setup Langkah demi Langkah

### 1. Test Koneksi (5 menit)

Buka browser dan akses: **http://localhost:5173/test-supabase**

Halaman ini akan otomatis test koneksi ke Supabase dan memberikan feedback jika ada masalah.

### 2. Setup Database Supabase (10 menit)

1. **Buka Supabase Dashboard**
   - Login ke https://app.supabase.com
   - Pilih project Anda: `dbftjwiwvflbdfbcjoal`

2. **Buat Tabel Database**
   - Klik **SQL Editor** di sidebar kiri
   - Klik **New query**
   - Copy semua isi file `supabase-schema.sql`
   - Paste ke SQL Editor
   - Klik **Run** (atau tekan Cmd/Ctrl + Enter)
   - ✅ Tabel `farmers` dan `plantations` sudah dibuat!

3. **Insert Sample Data** (Optional tapi disarankan)
   - Di SQL Editor, buat query baru lagi
   - Copy semua isi file `supabase-seed.sql`
   - Paste ke SQL Editor
   - Klik **Run**
   - ✅ Database sekarang punya 8 farmers dan 11 plantations!

### 3. Verifikasi Setup

1. **Refresh halaman test**: http://localhost:5173/test-supabase
   - Harus muncul "Connection Successful!" ✅
   - Harus show jumlah farmers dan plantations

2. **Cek halaman utama**:
   - Home: http://localhost:5173/
   - Farmers: http://localhost:5173/farmers
   - Plantations: http://localhost:5173/plantations

## 📊 Struktur Data

### Tabel `farmers`
```sql
- id (UUID)
- name, age, photo, address, phone
- experience (tahun), land_size (hektar)
- tobacco_variety, certifications (array)
```

### Tabel `plantations`
```sql
- id (UUID)
- farmer_id (foreign key ke farmers)
- location, size, tobacco_variety
- planting_date, expected_harvest_date
- status ('planting' | 'growing' | 'harvesting' | 'harvested')
- soil_type, irrigation_type
```

## 🔧 Troubleshooting

### ❌ Error: "Failed to connect to Supabase"

**Cek environment variables:**
```bash
# Pastikan file .env ada di root project
cat .env
```

**Isi harus seperti ini:**
```env
VITE_SUPABASE_URL=https://dbftjwiwvflbdfbcjoal.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Solusi:**
1. Restart development server: `npm run dev`
2. Hard refresh browser: Cmd+Shift+R (Mac) atau Ctrl+F5 (Windows)

### ❌ Error: "relation does not exist"

**Artinya:** Tabel belum dibuat di Supabase

**Solusi:**
1. Jalankan `supabase-schema.sql` di SQL Editor
2. Pastikan tidak ada error saat run SQL

### ❌ Error: "permission denied"

**Artinya:** Row Level Security (RLS) policy belum dikonfigurasi

**Solusi:**
1. File `supabase-schema.sql` sudah include RLS policies
2. Pastikan Anda run SEMUA isi file, tidak sebagian
3. Cek di Supabase Dashboard → Authentication → Policies

## 🎯 Langkah Selanjutnya

### Fase 1: Setup Selesai ✅
- [x] Install dependencies
- [x] Configure Supabase credentials
- [x] Create database tables
- [x] Insert sample data
- [x] Test connection

### Fase 2: Development Features
- [ ] Tambah form untuk create farmer baru
- [ ] Tambah form untuk create plantation baru
- [ ] Tambah fitur edit farmer/plantation
- [ ] Tambah fitur delete farmer/plantation
- [ ] Tambah foto upload ke Supabase Storage

### Fase 3: Advanced Features (Optional)
- [ ] Real-time subscriptions (data update otomatis)
- [ ] Authentication (login/register)
- [ ] User roles (admin, farmer, viewer)
- [ ] Export data ke PDF/Excel
- [ ] Dashboard analytics dengan chart

## 📚 Dokumentasi Lengkap

- **Setup Guide**: `SUPABASE_SETUP.md`
- **Project README**: `README.md`
- **Database Schema**: `supabase-schema.sql`
- **Sample Data**: `supabase-seed.sql`

## 💡 Tips

1. **Test page** (`/test-supabase`) bisa digunakan kapan saja untuk cek koneksi
2. Semua operasi database sudah punya **loading state** dan **error handling**
3. Gunakan **React DevTools** untuk debug state management
4. Cek **browser console** jika ada error
5. Lihat **Supabase Dashboard → Logs** untuk debug database queries

## 🆘 Butuh Bantuan?

1. Cek file `SUPABASE_SETUP.md` untuk troubleshooting lengkap
2. Lihat Supabase Logs di Dashboard
3. Cek browser console untuk error messages
4. Test koneksi di `/test-supabase`

---

**Selamat! 🎉** Aplikasi Anda sekarang sudah terintegrasi dengan Supabase dan siap digunakan!
