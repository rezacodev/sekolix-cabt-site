---
title: Manajemen User
description: Mengelola akun pengguna — membuat, mengedit, import massal, dan mengatur level akses.
sidebar:
  order: 1
---

## Membuka Halaman User

1. Login ke panel admin di `/cabt`
2. Di sidebar, klik **User** atau **Manajemen User**

## Level User

| Level | Peran | Akses |
|---|---|---|
| 1 | **Peserta** | Hanya antarmuka ujian di `/peserta` |
| 2 | **Guru** | Panel admin — bank soal, paket, sesi milik sendiri, grading, laporan |
| 3 | **Admin** | Semua fitur Guru + manajemen user, rombel, akses semua sesi |
| 4 | **Super Admin** | Semua fitur Admin + Pengaturan Umum |

## Membuat User Baru (Manual)

1. Klik **"Tambah User"**
2. Isi form:

| Field | Keterangan | Wajib |
|---|---|---|
| **Nama** | Nama lengkap pengguna | ✅ |
| **Username** | Username untuk login (unik, tanpa spasi) | ✅ |
| **Email** | Alamat email (unik, digunakan untuk login juga) | ✅ |
| **Password** | Password awal — peserta dianjurkan ganti setelah login pertama | ✅ |
| **Level** | Pilih 1–4 sesuai peran | ✅ |
| **Nomor Peserta** | Nomor identitas ujian — hanya untuk Level 1 (Peserta) | — |
| **Rombel** | Assign ke rombel — hanya untuk Level 1 (Peserta) | — |
| **Aktif** | Toggle aktif/nonaktif akun | ✅ |

3. Klik **"Simpan"**

## Import User dari Excel (Massal)

Cara paling efisien untuk menambahkan banyak peserta sekaligus:

1. Klik **"Import dari Excel"**
2. Klik **"Download Template"** — gunakan template ini, jangan format custom
3. Isi data di template:
   - Kolom wajib: **Nama**, **Username**, **Email**, **Password**, **Level**
   - Kolom opsional: **Nomor Peserta**, **Rombel** (isi dengan kode rombel)
4. Upload file Excel → sistem validasi setiap baris
5. Laporan import ditampilkan: berhasil / gagal per baris beserta pesan error-nya

:::tip
Isi kolom **Rombel** dengan kode rombel yang sudah terdaftar di sistem. Peserta otomatis dimasukkan ke rombel saat import selesai — tidak perlu assign manual satu per satu.
:::

:::caution
Jika ada baris yang gagal (duplikat username/email, level tidak valid), baris tersebut dilewati. Perbaiki dan upload ulang hanya baris yang gagal.
:::

## Mencari & Memfilter User

Di tabel user, gunakan filter untuk mempersempit hasil:

- **Filter Level** — tampilkan hanya Peserta, Guru, Admin, atau Super Admin
- **Filter Rombel** — tampilkan hanya peserta dari rombel tertentu
- **Filter Status Aktif** — tampilkan hanya akun aktif atau nonaktif
- **Pencarian teks** — cari berdasarkan nama, username, atau email

## Mengedit User

1. Di tabel user, klik ikon **Edit** (pensil) di baris user yang ingin diubah
2. Ubah data yang diperlukan
3. Klik **"Simpan"**

Semua field dapat diubah kecuali email yang sudah digunakan di attempt aktif — dalam kasus itu, buat akun baru.

## Menonaktifkan / Mengaktifkan User

Toggle **"Aktif"** pada form edit user:

- **Nonaktif**: user tidak bisa login. Data attempt dan nilai tetap tersimpan
- **Aktif**: user dapat login kembali dengan credential yang sama

Ini berguna untuk menonaktifkan akun peserta yang sudah lulus atau guru yang sudah tidak mengajar, tanpa menghapus data historis.

## Reset Password

### Reset Individual

1. Buka halaman edit user
2. Isi field **Password Baru**
3. Klik **"Simpan"**

### Reset Massal (Bulk)

1. Di tabel user, centang checkbox beberapa user sekaligus
2. Klik **"Aksi Massal"** → **"Reset Password"**
3. Masukkan password baru yang akan diaplikasikan ke semua user yang dipilih
4. Konfirmasi tindakan

:::tip
Setelah reset massal, bagikan password baru ke peserta dan minta mereka mengganti sendiri setelah login pertama — fitur ganti password tersedia di profil peserta.
:::

## Paksa Logout

Jika peserta atau guru perlu segera dikeluarkan dari sesi yang sedang aktif (misalnya akun disalahgunakan atau terjadi masalah):

1. Di tabel user, klik ikon **Edit** pada user yang bersangkutan
2. Klik tombol **"Paksa Logout"**
3. Konfirmasi tindakan

Efek paksa logout:
- Semua token sesi aktif user tersebut diinvalidasi
- User diarahkan ke halaman login saat halaman direfresh
- **Tidak mempengaruhi** attempt ujian yang sedang berjalan — attempt tetap tercatat, jawaban yang sudah terkirim tetap tersimpan

:::note
**Paksa Logout** berbeda dengan **Paksa Keluar** di monitor sesi. Paksa Logout mengeluarkan user dari aplikasi secara keseluruhan (semua sesi login). Paksa Keluar di monitor sesi hanya menghentikan attempt ujian spesifik dan mendiskualifikasi peserta tersebut.
:::

## Export Data User

Untuk mengekspor seluruh data user ke file Excel:

1. Di halaman tabel user, klik tombol **"Export Excel"**
2. File `.xlsx` otomatis terunduh

File Export berisi: nama, username, email, level, rombel, nomor peserta, dan status aktif untuk semua user yang saat ini tampil di tabel (sesuai filter yang aktif).

:::tip
Gunakan filter terlebih dahulu sebelum export jika hanya ingin mengekspor peserta dari rombel tertentu atau level tertentu saja.
:::

## Menghapus User

:::caution
User yang memiliki data attempt ujian **tidak dapat dihapus** untuk menjaga integritas data historis. Gunakan **Nonaktifkan** (toggle Aktif = Mati) sebagai gantinya.

User yang belum pernah mengikuti ujian dapat dihapus permanen melalui ikon **Hapus** di tabel.
:::
