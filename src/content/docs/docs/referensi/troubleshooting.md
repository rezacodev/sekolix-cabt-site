---
title: Troubleshooting
description: Solusi untuk masalah umum yang ditemui pengguna Sekolix CABT.
sidebar:
  order: 2
---

## Peserta

### Timer terus jalan padahal koneksi putus

Timer dikontrol server. Saat koneksi kembali, sisa waktu akan disinkronkan dengan server. Jawaban yang sudah dikirim sebelum putus tersimpan aman di database.

### Halaman ujian tidak bisa dibuka, redirect ke konfirmasi terus

Kemungkinan attempt sudah expired (waktu habis) atau sesi sudah ditutup admin. Hubungi pengawas.

### "Upload gagal" saat upload file URAIAN

- Pastikan ukuran file tidak melebihi batas yang dikonfigurasi (default 5 MB)
- Format yang diterima: JPEG, PNG, PDF
- Pastikan koneksi internet stabil saat upload

### Peserta tiba-tiba di-logout / keluar paksa

Kemungkinan:
1. **Perpindahan tab** terlalu sering dan `tab_switch_action = submit` diaktifkan
2. Admin/Guru mengklik tombol **"Paksa Keluar"** dari monitor
3. Session timeout karena tidak aktif terlalu lama

---

## Guru / Admin

### Nilai akhir peserta tidak muncul setelah ujian selesai

Jika paket menggunakan **mode penilaian manual**, nilai akhir baru muncul setelah guru menyelesaikan grading semua soal uraian dan klik **"Hitung Ulang Nilai"**.

### Tidak bisa edit soal di paket ujian

Paket yang sudah digunakan di sesi aktif atau selesai **tidak bisa diubah soalnya** (soft-lock). Buat paket baru jika perlu perubahan soal.

### Import Excel gagal

- Pastikan menggunakan template yang didownload dari sistem (bukan format custom)
- Cek kolom yang wajib diisi: minimal nama, username, password untuk import user
- Untuk soal, pastikan kolom tipe diisi dengan kode yang benar: `PG`, `PGJ`, `ISIAN`, dst.

---

## Super Admin

### Storage penuh / upload gagal semua

Cek sisa disk di server. File upload URAIAN tersimpan di `storage/app/private/uraian/`. Bisa dihapus file lama yang sudah tidak dibutuhkan.

### Setelah update `.env`, pengaturan tidak berubah

Jalankan:
```bash
php artisan config:clear
php artisan config:cache
```

### Whitelist IP tidak berfungsi

Jika aplikasi berada di belakang reverse proxy (Nginx, load balancer), pastikan konfigurasi `APP_TRUSTED_PROXIES` di `.env` sudah benar:
```ini
APP_TRUSTED_PROXIES=*
```
Atau set ke IP spesifik proxy Anda.
