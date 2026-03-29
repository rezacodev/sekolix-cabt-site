---
title: Manajemen Rombel
description: Mengelola rombongan belajar, keanggotaan guru, dan pengelompokan peserta.
sidebar:
  order: 2
---

## Apa itu Rombel?

Rombel (Rombongan Belajar) adalah kelompok peserta yang dijadwalkan bersama dalam satu atau beberapa sesi ujian. Biasanya setara dengan **kelas** di sekolah — contoh: X-IPA-1, XI-IPS-2, XII-Bahasa-3.

Rombel berfungsi untuk:
- Mengelompokkan peserta agar bisa di-assign ke sesi ujian sekaligus (bulk)
- Membatasi akses guru hanya ke rombel yang diampunya
- Mengorganisir laporan dan rekap nilai per kelas

## Membuka Halaman Rombel

1. Login ke panel admin di `/cabt`
2. Di sidebar, klik **Rombongan Belajar**

## Membuat Rombel Baru

1. Klik **"Tambah Rombel"**
2. Isi form detail rombel:

| Field | Keterangan | Wajib |
|---|---|---|
| **Nama Rombel** | Nama tampilan lengkap — contoh: "X IPA 1" | ✅ |
| **Kode** | Kode singkat unik — contoh: "X-IPA-1" | ✅ |
| **Angkatan** | Tahun masuk peserta — contoh: 2024 | ✅ |
| **Tahun Ajaran** | Tahun ajaran berjalan — contoh: "2025/2026" | ✅ |
| **Keterangan** | Catatan tambahan, misal nama wali kelas | — |
| **Aktif** | Toggle untuk mengaktifkan / menonaktifkan rombel | ✅ |

3. Klik **"Simpan"**

## Mengedit Rombel

1. Di tabel rombel, klik ikon **Edit** (pensil) pada baris rombel yang ingin diubah
2. Ubah data yang diperlukan
3. Klik **"Simpan"**

## Menonaktifkan Rombel

Toggle **"Aktif"** dapat dimatikan untuk rombel yang sudah tidak digunakan — misalnya setelah tahun ajaran berakhir atau kelas sudah lulus.

Rombel tidak aktif:
- Tidak muncul di dropdown saat membuat sesi ujian baru
- Peserta di dalamnya tetap dapat login dan mengakses data lama
- Tidak bisa dijadikan tujuan saat import peserta baru

## Menghapus Rombel

:::caution
Rombel yang sudah digunakan di sesi ujian **tidak dapat dihapus** karena data historis tergantung padanya. Gunakan fitur **Nonaktifkan** saja jika rombel sudah tidak dipakai.
:::

## Mengatur Guru di Rombel

Satu rombel dapat memiliki beberapa guru — misalnya wali kelas ditambah beberapa guru mata pelajaran.

### Menambah Guru ke Rombel

1. Di tabel rombel, klik nama rombel untuk buka halaman detail
2. Klik tab **"Guru"**
3. Klik **"Tambah Guru"**
4. Cari dan pilih guru dari daftar
5. Klik **"Simpan"**

### Melepas Guru dari Rombel

1. Di tab **"Guru"** halaman detail rombel
2. Temukan guru yang ingin dilepas
3. Klik tombol **"Hapus"** di baris guru tersebut
4. Konfirmasi tindakan

:::note
Guru yang dilepas dari rombel **tidak kehilangan akses ke sesi-sesi ujian yang sudah pernah dibuat**. Data dan laporan historis tetap utuh — hanya keanggotaan rombel yang dihapus.
:::

## Mengatur Peserta di Rombel

### Menambah Peserta Satu per Satu

1. Buka halaman detail rombel → klik tab **"Peserta"**
2. Klik **"Tambah Peserta"**
3. Cari peserta berdasarkan nama atau username
4. Pilih dari hasil pencarian
5. Klik **"Simpan"**

### Menambah Peserta Massal via Import Excel

Cara paling efisien untuk mengisi rombel dengan banyak peserta sekaligus:

1. Buka menu **User** → klik **"Import dari Excel"**
2. Download template Excel yang tersedia
3. Isi kolom **Rombel** dengan **kode rombel** yang sesuai (harus sama persis dengan kode yang terdaftar di sistem)
4. Upload file — peserta otomatis dibuat dan dimasukkan ke rombel sesuai kolom Rombel

:::tip
Jika peserta sudah ada di sistem dan hanya perlu dipindah/ditambah ke rombel baru, gunakan fitur **Tambah Peserta** manual di tab Peserta, atau edit akun peserta satu per satu dan ubah rombelnya.
:::

### Mengeluarkan Peserta dari Rombel

1. Di tab **"Peserta"** halaman detail rombel
2. Temukan peserta yang ingin dikeluarkan
3. Klik tombol **"Hapus"** di baris peserta tersebut
4. Konfirmasi tindakan

:::note
Mengeluarkan peserta dari rombel **tidak menghapus akun peserta** maupun data attempt mereka. Hanya hubungan keanggotaan rombel yang dihapus. Peserta tetap bisa login dan mengakses hasil ujian lama.
:::

## Melihat Daftar Peserta dalam Rombel

Tab **"Peserta"** di halaman detail rombel menampilkan semua anggota rombel beserta:

- Nama lengkap dan username
- Nomor peserta
- Status akun (aktif / nonaktif)

Klik nama peserta untuk membuka halaman detail akun peserta secara langsung, dari mana Anda bisa reset password, ubah level, atau lihat riwayat attempt.
