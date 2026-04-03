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

- Pastikan ukuran file tidak melebihi batas yang dikonfigurasi (cek **Pengaturan Umum → Ukuran Maksimal Upload**)
- Format yang diterima: JPEG, PNG, PDF
- Pastikan koneksi internet stabil saat upload

### Audio soal tidak bisa diputar

- Pastikan browser mendukung format audio MP3/WAV (semua browser modern mendukung)
- Cek volume speaker tidak dalam kondisi mute
- Jika audio tidak keluar sama sekali, coba refresh halaman — audio di-stream dari server dan butuh waktu load pada koneksi lambat
- Pastikan autoplay tidak diblokir browser (beberapa browser memblokir autoplay; klik tombol Play secara manual)

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

### Import Excel soal gagal

- Pastikan menggunakan template yang didownload dari sistem (bukan format custom)
- Cek kolom yang wajib diisi: minimal nama, username, password untuk import user
- Untuk soal, pastikan kolom tipe diisi dengan kode yang benar: `PG`, `PG_BOBOT`, `PGJ`, `BS`, `JODOH`, `ISIAN`, `CLOZE`, `URAIAN`
- Untuk soal CLOZE, pastikan teks soal mengandung penanda blank `[_1]`, `[_2]`, dst. dan kolom kunci jawaban per blank sudah diisi

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

### Notifikasi email tidak terkirim

1. Pastikan konfigurasi SMTP di `.env` sudah benar (`MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`)
2. Pastikan **queue worker** sedang berjalan: `php artisan queue:work`
3. Cek tabel `jobs` di database — jika ada entri yang menumpuk tanpa diproses, berarti queue worker mati
4. Cek `storage/logs/laravel.log` untuk pesan error SMTP
5. Uji koneksi SMTP secara langsung:
   ```bash
   php artisan tinker
   Mail::raw('Test', fn($m) => $m->to('admin@example.com')->subject('Test'));
   ```

### File audio soal tidak bisa diupload oleh guru

- Pastikan ukuran file tidak melebihi batas di **Pengaturan Umum → Ukuran Maksimal Audio**
- Format yang diterima: `.mp3`, `.wav`
- Jalankan `php artisan storage:link` jika belum pernah dilakukan — audio disimpan di public storage
