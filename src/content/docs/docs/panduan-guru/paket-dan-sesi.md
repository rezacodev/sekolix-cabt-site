---
title: Paket & Sesi Ujian
description: Membuat paket ujian, mengelola sesi, token akses, dan memantau peserta aktif.
sidebar:
  order: 3
---

## Paket Ujian

Paket ujian adalah **konfigurasi ujian** — kumpulan soal yang dipilih dari bank soal beserta aturan pengerjaan. Paket bersifat reusable: satu paket dapat digunakan di banyak sesi berbeda.

### Membuat Paket Ujian

1. Klik **Paket Ujian** di sidebar → **"Tambah Paket"**
2. Isi konfigurasi:

| Field | Keterangan |
|---|---|
| **Nama Paket** | Nama yang tampil ke peserta di halaman konfirmasi |
| **Deskripsi** | Keterangan singkat tentang paket (opsional) |
| **Durasi** | Lama ujian dalam menit — timer dikontrol server |
| **Waktu Minimal Submit** | Menit minimum sebelum tombol "Kumpulkan" aktif — cegah peserta submit terlalu cepat |
| **Acak Soal** | Urutan soal diacak berbeda per peserta (soal ber-lock position tidak ikut diacak) |
| **Acak Opsi** | Urutan opsi jawaban PG diacak per peserta |
| **Max Pengulangan** | Berapa kali peserta bisa mengulang ujian di sesi yang sama. `0` = tak terbatas, `1` = sekali saja, `N` = N kali |
| **Mode Penilaian** | `Otomatis`: nilai dihitung langsung setelah submit. `Manual`: menunggu guru menilai soal uraian |
| **Tampilkan Hasil** | Apakah nilai dan statistik (benar/salah/kosong) tampil ke peserta setelah submit |
| **Izinkan Review** | Apakah peserta bisa melihat kunci jawaban dan pembahasan setelah sesi ditutup |
| **Poin Negatif Global** | Aktifkan pengurangan nilai untuk jawaban salah (nilai per soal dikonfigurasi di masing-masing soal) |
| **Timer per Soal** | Aktifkan batas waktu per soal — soal dikunci otomatis jika peserta melewati batas waktu soal tersebut |

3. Tambahkan soal dari bank soal ke paket (pilih soal satu per satu atau gunakan filter)
4. Atur urutan soal jika diperlukan
5. Klik **"Simpan"**

### Blueprint / Kisi-kisi

Sebelum menyusun paket, buat **Blueprint** sebagai panduan distribusi soal:

1. Klik **Blueprint Ujian** di sidebar → **"Tambah Blueprint"**
2. Beri nama dan tentukan jumlah total soal yang ditargetkan
3. Tambahkan item per tipe soal, tingkat kesulitan, KD/CP, dan Bloom level
4. Saat membuat paket, pilih Blueprint → sistem memvalidasi apakah komposisi soal yang dipilih sesuai blueprint

:::tip
Blueprint cocok untuk ujian formal (PTS/PAS) yang harus sesuai kisi-kisi kurikulum yang sudah ditetapkan.
:::

### Paket Multi-Seksi

Untuk ujian yang terdiri dari beberapa bagian dengan timer independen (misalnya: Bagian A Listening — 15 menit, Bagian B Reading — 30 menit):

1. Di form paket, aktifkan **"Multi-Seksi"**
2. Tambahkan seksi — beri nama dan durasi per seksi
3. Assign soal ke masing-masing seksi
4. Saat ujian, peserta mengerjakan seksi satu per satu; timer seksi berjalan independen

:::note
Peserta tidak bisa mundur ke seksi sebelumnya setelah mengkonfirmasi pindah ke seksi berikutnya.
:::

### Soft-Lock Paket

:::caution
Paket yang sudah digunakan di sesi ujian aktif atau selesai **tidak dapat diubah soal-soalnya** (soft-lock). Metadata paket (nama, deskripsi) masih bisa diedit, tetapi daftar soal dan konfigurasi penilaiannya terkunci.

Jika perlu perubahan soal, **buat paket baru** dan gunakan di sesi berikutnya. Jangan menghapus paket lama karena data attempt bergantung padanya.
:::

---

## Sesi Ujian

Sesi adalah **jadwal penggunaan paket ujian** untuk sekumpulan peserta tertentu. Satu paket bisa memiliki banyak sesi (untuk kelas berbeda, waktu berbeda, dsb.).

### Membuat Sesi Ujian

1. Klik **Sesi Ujian** di sidebar → **"Tambah Sesi"**
2. Isi detail sesi:

| Field | Keterangan |
|---|---|
| **Nama Sesi** | Nama deskriptif — contoh: "UTS Matematika X-IPA-1 Maret 2026" |
| **Paket Ujian** | Pilih paket yang akan digunakan |
| **Token Akses** | Kode yang harus dimasukkan peserta sebelum mulai ujian (lihat detail di bawah) |
| **Waktu Mulai** | Jadwal mulai sesi — peserta tidak bisa mulai sebelum waktu ini |
| **Waktu Selesai** | Jadwal berakhir sesi — peserta tidak bisa mulai baru setelah waktu ini |

3. Assign peserta: pilih per **Rombel** (semua anggota dimasukkan otomatis) atau per **Individu**
4. Klik **"Simpan"** → sesi tersimpan dengan status `Draft`

### Token Akses

Token akses adalah kode pengaman yang harus diketik peserta di halaman konfirmasi sebelum memulai ujian. Fungsinya memastikan peserta hanya bisa mulai ujian saat guru/pengawas sudah siap.

| Opsi | Keterangan |
|---|---|
| **Generate Otomatis** | Sistem membuat kode acak 6 karakter — klik ikon refresh untuk generate ulang |
| **Isi Manual** | Isi dengan kode pilihan Anda — lebih mudah untuk disampaikan lisan ke peserta |
| **Kosongkan** | Jika dikosongkan, peserta tidak perlu memasukkan token — langsung bisa mulai |

:::tip
Untuk ujian di lab komputer, gunakan token pendek yang mudah diketik (4–6 angka). Tulis di papan tulis atau tampilkan di proyektor saat ujian akan dimulai, lalu hapus setelah semua peserta sudah masuk.
:::

### Kalender Sesi

Semua sesi yang sudah dibuat ditampilkan di **Kalender Ujian** (menu tersendiri di sidebar). Tampilan kalender interaktif memperlihatkan jadwal semua sesi dalam satu tampilan bulanan/mingguan — berguna untuk menghindari jadwal bentrok antar kelas.

### Alur Status Sesi

```
Draft → Aktif → Selesai
                          ↓
                     Dibatalkan (dari status manapun)
```

| Status | Keterangan |
|---|---|
| **Draft** | Sesi tersimpan tapi belum bisa diakses peserta |
| **Aktif** | Peserta dapat login dan mulai ujian (sesuai jadwal waktu mulai/selesai) |
| **Selesai** | Ujian ditutup — tidak ada peserta yang bisa mulai ujian baru; review tersedia jika diizinkan |
| **Dibatalkan** | Sesi dihentikan paksa — semua attempt yang sedang berjalan dihentikan |

### Mengaktifkan Sesi

1. Di tabel sesi, klik tombol **"Aktifkan"** pada sesi Draft yang siap digunakan
2. Status berubah menjadi **Aktif**
3. Bagikan **token akses** ke peserta (tulis di papan tulis, tampilkan di proyektor, atau kirim via pesan)
4. Jika notifikasi email diaktifkan di Pengaturan Umum, sistem otomatis mengirim email ke semua peserta terdaftar

### Menutup Sesi

1. Di tabel sesi, klik tombol **"Selesaikan"** pada sesi Aktif
2. Status berubah menjadi **Selesai**
3. Peserta yang belum submit tidak bisa lagi mengerjakan

Setelah sesi Selesai, fitur **Review** (jika diizinkan) menjadi tersedia bagi peserta.

### Membatalkan Sesi

:::caution
Membatalkan sesi menghentikan semua attempt yang sedang berjalan secara paksa. Gunakan hanya dalam kondisi darurat. Tindakan ini tidak dapat dibatalkan.
:::

---

## Monitor Peserta Aktif

Saat sesi berlangsung, klik tombol **"Monitor"** di baris sesi untuk membuka halaman monitor real-time.

### Informasi per Peserta di Monitor

| Kolom | Keterangan |
|---|---|
| **Nama / No. Peserta** | Identitas peserta |
| **Rombel** | Kelas peserta |
| **Status** | Belum Mulai / Sedang / Selesai / Diskualifikasi |
| **Soal Terjawab** | Jumlah soal yang sudah dijawab dari total soal |
| **Sisa Waktu** | Countdown waktu peserta (berdasarkan waktu mulai attempt + durasi paket) |
| **Tab Switch** | Jumlah perpindahan tab yang terdeteksi — angka merah berarti mendekati atau sudah melebihi batas |

### Paksa Keluar Peserta

Jika peserta perlu dikeluarkan dari ujian (terdeteksi curang, gangguan teknis, atau keperluan mendesak lain):

1. Klik tombol **"Paksa Keluar"** di baris peserta yang bersangkutan
2. Konfirmasi pada dialog yang muncul
3. Peserta langsung dilogout dari halaman ujian — attempt berubah status **Diskualifikasi**

:::note
Status Diskualifikasi bersifat permanen. Peserta tidak bisa mengerjakan kembali di sesi yang sama. Hubungi Admin jika diperlukan pengaturan ulang.
:::

### Catatan Sesi (Pengawas)

Pengawas dapat mencatat kejadian selama sesi berlangsung (misalnya: gangguan internet, pelanggaran yang diamati secara langsung):

1. Di halaman Monitor, klik tombol **"Catatan"**
2. Tulis catatan kejadian + waktu
3. Klik **"Simpan"**

Catatan sesi tersimpan di timeline sesi dan dapat dilihat kembali di halaman detail sesi setelah selesai.

### Livescore dari Monitor

Klik tombol **"Livescore"** di halaman monitor untuk membuka halaman ranking real-time di tab baru — berguna untuk ditampilkan di proyektor terpisah selama ujian berlangsung.

## Paket Ujian

Paket ujian adalah **konfigurasi ujian** — kumpulan soal yang dipilih dari bank soal beserta aturan pengerjaan. Paket bersifat reusable: satu paket dapat digunakan di banyak sesi berbeda.

### Membuat Paket Ujian

1. Klik **Paket Ujian** di sidebar → **"Tambah Paket"**
2. Isi konfigurasi:

| Field | Keterangan |
|---|---|
| **Nama Paket** | Nama yang tampil ke peserta di halaman konfirmasi |
| **Deskripsi** | Keterangan singkat tentang paket (opsional) |
| **Durasi** | Lama ujian dalam menit — timer dikontrol server |
| **Waktu Minimal Submit** | Menit minimum sebelum tombol "Kumpulkan" aktif — cegah peserta submit terlalu cepat |
| **Acak Soal** | Urutan soal diacak berbeda per peserta (soal ber-lock position tidak ikut diacak) |
| **Acak Opsi** | Urutan opsi jawaban PG diacak per peserta |
| **Max Pengulangan** | Berapa kali peserta bisa mengulang ujian di sesi yang sama. `0` = tak terbatas, `1` = sekali saja, `N` = N kali |
| **Mode Penilaian** | `Otomatis`: nilai dihitung langsung setelah submit. `Manual`: menunggu guru menilai soal uraian |
| **Tampilkan Hasil** | Apakah nilai dan statistik (benar/salah/kosong) tampil ke peserta setelah submit |
| **Izinkan Review** | Apakah peserta bisa melihat kunci jawaban dan pembahasan setelah sesi ditutup |

3. Tambahkan soal dari bank soal ke paket (pilih soal satu per satu atau gunakan filter)
4. Atur urutan soal jika diperlukan
5. Klik **"Simpan"**

### Soft-Lock Paket

:::caution
Paket yang sudah digunakan di sesi ujian aktif atau selesai **tidak dapat diubah soal-soalnya** (soft-lock). Metadata paket (nama, deskripsi) masih bisa diedit, tetapi daftar soal dan konfigurasi penilaiannya terkunci.

Jika perlu perubahan soal, **buat paket baru** dan gunakan di sesi berikutnya. Jangan menghapus paket lama karena data attempt bergantung padanya.
:::

---

## Sesi Ujian

Sesi adalah **jadwal penggunaan paket ujian** untuk sekumpulan peserta tertentu. Satu paket bisa memiliki banyak sesi (untuk kelas berbeda, waktu berbeda, dsb.).

### Membuat Sesi Ujian

1. Klik **Sesi Ujian** di sidebar → **"Tambah Sesi"**
2. Isi detail sesi:

| Field | Keterangan |
|---|---|
| **Nama Sesi** | Nama deskriptif — contoh: "UTS Matematika X-IPA-1 Maret 2026" |
| **Paket Ujian** | Pilih paket yang akan digunakan |
| **Token Akses** | Kode yang harus dimasukkan peserta sebelum mulai ujian (lihat detail di bawah) |
| **Waktu Mulai** | Jadwal mulai sesi — peserta tidak bisa mulai sebelum waktu ini |
| **Waktu Selesai** | Jadwal berakhir sesi — peserta tidak bisa mulai baru setelah waktu ini |

3. Assign peserta: pilih per **Rombel** (semua anggota dimasukkan otomatis) atau per **Individu**
4. Klik **"Simpan"** → sesi tersimpan dengan status `Draft`

### Token Akses

Token akses adalah kode pengaman yang harus diketik peserta di halaman konfirmasi sebelum memulai ujian. Fungsinya memastikan peserta hanya bisa mulai ujian saat guru/pengawas sudah siap.

| Opsi | Keterangan |
|---|---|
| **Generate Otomatis** | Sistem membuat kode acak 6 karakter — klik ikon refresh untuk generate ulang |
| **Isi Manual** | Isi dengan kode pilihan Anda — lebih mudah untuk disampaikan lisan ke peserta |
| **Kosongkan** | Jika dikosongkan, peserta tidak perlu memasukkan token — langsung bisa mulai |

:::tip
Untuk ujian di lab komputer, gunakan token pendek yang mudah diketik (4–6 angka). Tulis di papan tulis atau tampilkan di proyektor saat ujian akan dimulai, lalu hapus setelah semua peserta sudah masuk.
:::

### Alur Status Sesi

```
Draft → Aktif → Selesai
                          ↓
                     Dibatalkan (dari status manapun)
```

| Status | Keterangan |
|---|---|
| **Draft** | Sesi tersimpan tapi belum bisa diakses peserta |
| **Aktif** | Peserta dapat login dan mulai ujian (sesuai jadwal waktu mulai/selesai) |
| **Selesai** | Ujian ditutup — tidak ada peserta yang bisa mulai ujian baru; review tersedia jika diizinkan |
| **Dibatalkan** | Sesi dihentikan paksa — semua attempt yang sedang berjalan dihentikan |

### Mengaktifkan Sesi

1. Di tabel sesi, klik tombol **"Aktifkan"** pada sesi Draft yang siap digunakan
2. Status berubah menjadi **Aktif**
3. Bagikan **token akses** ke peserta (tulis di papan tulis, tampilkan di proyektor, atau kirim via pesan)

### Menutup Sesi

1. Di tabel sesi, klik tombol **"Selesaikan"** pada sesi Aktif
2. Status berubah menjadi **Selesai**
3. Peserta yang belum submit tidak bisa lagi mengerjakan

Setelah sesi Selesai, fitur **Review** (jika diizinkan) menjadi tersedia bagi peserta.

### Membatalkan Sesi

:::caution
Membatalkan sesi menghentikan semua attempt yang sedang berjalan secara paksa. Gunakan hanya dalam kondisi darurat. Tindakan ini tidak dapat dibatalkan.
:::

---

## Monitor Peserta Aktif

Saat sesi berlangsung, klik tombol **"Monitor"** di baris sesi untuk membuka halaman monitor real-time.

### Informasi per Peserta di Monitor

| Kolom | Keterangan |
|---|---|
| **Nama / No. Peserta** | Identitas peserta |
| **Rombel** | Kelas peserta |
| **Status** | Belum Mulai / Sedang / Selesai / Diskualifikasi |
| **Soal Terjawab** | Jumlah soal yang sudah dijawab dari total soal |
| **Sisa Waktu** | Countdown waktu peserta (berdasarkan waktu mulai attempt + durasi paket) |
| **Tab Switch** | Jumlah perpindahan tab yang terdeteksi — angka merah berarti mendekati atau sudah melebihi batas |

### Paksa Keluar Peserta

Jika peserta perlu dikeluarkan dari ujian (terdeteksi curang, gangguan teknis, atau keperluan mendesak lain):

1. Klik tombol **"Paksa Keluar"** di baris peserta yang bersangkutan
2. Konfirmasi pada dialog yang muncul
3. Peserta langsung dilogout dari halaman ujian — attempt berubah status **Diskualifikasi**

:::note
Status Diskualifikasi bersifat permanen. Peserta tidak bisa mengerjakan kembali di sesi yang sama. Hubungi Admin jika diperlukan pengaturan ulang.
:::

### Livescore dari Monitor

Klik tombol **"Livescore"** di halaman monitor untuk membuka halaman ranking real-time di tab baru — berguna untuk ditampilkan di proyektor terpisah selama ujian berlangsung.
