---
title: Laporan & Dokumen Cetak
description: Penjelasan lengkap semua jenis laporan dan dokumen cetak yang tersedia di Sekolix CABT.
sidebar:
  order: 4
---

## Gambaran Umum

Sekolix CABT menyediakan beberapa jenis laporan dan dokumen cetak yang dapat digenerate langsung dari panel admin tanpa perlu aplikasi tambahan. Semua laporan diakses dari menu **Laporan** di sidebar.

Laporan tersedia dalam dua format output:

| Format | Kegunaan |
|---|---|
| **Tampilan Browser** | Langsung bisa dilihat dan dicetak (Ctrl+P → Save as PDF atau ke printer) |
| **Export Excel (.xlsx)** | Diunduh untuk diolah lebih lanjut, integrasi dengan sistem rapor, atau diarsipkan |

---

## 1. Rekap Nilai

Laporan utama yang merangkum nilai seluruh peserta dalam satu sesi ujian.

### Cara Mengakses

1. Klik **Laporan** di sidebar → **Rekap Nilai**
2. Pilih **Sesi Ujian** dari dropdown
3. Secara opsional, filter berdasarkan **Rombel** tertentu
4. Data tampil langsung di tabel

### Kolom yang Tersedia

| Kolom | Keterangan |
|---|---|
| **No.** | Nomor urut |
| **Nama Peserta** | Nama lengkap |
| **No. Peserta** | Nomor identitas ujian |
| **Rombel** | Kelas peserta |
| **Nilai Akhir** | Nilai dalam skala 0–100 |
| **Benar** | Jumlah soal dijawab benar |
| **Salah** | Jumlah soal dijawab salah |
| **Kosong** | Jumlah soal tidak dijawab |
| **Durasi** | Lama pengerjaan (hh:mm:ss) |
| **Waktu Submit** | Timestamp submit atau timeout |

### Statistik Deskriptif Otomatis

Di bagian bawah tabel, sistem menghitung otomatis:

| Statistik | Keterangan |
|---|---|
| **Nilai Tertinggi** | Nilai maksimum dari seluruh peserta |
| **Nilai Terendah** | Nilai minimum |
| **Rata-rata** | Mean aritmatika |
| **Median** | Nilai tengah saat data diurutkan |
| **Modus** | Nilai yang paling sering muncul |
| **Standar Deviasi** | Tingkat penyebaran nilai dari rata-rata |

### Export Excel

Klik **"Export Excel"** untuk mengunduh file `.xlsx` berisi semua kolom di atas plus kolom tambahan (nomor attempt, status diskualifikasi, timestamp mulai).

File Excel berguna untuk integrasi dengan sistem rapor atau pengolahan nilai lebih lanjut di luar sistem.

---

## 2. Daftar Hadir

Dokumen cetak untuk keperluan administrasi ujian — berisi daftar peserta dengan kolom tanda tangan.

### Cara Mengakses

1. Klik **Laporan** → **Daftar Hadir**
2. Pilih **Sesi Ujian** dan **Rombel** (opsional — kosongkan untuk semua rombel)
3. Klik **"Cetak"** untuk tampil di browser, atau **"Export Excel"**

### Isi Dokumen

**Header:** Nama sekolah, logo, nama sesi, tanggal ujian, nama paket ujian.

**Tabel peserta:**

| Kolom | Keterangan |
|---|---|
| No. | Nomor urut |
| No. Peserta | Nomor identitas ujian |
| Nama Lengkap | Nama peserta |
| Rombel | Kelas |
| Tanda Tangan | Kolom kosong untuk tanda tangan fisik |

**Footer:** Kolom tanda tangan pengawas ujian dan kolom keterangan.

### Tips Cetak

- Gunakan orientasi **Portrait** untuk daftar peserta yang tidak terlalu banyak
- Gunakan **Landscape** jika ingin lebih banyak kolom atau nama yang panjang
- Di dialog print browser: pilih **"Save as PDF"** untuk menyimpan sebelum cetak

---

## 3. Berita Acara

Dokumen formal yang merekap pelaksanaan ujian secara resmi — termasuk kehadiran, statistik nilai, dan distribusi hasil.

### Cara Mengakses

1. Klik **Laporan** → **Berita Acara**
2. Pilih **Sesi Ujian**
3. Klik **"Tampilkan"** atau langsung **"Cetak"**

### Isi Dokumen

**Bagian atas (identitas):**
- Judul: "BERITA ACARA PELAKSANAAN UJIAN"
- Nama sekolah dan logo
- Nama sesi, tanggal, lokasi, waktu mulai dan selesai

**Rekapitulasi kehadiran:**

| Keterangan | Jumlah |
|---|---|
| Peserta terdaftar | N |
| Peserta hadir (mengerjakan) | N |
| Peserta tidak hadir | N |
| Peserta diskualifikasi | N |

**Distribusi nilai:**

| Rentang Nilai | Jumlah Peserta | Persentase |
|---|---|---|
| 90 – 100 | N | % |
| 75 – 89 | N | % |
| 60 – 74 | N | % |
| < 60 | N | % |

**Statistik umum:** nilai rata-rata, tertinggi, terendah.

**Bagian bawah:** Kolom tanda tangan Pengawas 1, Pengawas 2, dan Mengetahui (Kepala Sekolah / Wakasek Kurikulum).

:::tip
Berita Acara ideal untuk dilampirkan bersama rekap nilai saat laporan ujian diserahkan kepada kepala sekolah atau wakasek kurikulum.
:::

---

## 4. Kartu Peserta

Kartu identitas yang diberikan ke setiap peserta sebelum ujian dimulai, berisi nomor peserta dan informasi sesi.

### Cara Mengakses

1. Klik **Laporan** → **Kartu Peserta**
2. Pilih **Sesi Ujian** dan **Rombel** (opsional)
3. Klik **"Cetak"** — kartu semua peserta tampil dalam satu layout siap cetak

### Isi Kartu Peserta

Setiap kartu berisi:
- Nama sekolah dan logo
- Nama lengkap peserta
- **Nomor peserta** (ditampilkan besar dan mencolok)
- Nama sesi ujian
- Nama paket / mata ujian
- Tanggal ujian

### Cara Cetak Massal

Kartu dicetak dalam format **grid** — biasanya 2 atau 4 kartu per halaman A4, dengan garis batas antar kartu.

1. Klik **"Cetak"** di halaman Kartu Peserta
2. Di dialog print browser, pilih printer atau Save as PDF
3. Cetak file PDF
4. Potong kartu sesuai garis batas
5. Bagikan ke masing-masing peserta sebelum ujian dimulai

---

## 5. Statistik Soal (Item Analysis)

Laporan analisis kualitas butir soal berdasarkan data jawaban nyata dari peserta yang sudah menyelesaikan ujian.

### Cara Mengakses

1. Klik **Laporan** → **Statistik Soal**
2. Pilih **Sesi Ujian**
3. Tabel analisis tampil

:::note
Statistik soal baru bermakna secara statistik jika **minimal 30 peserta** sudah menyelesaikan ujian. Dengan jumlah lebih sedikit, nilai P dan D kurang reliabel.
:::

### Indeks Kesulitan (P-value)

$$P = \frac{\text{Jumlah peserta menjawab benar}}{\text{Total peserta yang mengerjakan soal}}$$

P-value mencerminkan seberapa mudah atau sulit sebuah soal bagi kelompok peserta yang mengerjakan.

| Nilai P | Kategori |
|---|---|
| 0.00 – 0.30 | **Sulit** — kurang dari 30% menjawab benar |
| 0.31 – 0.70 | **Sedang** — tingkat kesulitan ideal |
| 0.71 – 1.00 | **Mudah** — lebih dari 70% menjawab benar |

### Indeks Daya Beda (D-value)

$$D = P_{\text{atas}} - P_{\text{bawah}}$$

Keterangan:
- $P_{\text{atas}}$ = proporsi benar dari **27% peserta dengan nilai tertinggi**
- $P_{\text{bawah}}$ = proporsi benar dari **27% peserta dengan nilai terendah**

D-value mengukur seberapa baik soal membedakan peserta yang menguasai materi dari yang tidak.

| Nilai D | Kategori | Rekomendasi |
|---|---|---|
| ≥ 0.40 | **Baik Sekali** | Pertahankan — soal berkualitas tinggi |
| 0.30 – 0.39 | **Baik** | Pertahankan |
| 0.20 – 0.29 | **Cukup** | Pertimbangkan revisi minor |
| < 0.20 | **Kurang Baik** | Revisi total atau hapus dari bank soal |
| < 0 | **Negatif** | Kunci jawaban kemungkinan salah — periksa segera |

### Tindak Lanjut Hasil Analisis

| Kondisi | Rekomendasi |
|---|---|
| P < 0.10 (terlalu sulit) | Periksa apakah kunci jawaban benar; pertimbangkan revisi soal |
| P > 0.90 (terlalu mudah) | Ganti dengan soal lebih menantang jika tujuan seleksi |
| D < 0.20 | Revisi atau nonaktifkan soal — jangan gunakan di ujian berikutnya |
| P sedang (0.30–0.70) + D tinggi (≥ 0.40) | Soal berkualitas prima — pertahankan di bank soal |

:::tip
Setelah setiap ujian selesai, jalankan statistik soal dan tandai soal dengan D-value rendah. Gunakan fitur **Nonaktifkan Soal** di Bank Soal untuk mencegah soal bermasalah masuk ke paket ujian berikutnya.
:::
