---
title: Sesi & Laporan (Admin)
description: Memantau semua sesi ujian lintas guru dan mengakses laporan lengkap level sekolah.
sidebar:
  order: 3
---

## Kelebihan Akses Admin

Berbeda dengan Guru yang hanya melihat sesi buatannya sendiri, **Admin dapat melihat semua sesi dari semua guru** di dalam sistem. Ini memungkinkan Admin untuk:

- Memantau semua ujian yang sedang berlangsung di seluruh sekolah dari satu tempat
- Mengintervensi sesi bermasalah (tutup paksa, keluarkan peserta)
- Mengakses laporan dan statistik dari sesi manapun

## Melihat Semua Sesi Ujian

1. Login ke panel admin di `/cabt`
2. Di sidebar, klik **Sesi Ujian**

Tabel sesi menampilkan **semua sesi dari semua guru**, dengan kolom:

| Kolom | Keterangan |
|---|---|
| **Nama Sesi** | Nama sesi ujian |
| **Paket** | Paket ujian yang digunakan |
| **Dibuat Oleh** | Nama guru yang membuat sesi |
| **Waktu Mulai** | Jadwal mulai sesi |
| **Waktu Selesai** | Jadwal berakhir sesi |
| **Status** | Draft / Aktif / Selesai / Dibatalkan |
| **Jumlah Peserta** | Total peserta terdaftar di sesi |

## Filter & Pencarian Sesi

Gunakan filter di atas tabel untuk mempersempit daftar:

- **Filter Guru** — tampilkan hanya sesi dari guru tertentu
- **Filter Status** — tampilkan hanya sesi Aktif, Selesai, dst.
- **Filter Tanggal** — pilih rentang tanggal pelaksanaan
- **Pencarian teks** — cari berdasarkan nama sesi atau nama paket

## Memantau Sesi Aktif

Admin dapat membuka Monitor untuk **sesi milik siapapun**:

1. Di tabel sesi, temukan sesi berstatus **Aktif**
2. Klik tombol **"Monitor"** di baris sesi tersebut
3. Halaman monitor real-time terbuka

Di halaman monitor, Admin memiliki semua kewenangan yang sama dengan guru pembuat sesi — termasuk tombol **"Paksa Keluar"** per peserta.

## Menutup / Membatalkan Sesi

Jika diperlukan (sesi bermasalah, indikasi kecurangan massal, atau kesalahan jadwal):

1. Buka detail sesi yang ingin ditutup
2. Klik tombol **"Selesaikan"** atau **"Batalkan"** sesuai situasi
3. Konfirmasi tindakan

:::caution
Membatalkan sesi akan menghentikan semua attempt yang sedang berjalan. Peserta yang sedang mengerjakan akan mendapat pemberitahuan bahwa sesi telah ditutup. Gunakan hanya jika benar-benar diperlukan karena tindakan ini **tidak dapat dibatalkan**.
:::

## Menghapus Attempt Peserta

Jika peserta perlu mengulang ujian karena masalah teknis di luar kendali (mati listrik mendadak, perangkat rusak saat ujian):

1. Buka detail sesi → klik tab **"Peserta"**
2. Temukan peserta yang bersangkutan
3. Klik **"Hapus Attempt"** di baris peserta tersebut
4. Konfirmasi penghapusan

Setelah attempt dihapus, peserta dapat memulai ujian dari awal — asalkan sesi masih berstatus Aktif dan batas max_pengulangan belum terlampaui.

## Laporan Level Admin

Admin dapat mengakses laporan untuk sesi manapun, tidak terbatas sesi milik sendiri.

### Rekap Nilai

1. Klik **Laporan** di sidebar → **Rekap Nilai**
2. Pilih sesi dari dropdown — semua sesi tersedia
3. Tabel rekap nilai semua peserta tampil lengkap dengan statistik deskriptif
4. Klik **"Export Excel"** untuk mengunduh file `.xlsx`

### Statistik Soal (Item Analysis)

Fitur analisis butir soal membantu mengevaluasi **kualitas setiap soal** dalam sebuah paket ujian berdasarkan data jawaban nyata dari peserta.

1. Klik **Laporan** → **Statistik Soal**
2. Pilih sesi ujian
3. Tabel analisis butir soal tampil

| Kolom | Keterangan |
|---|---|
| **No.** | Nomor urut soal dalam paket |
| **Teks Soal** | Cuplikan awal teks soal |
| **Tipe** | Tipe soal (PG, PGJ, ISIAN, dll.) |
| **P-value** | Indeks kesulitan — proporsi peserta yang menjawab benar (0–1) |
| **D-value** | Indeks daya beda — kemampuan soal membedakan peserta pandai dari kurang pandai (0–1) |
| **Kategori P** | Mudah / Sedang / Sulit |
| **Kategori D** | Baik Sekali / Baik / Cukup / Kurang Baik |

#### Interpretasi P-value (Indeks Kesulitan)

| Nilai P | Kategori | Arti |
|---|---|---|
| 0.00 – 0.30 | **Sulit** | Kurang dari 30% peserta menjawab benar |
| 0.31 – 0.70 | **Sedang** | Tingkat kesulitan ideal untuk ujian seleksi |
| 0.71 – 1.00 | **Mudah** | Lebih dari 70% peserta menjawab benar |

#### Interpretasi D-value (Daya Beda)

| Nilai D | Kategori | Rekomendasi |
|---|---|---|
| ≥ 0.40 | **Baik Sekali** | Gunakan tanpa revisi |
| 0.30 – 0.39 | **Baik** | Pertahankan |
| 0.20 – 0.29 | **Cukup** | Perlu sedikit revisi |
| < 0.20 | **Kurang Baik** | Revisi total atau buang dari bank soal |
| < 0 | **Negatif** | Kemungkinan kunci jawaban salah — periksa segera |

:::tip
Jalankan statistik soal setelah setiap ujian selesai untuk menjaga kualitas bank soal. Nonaktifkan atau hapus soal dengan D-value rendah agar tidak dipakai di ujian berikutnya.
:::

### Dokumen Cetak

Admin memiliki akses ke semua dokumen cetak untuk semua sesi:

| Dokumen | Deskripsi |
|---|---|
| **Daftar Hadir** | Daftar peserta per rombel dengan kolom tanda tangan |
| **Berita Acara** | Rekap formal pelaksanaan ujian dengan distribusi nilai dan kolom tanda tangan pengawas |
| **Kartu Peserta** | Kartu identitas berisi nomor peserta, nama, nama sesi — dicetak grid siap potong |

Semua dokumen menyertakan nama sekolah dan logo sesuai konfigurasi di **Pengaturan Umum**.
