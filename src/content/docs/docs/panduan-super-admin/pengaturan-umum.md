---
title: Pengaturan Umum
description: Konfigurasi identitas aplikasi, keamanan login, anti-kecurangan, dan perilaku sistem.
sidebar:
  order: 2
---

import { Aside } from '@astrojs/starlight/components';

## Mengakses Pengaturan Umum

1. Login ke panel admin di `/cabt` sebagai **Super Admin**
2. Klik ikon akun di kanan atas → pilih **Pengaturan Umum**

:::caution
Halaman ini hanya dapat diakses oleh akun dengan **level Super Admin (level 4)**. Akun Admin biasa tidak memiliki akses ke halaman ini.
:::

Perubahan pada Pengaturan Umum **langsung aktif** tanpa perlu restart aplikasi. Setiap bagian disimpan secara terpisah dengan tombol **"Simpan"** masing-masing.

---

## 1. Identitas Aplikasi

Pengaturan ini mengontrol identitas sekolah/institusi di seluruh sistem — header panel admin, dokumen cetak, kartu peserta, berita acara, dan halaman peserta.

| Setting | Keterangan | Contoh |
|---|---|---|
| **Nama Aplikasi** | Nama sistem yang tampil di tab browser dan header panel | `Sekolix CABT` |
| **Nama Sekolah** | Nama lengkap sekolah — tampil di semua dokumen cetak | `SMAN 1 Kotakata` |
| **Logo Sekolah** | URL gambar logo (PNG/SVG). Host sendiri atau gunakan CDN | `https://sekolah.sch.id/logo.png` |
| **Mode Maintenance** | Jika aktif, seluruh akses sistem diblokir kecuali Super Admin | — |

### Mode Maintenance

Saat **Mode Maintenance** diaktifkan:

- Peserta yang mencoba login mendapat halaman pemberitahuan pemeliharaan
- Guru dan Admin juga tidak dapat login
- **Hanya Super Admin** yang tetap dapat mengakses panel

Gunakan mode ini saat melakukan update aplikasi, migrasi database, atau pemeliharaan server. Pastikan tidak ada ujian sedang berlangsung sebelum mengaktifkan mode ini.

---

## 2. Autentikasi & Sesi

Mengatur keamanan proses login dan masa aktif sesi pengguna.

| Setting | Default | Keterangan |
|---|---|---|
| **Izinkan Multi-Login** | Mati | Aktif: satu akun bisa login dari beberapa perangkat sekaligus. Mati: login baru otomatis mengeluarkan sesi lama di perangkat lain |
| **Maks. Percobaan Login** | 5 | Jumlah kali login gagal sebelum akun dikunci sementara |
| **Durasi Lockout** | 15 menit | Lama akun terkunci setelah melebihi batas percobaan login gagal |
| **Timeout Sesi** | 0 | Menit tidak aktif sebelum sesi otomatis berakhir. `0` = tidak ada timeout otomatis |

### Rekomendasi

| Skenario | Rekomendasi |
|---|---|
| Lab komputer bersama | Aktifkan **Timeout Sesi** (60–120 menit) agar akun tidak tertinggal aktif di komputer |
| Lab dengan akun guru bersama | Aktifkan **Multi-Login** agar bisa diakses dari beberapa komputer sekaligus |
| Lingkungan keamanan tinggi | Set **Maks. Percobaan** ke 3, **Durasi Lockout** ke 30 menit |

---

## 3. Anti-Kecurangan (Proctoring)

Pengaturan ini mengontrol fitur pengawasan selama peserta mengerjakan ujian. Setiap fitur bersifat independen — bisa diaktifkan atau dimatikan sesuai kebutuhan.

### Perpindahan Tab / Window

| Setting | Default | Keterangan |
|---|---|---|
| **Maks. Perpindahan Tab** | 3 | Jumlah perpindahan tab/window yang diizinkan sebelum terkena tindakan. Isi `0` untuk tidak membatasi |
| **Tindakan saat Batas Tercapai** | Peringatan | `Peringatan`: tampilkan notifikasi keras tapi ujian lanjut. `Auto-Submit`: langsung kumpulkan ujian otomatis |

Setiap perpindahan tab dideteksi melalui event `visibilitychange` dan `blur` di browser. Sistem menghitung: berpindah tab lain, membuka tab baru, Alt+Tab ke aplikasi lain, atau meminimalkan browser.

:::tip[Rekomendasi konfigurasi]
- **Lab komputer + pengawas fisik**: Maks. 3 tab, tindakan Peringatan
- **Lab komputer tanpa pengawas**: Maks. 2 tab, tindakan Auto-Submit
- **Ujian online dari rumah**: Maks. 1 tab, tindakan Auto-Submit
- **Latihan / try-out informal**: Maks. 0 (tidak dibatasi)
:::

### Pencegahan Copy-Paste

| Setting | Default | Keterangan |
|---|---|---|
| **Cegah Copy-Paste** | Mati | Jika aktif: shortcut Ctrl+C, Ctrl+V, Ctrl+X, dan Ctrl+A dinonaktifkan di halaman ujian |

:::note
Fitur ini mempersulit namun **tidak sepenuhnya mencegah** copy-paste — pengguna yang melek teknologi masih bisa menggunakan cara alternatif. Kombinasikan dengan pengawas fisik untuk keamanan optimal.
:::

### Pencegahan Klik Kanan

| Setting | Default | Keterangan |
|---|---|---|
| **Cegah Klik Kanan** | Mati | Jika aktif: menu konteks klik kanan dinonaktifkan di seluruh halaman ujian |

### Mode Fullscreen Wajib

| Setting | Default | Keterangan |
|---|---|---|
| **Wajib Fullscreen** | Mati | Jika aktif: peserta wajib membuka ujian dalam mode layar penuh. Keluar dari fullscreen dihitung sebagai perpindahan tab |

Saat mode fullscreen aktif:
- Browser meminta izin masuk fullscreen saat peserta klik "Mulai Ujian"
- Jika peserta keluar dari fullscreen (tekan Esc), sistem menampilkan peringatan
- Keluar fullscreen dihitung menggunakan counter perpindahan tab yang sama

### Batas Ukuran Upload File

| Setting | Default | Keterangan |
|---|---|---|
| **Ukuran Maksimal Upload** | 5 MB | Batas ukuran file yang bisa diupload peserta untuk soal Uraian. Format yang diterima: JPEG, PNG, PDF |

### Whitelist IP Ujian

| Setting | Default | Keterangan |
|---|---|---|
| **Whitelist IP** | Kosong | Daftar IP yang diizinkan mengakses halaman ujian. Jika kosong, semua IP diizinkan |

Format konfigurasi — satu entri per baris:

```
# IP tunggal
192.168.1.50

# Seluruh subnet lab komputer (192.168.1.1 – 192.168.1.254)
192.168.1.0/24

# Beberapa range
10.0.0.0/8
172.16.5.100
```

:::caution[Penting sebelum mengaktifkan Whitelist IP]
- Pastikan **semua komputer peserta** sudah masuk dalam range IP yang didaftarkan sebelum ujian dimulai
- Uji konfigurasi dari satu komputer lab terlebih dahulu — coba buka halaman ujian dan pastikan berhasil
- Jika aplikasi berjalan di belakang reverse proxy (Nginx, load balancer), tambahkan `APP_TRUSTED_PROXIES=*` di file `.env` agar IP klien terbaca benar oleh aplikasi
- IP peserta yang tidak terdaftar akan mendapat error **403 Forbidden** dan tidak bisa mengerjakan ujian
:::

---

## 4. Penilaian & Tampilan Hasil

Mengatur kapan dan bagaimana nilai serta pembahasan ditampilkan kepada peserta.

| Setting | Default | Keterangan |
|---|---|---|
| **Mode Penilaian Default** | Otomatis | Mode penilaian untuk **paket ujian baru**. `Otomatis`: nilai dihitung langsung setelah submit. `Manual`: menunggu guru menilai soal uraian. Dapat diubah secara per-paket |
| **Tampilkan Ranking** | Aktif | Apakah peserta bisa melihat peringkat mereka di halaman hasil setelah submit |
| **Tampilkan Pembahasan** | Saat Sesi Selesai | Kapan peserta bisa melihat kunci jawaban dan pembahasan soal |

### Opsi Tampilkan Pembahasan

| Opsi | Keterangan |
|---|---|
| **Tidak Pernah** | Peserta tidak bisa melihat pembahasan sama sekali |
| **Segera** | Pembahasan langsung tersedia setelah peserta submit |
| **Saat Sesi Selesai** | Pembahasan baru tersedia setelah guru menutup sesi (status Selesai) — **direkomendasikan** untuk mencegah soal bocor ke peserta lain yang belum ujian |

---

## 5. Livescore

Mengatur fitur tampilan ranking real-time yang dapat dilihat selama atau setelah ujian berlangsung.

| Setting | Default | Keterangan |
|---|---|---|
| **Aktifkan Livescore** | Aktif | Jika mati, halaman `/sesi/{id}/livescore` tidak dapat diakses oleh siapapun |
| **Mode Publik** | Mati | Jika aktif: halaman livescore bisa dibuka tanpa login. Jika mati: hanya pengguna yang login yang bisa melihat |

:::tip
Aktifkan **Mode Publik** jika ingin menampilkan livescore di layar proyektor di ruang ujian tanpa harus login terlebih dahulu di komputer proyektor.
:::

---

## 6. Soal Audio

Mengatur batas ukuran file audio yang bisa diupload guru untuk soal bertipe audio.

| Setting | Default | Keterangan |
|---|---|---|
| **Ukuran Maksimal Audio** | 10 MB | Batas ukuran file audio per soal. Format yang diterima: `.mp3`, `.wav` |

:::note
File audio tersimpan di `storage/app/public/audio/`. Pastikan storage sudah di-link (`php artisan storage:link`) dan sisa disk mencukupi jika banyak soal audio.
:::

---

## 7. Notifikasi Email

Mengatur pengiriman email otomatis ke peserta saat status sesi berubah.

| Setting | Default | Keterangan |
|---|---|---|
| **Aktifkan Notifikasi Email** | Mati | Jika aktif, sistem mengirim email ke peserta terdaftar saat sesi diaktifkan dan saat sesi ditutup |
| **Email Pengirim** | (dari `.env`) | Alamat email yang digunakan sebagai pengirim — diambil dari `MAIL_FROM_ADDRESS` di `.env` |

:::caution
Fitur ini membutuhkan **queue worker** yang berjalan di background (`php artisan queue:work`). Tanpa queue worker, email tidak akan terkirim meski pengaturan diaktifkan.

Jika menggunakan shared hosting tanpa akses queue daemon, gunakan cron job setiap menit untuk `php artisan schedule:run` sebagai alternatif.
:::

:::tip
Sebelum mengaktifkan, uji konfigurasi SMTP di `.env` terlebih dahulu dengan perintah:
```bash
php artisan tinker
Mail::raw('Test', fn($m) => $m->to('youremail@example.com')->subject('Test'));
```
:::

---

## 8. Pengumuman

Mengatur perilaku default fitur pengumuman yang ditampilkan di dashboard peserta dan guru.

| Setting | Default | Keterangan |
|---|---|---|
| **Tampilkan Pengumuman di Dashboard** | Aktif | Jika aktif, pengumuman yang berstatus `aktif` ditampilkan di bagian atas dashboard peserta/guru |

Pengumuman dikelola dari menu **Pengumuman** di menu akun (klik avatar di kanan atas). Setiap pengumuman dapat ditargetkan ke semua pengguna atau ke rombel tertentu, dan memiliki tanggal kedaluwarsa.
