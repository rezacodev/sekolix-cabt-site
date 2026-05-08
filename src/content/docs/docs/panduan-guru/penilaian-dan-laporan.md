---
title: Penilaian & Laporan
description: Manual grading soal uraian dan mengakses laporan hasil ujian.
sidebar:
  order: 4
---

## Manual Grading (Soal Uraian)

Jika paket ujian mengandung soal **Uraian** dan **Mode Penilaian** diatur ke `Manual`, guru perlu menilai jawaban peserta secara manual.

### Langkah Penilaian

1. Di sidebar, klik **Penilaian**
2. Daftar sesi yang memiliki soal uraian belum dinilai akan muncul — lengkap dengan statistik: total peserta, sudah dinilai, dan menunggu penilaian
3. Klik sesi yang ingin dinilai
4. Daftar peserta tampil — klik peserta untuk membuka halaman penilaian individual
5. Untuk setiap soal uraian: lihat jawaban teks dan/atau file yang diupload peserta, lalu masukkan **nilai** (0 – bobot soal)
6. Setelah semua soal uraian peserta dinilai, klik **"Hitung Ulang Nilai"** → sistem otomatis menghitung nilai akhir peserta

:::note
Selama ada soal uraian yang belum dinilai, nilai akhir peserta **tidak akan muncul** di halaman hasil peserta.
:::

## Laporan Hasil Ujian

### Rekap Nilai

1. **Laporan** → pilih sesi
2. Tabel nilai semua peserta: nama, nilai, benar/salah/kosong, durasi
3. Klik **"Export Excel"** untuk download file `.xlsx`
4. Klik **"Export PDF"** untuk download laporan PDF — dokumen dilengkapi **QR code** yang mengarah ke halaman verifikasi online

### Rekap Kehadiran

Tabel peserta hadir/tidak hadir. Bisa di-export ke Excel atau dicetak.

### Cetak Dokumen

| Dokumen | Keterangan |
|---|---|
| **Daftar Hadir** | Tandatangan peserta |
| **Berita Acara** | Rekap formal pelaksanaan ujian |
| **Kartu Peserta** | Identitas + nomor peserta per orang — dilengkapi QR code |

Semua dokumen siap cetak langsung dari browser atau di-export ke PDF melalui tombol **"Export PDF"**.

### Analisis Distribusi Nilai

Di halaman laporan sesi, tersedia grafik histogram distribusi nilai peserta untuk memudahkan identifikasi rentang nilai yang dominan.

### Rekap Kecurangan

Tab **"Rekap Kecurangan"** menampilkan rekap tab-switch, pelanggaran fullscreen, dan status diskualifikasi seluruh peserta di sesi tersebut.

### Komparasi Antar Sesi

Di halaman **Dashboard Guru**, tersedia perbandingan rata-rata nilai antar sesi untuk paket yang sama — memudahkan guru melihat tren performa ujian antar kelas atau periode.

## Analisis Ulangan

Setelah sesi selesai, jalankan **Analisis Ulangan** untuk mendapatkan laporan ketuntasan dan rekomendasi program tindak lanjut.

### Membuka Analisis Ulangan

1. Di tabel sesi, klik action **"Analisis Ulangan"** pada sesi yang ingin dianalisis
2. Halaman analisis menampilkan:
   - **Ketuntasan Individual**: peserta mana yang tuntas (nilai ≥ KKM) dan mana yang belum
   - **Ketuntasan Klasikal**: persentase peserta yang tuntas dibandingkan target KKM Klasikal
   - **Distribusi Nilai**: sebaran nilai seluruh peserta dalam histogram
   - **Program Remidi**: daftar peserta dengan nilai < KKM yang perlu mengikuti remedial
   - **Program Pengayaan**: daftar peserta yang masuk rentang pengayaan (antara Batas Pengayaan 1 dan 2)

### Export Analisis

Klik **"Export PDF"** atau **"Export Excel"** untuk mengunduh laporan analisis — berguna untuk dilampirkan ke dokumentasi ujian atau diserahkan ke kepala sekolah.

## Portofolio Peserta

Halaman **Portofolio** menampilkan riwayat lengkap semua sesi ujian yang pernah diikuti oleh seorang peserta:

- Daftar sesi (nama, tanggal, paket)
- Nilai, jumlah benar/salah/kosong per sesi
- Grafik tren nilai dari waktu ke waktu

Portofolio bisa diakses Guru dan Admin dari profil peserta.

## Dashboard Guru

Di halaman utama panel admin, guru dapat melihat rekap semua rombel yang diampu:
- Nilai rata-rata per sesi per rombel
- Jumlah peserta hadir / belum submit
- Klik **"Export Excel"** untuk rekap nilai per rombel
