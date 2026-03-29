---
title: Bank Soal
description: Membuat, mengelola, memfilter, dan mengimpor soal dari berbagai tipe di bank soal.
sidebar:
  order: 1
---

## Membuka Bank Soal

1. Login ke panel admin di `/cabt`
2. Di sidebar, klik **Bank Soal**

## Membuat Soal Baru

1. Klik tombol **"Tambah Soal"**
2. Pilih **Tipe Soal** dari dropdown
3. Isi form sesuai tipe soal (lihat tabel di bawah)
4. Klik **"Simpan"**

## Tipe Soal & Form yang Muncul

| Tipe | Isian yang Diperlukan |
|---|---|
| **PG** | Teks soal, minimal 2 opsi, pilih 1 kunci jawaban |
| **PG Berbobot** | Teks soal, opsi + persentase bobot tiap opsi (total tidak harus 100%) |
| **PG Majemuk** | Teks soal, opsi, pilih satu atau lebih kunci jawaban |
| **Menjodohkan** | Teks soal, pasangan premis (kiri) dan respons (kanan) |
| **Isian Singkat** | Teks soal, daftar keyword yang diterima sebagai jawaban benar |
| **Uraian** | Teks soal, kisi-kisi penilaian (opsional — hanya panduan untuk guru saat grading) |

## Field Umum Tiap Soal

| Field | Keterangan |
|---|---|
| **Kategori** | Kelompok soal — pilih dari kategori yang sudah dibuat (lihat [Kategori Soal](/docs/panduan-guru/kategori-soal)) |
| **Tingkat Kesulitan** | Mudah / Sedang / Sulit — digunakan untuk filter dan statistik |
| **Bobot** | Nilai maksimal soal ini dalam skala paket (default: 1) |
| **Pembahasan** | Penjelasan jawaban — ditampilkan ke peserta saat review diizinkan |
| **Lock Position** | Jika dicentang, soal tidak ikut diacak meski paket menggunakan Acak Soal |
| **Aktif** | Soal nonaktif tidak bisa dimasukkan ke paket ujian baru |

:::tip
Gunakan **Lock Position** untuk soal instruksi, soal pembuka, atau soal yang harus selalu ada di posisi pertama/terakhir.
:::

## Mengedit Soal

1. Di tabel bank soal, klik ikon **Edit** (pensil) pada baris soal yang ingin diubah
2. Ubah konten, opsi, kunci jawaban, atau field lainnya
3. Klik **"Simpan"**

:::caution
Soal yang sudah dimasukkan ke dalam **paket ujian yang aktif di sesi** tidak bisa diedit isinya (soft-lock). Jika perlu perubahan mendesak, buat soal baru dan tambahkan ke paket baru — jangan edit soal di paket yang sedang digunakan.
:::

## Menonaktifkan Soal

Soal yang bermasalah (kunci jawaban salah, konten tidak layak, skor D-value rendah) sebaiknya dinonaktifkan, bukan dihapus, agar data historis tetap terjaga.

1. Buka form edit soal
2. Toggle **"Aktif"** menjadi mati
3. Klik **"Simpan"**

Soal nonaktif:
- Tidak muncul di dropdown saat menambahkan soal ke paket ujian baru
- Tetap tersimpan di bank soal dan bisa diaktifkan kembali kapan saja
- Attempt lama yang menggunakan soal ini tidak terpengaruh

## Menghapus Soal

:::caution
Soal yang sudah pernah digunakan dalam sesi ujian (ada attempt terkait) **tidak dapat dihapus** untuk menjaga integritas data penilaian. Gunakan fitur **Nonaktifkan** sebagai gantinya.

Soal yang belum pernah dipakai di sesi manapun dapat dihapus permanen melalui ikon **Hapus** di tabel.
:::

## Mencari & Memfilter Soal

Di halaman Bank Soal, gunakan kombinasi filter untuk menemukan soal dengan cepat:

| Filter | Keterangan |
|---|---|
| **Kategori** | Filter berdasarkan kategori (mendukung hierarki — memilih induk menampilkan semua sub-kategori) |
| **Tipe Soal** | PG, PG Berbobot, PG Majemuk, Menjodohkan, Isian, Uraian |
| **Tingkat Kesulitan** | Mudah, Sedang, atau Sulit |
| **Status Aktif** | Hanya soal aktif, hanya nonaktif, atau semua |
| **Pencarian teks** | Cari berdasarkan cuplikan teks soal |

Filter dapat dikombinasikan — misalnya: "Kategori = Matematika, Tipe = PG, Kesulitan = Sedang" untuk memilih soal secara presisi saat menyusun paket.

## Import Soal dari Excel

Untuk memasukkan banyak soal sekaligus:

1. Klik **"Import dari Excel"**
2. Klik **"Download Template"** — wajib gunakan template ini
3. Isi soal sesuai format kolom di template
4. Upload file Excel → sistem memvalidasi setiap baris dan mengimpor yang valid
5. Laporan import ditampilkan: jumlah berhasil, baris yang gagal, dan alasan kegagalan

:::tip
Import Excel paling efisien untuk soal tipe **PG** dalam jumlah besar. Untuk tipe Menjodohkan, PG Berbobot, atau Uraian dengan pembahasan panjang, buat soal secara manual via form agar lebih akurat.
:::

:::note
Soal yang diimport otomatis berstatus **Aktif**. Periksa kembali kunci jawaban dan bobot setelah import selesai, terutama jika menyalin dari sumber lain.
:::
