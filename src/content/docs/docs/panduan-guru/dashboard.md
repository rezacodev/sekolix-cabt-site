---
title: Dashboard Guru
description: Memahami tampilan dashboard dan mengakses rekap nilai peserta per rombel.
sidebar:
  order: 5
---

## Tampilan Dashboard

Setelah login ke panel admin di `/cabt`, Anda akan langsung diarahkan ke halaman **Dashboard**. Dashboard guru menampilkan ringkasan performa peserta dari sesi-sesi ujian yang Anda buat, dikelompokkan per rombel.

## Memilih Sesi Ujian

Di bagian atas dashboard terdapat **dropdown "Pilih Sesi"** yang berisi semua sesi ujian yang Anda buat — termasuk yang sudah berstatus Selesai.

1. Klik dropdown **"Pilih Sesi"**
2. Pilih sesi ujian yang ingin dilihat
3. Data di bawah otomatis diperbarui sesuai sesi yang dipilih

:::note
Guru hanya dapat melihat sesi yang **dibuat oleh dirinya sendiri**. Admin dan Super Admin dapat melihat semua sesi dari semua guru.
:::

## Tabel Rekap Per Rombel

Setelah memilih sesi, dashboard menampilkan satu tabel untuk **setiap rombel** yang terdaftar di sesi tersebut. Jika sesi tidak membatasi per rombel, semua peserta tampil dalam satu tabel.

Setiap tabel rombel berisi kolom:

| Kolom | Keterangan |
|---|---|
| **Nama Peserta** | Nama lengkap peserta |
| **No. Peserta** | Nomor identitas ujian |
| **Nilai Terbaik** | Nilai tertinggi dari semua attempt peserta (relevan jika max_pengulangan > 1) |
| **Status** | Status attempt peserta di sesi ini |

## Status Peserta

| Status | Warna | Arti |
|---|---|---|
| **Belum Mulai** | Abu-abu | Terdaftar di sesi tapi belum membuka halaman konfirmasi ujian |
| **Sedang** | Biru | Sedang mengerjakan ujian saat ini |
| **Selesai** | Hijau | Sudah submit atau waktu habis |
| **Diskualifikasi** | Merah | Dikeluarkan paksa atau melebihi batas pelanggaran tab |

## Rata-rata Nilai Rombel

Di bawah setiap tabel rombel ditampilkan **nilai rata-rata** dari seluruh peserta yang sudah berstatus Selesai di rombel tersebut.

:::caution
Jika paket ujian menggunakan **mode penilaian manual** dan masih ada soal uraian yang belum dinilai, nilai yang ditampilkan di dashboard belum final. Selesaikan grading terlebih dahulu, lalu klik **"Hitung Ulang Nilai"** agar nilai akhir terupdate.
:::

## Export Excel Per Rombel

Untuk mengekspor data nilai satu rombel ke file Excel (`.xlsx`):

1. Di tabel rombel yang diinginkan, klik tombol **"Export Excel"** di pojok kanan atas tabel
2. File otomatis terunduh dengan nama: `rekap-nilai-[nama-rombel]-[nama-sesi].xlsx`

File Excel berisi:
- Nama peserta dan nomor peserta
- Nilai akhir per attempt
- Status attempt
- Tanggal dan durasi pengerjaan

:::tip
Export dari dashboard ini menghasilkan rekap **per-rombel per-sesi**. Untuk laporan yang lebih lengkap (rekap semua rombel, statistik deskriptif, daftar hadir, berita acara, kartu peserta), gunakan menu **Laporan** di sidebar.
:::

## Navigasi Cepat dari Dashboard

Dari dashboard Anda dapat langsung melakukan:

| Aksi | Cara |
|---|---|
| **Buka monitor peserta real-time** | Klik tombol **"Monitor"** di header tabel rombel |
| **Buka halaman livescore** | Klik **"Livescore"** — terbuka di tab baru |
| **Lihat detail attempt peserta** | Klik nama peserta di tabel → tampil jawaban per soal dan log aktivitas |
| **Lanjut ke grading uraian** | Klik menu **Grading** di sidebar — bukan dari dashboard |
