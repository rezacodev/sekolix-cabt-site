---
title: Mengerjakan Ujian
description: Navigasi soal, menjawab, menandai ragu-ragu, dan upload file.
sidebar:
  order: 2
---

## Tampilan Halaman Ujian

Halaman ujian terdiri dari:
- **Timer** di pojok kanan atas — sisa waktu dikontrol server
- **Nomor soal** — palet berwarna di samping/bawah
- **Area soal** — teks soal + pilihan jawaban
- **Tombol navigasi** — Sebelumnya / Selanjutnya

## Warna Palet Soal

| Warna | Arti |
|---|---|
| **Abu-abu** | Belum dijawab |
| **Hijau** | Sudah dijawab |
| **Kuning** | Ditandai ragu-ragu |

## Menjawab Soal

| Tipe Soal | Cara Menjawab |
|---|---|
| **PG / PG Berbobot** | Klik salah satu opsi pilihan |
| **PG Majemuk** | Klik satu atau lebih opsi (bisa memilih beberapa) |
| **Benar/Salah (BS)** | Untuk setiap pernyataan, klik **Benar** atau **Salah** |
| **Menjodohkan** | Pilih pasangan yang sesuai dari dropdown di sisi kanan |
| **Isian Singkat** | Ketik jawaban di kolom teks |
| **CLOZE (Isian Rumpang)** | Ketik jawaban untuk setiap bagian yang dikosongkan (blank) |
| **Uraian** | Ketik di area teks; bisa juga upload file (JPEG/PNG/PDF, maks sesuai pengaturan) |

Jawaban tersimpan otomatis setiap kali ada perubahan. Palet soal langsung berubah warna (abu-abu → hijau) begitu Anda memilih jawaban — tanpa perlu menunggu konfirmasi dari server. Notifikasi **"Tersimpan ✓"** muncul setelah server mengonfirmasi penyimpanan.

## Soal Audio

Jika soal dilengkapi file audio, tombol **▶ Putar Audio** akan muncul di atas teks soal. Klik tombol tersebut untuk mendengarkan audio sebelum menjawab.

:::note
Pada beberapa ujian, audio hanya boleh diputar sekali. Perhatikan instruksi soal — jika ada keterangan "Putar 1x", pastikan Anda siap sebelum menekan play.
:::

## Timer per Soal

Pada ujian tertentu, setiap soal memiliki **batas waktu tersendiri** (ditampilkan di bawah nomor soal). Jika waktu untuk satu soal habis, soal tersebut akan terkunci otomatis dan Anda akan berpindah ke soal berikutnya — jawaban yang sudah diisi tetap tersimpan.

## Menandai Ragu-ragu

Klik tombol **"Tandai Ragu-ragu"** di bawah soal. Soal akan berubah warna menjadi kuning di palet. Anda masih bisa mengubah jawaban kapan saja.

## Upload File URAIAN

1. Di soal tipe URAIAN, klik tombol **"Upload File"**
2. Pilih file (JPEG, PNG, atau PDF, maksimal sesuai pengaturan sistem)
3. File terupload akan tampil sebagai thumbnail/nama file

:::tip
Bisa langsung foto kertas coret-coretan menggunakan ponsel kemudian upload sebagai jawaban uraian.
:::

## Ujian Multi-Seksi

Beberapa ujian dibagi menjadi beberapa **seksi** (bagian) dengan timer tersendiri per seksi — misalnya Seksi A (Listening) dan Seksi B (Reading).

### Navigasi Antar Seksi

Terdapat dua mode navigasi seksi yang ditentukan oleh guru saat membuat paket ujian:

| Mode | Keterangan |
|---|---|
| **Urut** | Harus menyelesaikan seksi aktif sebelum pindah ke seksi berikutnya. Setelah berpindah, **tidak bisa kembali ke seksi sebelumnya** |
| **Bebas** | Bisa berpindah antar seksi kapan saja selama waktu ujian masih ada |

Pada kedua mode:
- Palet soal hanya menampilkan soal di seksi yang sedang aktif
- Setiap seksi memiliki timer independen — timer seksi berjalan terus meski Anda berada di seksi lain (mode bebas)

:::caution
Pada mode **Urut**: pastikan semua soal di seksi saat ini sudah dijawab atau ditandai sebelum menekan "Lanjut ke Seksi Berikutnya" — setelah berpindah Anda tidak bisa kembali.
:::
