---
title: Livescore & Ranking
description: Melihat ranking peserta secara real-time selama dan setelah ujian.
sidebar:
  order: 4
---

## Apa itu Livescore?

Livescore adalah halaman yang menampilkan **ranking peserta secara real-time** berdasarkan nilai yang sudah dikumpulkan. Halaman ini berguna untuk:

- Memotivasi peserta selama ujian berlangsung
- Memantau perkembangan ujian secara transparan dari luar ruangan
- Menampilkan hasil final setelah sesi selesai di layar proyektor

:::note
Fitur livescore harus diaktifkan oleh Super Admin di **Pengaturan Umum**. Jika tidak aktif, halaman ini tidak dapat diakses.
:::

## Cara Mengakses Livescore

### Dari Dashboard Peserta

1. Login ke akun peserta
2. Di daftar sesi, cari sesi ujian yang sedang berlangsung atau sudah selesai
3. Klik tombol **"Lihat Livescore"** di bawah nama sesi

### URL Langsung

Halaman livescore dapat diakses langsung menggunakan URL:

```
/sesi/{id-sesi}/livescore
```

Guru atau pengawas biasanya menampilkan URL ini di proyektor agar peserta bisa melihat ranking berjalan selama ujian berlangsung.

:::tip
Tanyakan ID sesi ke guru atau pengawas jika Anda tidak menemukan tombol Livescore di dashboard peserta.
:::

## Tampilan Halaman Livescore

Halaman livescore menampilkan tabel ranking dengan kolom berikut:

| Kolom | Keterangan |
|---|---|
| **#** | Peringkat peserta — 1 berarti nilai tertinggi |
| **Nama** | Nama lengkap peserta |
| **No. Peserta** | Nomor identitas ujian |
| **Rombel** | Kelas / kelompok belajar peserta |
| **Nilai** | Nilai akhir dalam skala 0–100 |
| **Benar** | Jumlah soal yang dijawab benar |
| **Status** | Status pengerjaan: Sedang / Selesai |

Di bagian bawah tabel ditampilkan **rata-rata nilai** dari seluruh peserta yang sudah mengumpulkan jawaban.

## Pembaruan Otomatis

Halaman livescore **diperbarui secara otomatis setiap beberapa detik** (polling ke server). Tidak perlu refresh manual — ranking akan bergeser sendiri saat peserta lain menyelesaikan ujian atau nilai baru masuk.

:::note
Jika paket ujian menggunakan **mode penilaian manual** (ada soal uraian), nilai di livescore baru final setelah guru menyelesaikan grading dan klik **"Hitung Ulang Nilai"**.
:::

## Mode Publik vs. Perlu Login

Bergantung pada konfigurasi Super Admin, akses livescore bisa terbuka atau tertutup:

| Mode | Keterangan |
|---|---|
| **Login diperlukan** | Hanya pengguna yang sudah login yang bisa melihat halaman livescore |
| **Publik** | Siapapun dengan URL bisa melihat tanpa perlu login — ideal untuk ditampilkan di proyektor |

Jika Anda tidak bisa membuka halaman livescore, hubungi guru atau pengawas untuk memastikan fitur livescore sudah diaktifkan di Pengaturan Umum.
