---
title: Kategori Soal
description: Mengelola kategori untuk mengorganisir bank soal secara hierarkis.
sidebar:
  order: 2
---

## Apa itu Kategori Soal?

Kategori adalah label pengelompokan soal di bank soal. Dengan kategori, Anda dapat:

- Memisahkan soal berdasarkan **mata pelajaran** (Matematika, IPA, Bahasa Indonesia)
- Memisahkan berdasarkan **bab atau topik** (Aljabar, Geometri, Statistika)
- Memfilter soal dengan cepat saat menyusun paket ujian

Kategori mendukung **hierarki dua tingkat** — kategori induk (parent) dan sub-kategori (child).

**Contoh hierarki:**
```
Matematika
├── Aljabar
├── Geometri
└── Statistika

IPA
├── Fisika
├── Kimia
└── Biologi
```

## Membuka Halaman Kategori

1. Login ke panel admin di `/cabt`
2. Buka **Bank Soal**, lalu klik menu **Pengaturan Bank Soal** di header → pilih **Kategori Soal**

:::note
Menu **Kategori Soal** tidak lagi muncul langsung di sidebar. Akses sekarang melalui menu **Pengaturan Bank Soal** di halaman **Bank Soal**.
:::

## Membuat Kategori Baru

### Kategori Induk (Root)

1. Klik **"Tambah Kategori"**
2. Isi **Nama Kategori** (wajib)
3. Biarkan field **Kategori Induk** kosong / tidak dipilih
4. Isi **Deskripsi** (opsional) — keterangan singkat tentang kategori ini
5. Klik **"Simpan"**

### Sub-Kategori (Child)

1. Klik **"Tambah Kategori"**
2. Isi **Nama Kategori**
3. Pilih **Kategori Induk** dari dropdown — pilih kategori parent yang sudah ada
4. Isi **Deskripsi** (opsional)
5. Klik **"Simpan"**

:::tip
Gunakan hierarki untuk kategorisasi yang lebih rapi. Buat kategori induk "Matematika" lalu sub-kategori "Aljabar", "Geometri", dan seterusnya. Saat filter di bank soal, memilih kategori induk akan menampilkan semua soal dalam kategori tersebut beserta seluruh sub-kategorinya.
:::

## Mengedit Kategori

1. Di tabel kategori, klik ikon **Edit** (pensil) pada baris kategori yang ingin diubah
2. Ubah nama atau deskripsi sesuai kebutuhan
3. Klik **"Simpan"**

:::note
Mengubah nama kategori tidak mempengaruhi soal yang sudah terhubung — soal tetap terkategori dengan benar secara otomatis.
:::

## Menghapus Kategori

1. Di tabel kategori, klik ikon **Hapus** (tempat sampah) pada baris kategori
2. Konfirmasi penghapusan pada dialog yang muncul

:::caution
Kategori yang masih digunakan oleh soal **tidak bisa dihapus**. Pindahkan atau hapus soal-soalnya terlebih dahulu sebelum menghapus kategori.

Menghapus **kategori induk** juga akan menghapus semua sub-kategorinya.
:::

## Menggunakan Kategori pada Soal

Saat membuat atau mengedit soal di **Bank Soal**:

1. Pada field **Kategori**, klik dropdown
2. Pilih kategori yang sesuai — bisa kategori induk atau sub-kategori
3. Simpan soal

Satu soal hanya bisa memiliki satu kategori. Untuk soal yang lintas topik, pilih kategori yang paling relevan.

## Memfilter Soal Berdasarkan Kategori

Di halaman **Bank Soal**, gunakan filter untuk mempersempit tampilan:

1. Klik filter **"Kategori"** di bagian atas tabel
2. Pilih kategori dari dropdown
3. Tabel soal otomatis difilter — hanya soal dalam kategori tersebut yang tampil
4. Kombinasikan dengan filter lain (tipe soal, tingkat kesulitan, status aktif) untuk pencarian lebih spesifik

Filter ini juga berguna saat **menambahkan soal ke paket ujian** — Anda bisa memfilter bank soal berdasarkan kategori untuk menemukan soal yang relevan dengan lebih cepat.
