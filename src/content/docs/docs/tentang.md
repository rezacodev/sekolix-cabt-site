---
title: Tentang Sekolix CABT
description: Pengenalan sistem ujian berbasis komputer Sekolix CABT.
---

Sekolix CABT adalah sistem **Computer Assisted Based Test (CAT)** berbasis web untuk keperluan ujian sekolah — dibangun di atas Laravel 12 + Filament v3.

## Fitur Utama

- **8 tipe soal** — PG, PG Berbobot, PG Majemuk, Benar/Salah, Menjodohkan, Isian, CLOZE, Uraian
- **Soal audio & stimulus** — embed file audio per soal; kelompokkan soal dalam satu stimulus/bacaan
- **Timer server-authoritative** — tidak bisa dimanipulasi dari client; tersedia juga timer per soal
- **Poin negatif** — konfigurasi pengurangan nilai per soal untuk mendetterrence jawaban tebak-tebakan
- **Resume ujian otomatis** — peserta bisa pindah komputer tanpa kehilangan jawaban
- **Anti-kecurangan multi-lapis** — server-side, client-side, dan jaringan; audit log semua tindakan
- **Laporan lengkap** — ekspor Excel & PDF ber-QR, cetak daftar hadir, berita acara, kartu peserta
- **Livescore real-time** — leaderboard peserta polling 15 detik
- **Kisi-kisi & Blueprint** — petakan soal ke KD/CP kurikulum; buat blueprint distribusi soal per tipe
- **Multi-Seksi** — bagi paket ujian menjadi beberapa seksi dengan timer independen
- **Kalender sesi** — tampilan kalender interaktif (FullCalendar) untuk semua jadwal ujian
- **Notifikasi email & pengumuman** — kirim notifikasi otomatis ke peserta; posting pengumuman per rombel
- **Portofolio peserta** — riwayat lengkap semua ujian yang pernah diikuti peserta
- **Catatan sesi** — pengawas dapat menambah catatan kejadian selama sesi berlangsung

## Level Pengguna

| Level | Peran | Akses |
|---|---|---|
| 1 | **Peserta** | Antarmuka ujian di `/peserta` |
| 2 | **Guru** | Panel admin terbatas — kelola soal, pantau sesi rombel |
| 3 | **Admin** | Kelola semua user, rombel, sesi, laporan |
| 4 | **Super Admin** | Semua akses + General Setting konfigurasi sistem |

## Navigasi Dokumentasi

Pilih panduan sesuai peran Anda:

- [Panduan Peserta](/docs/panduan-peserta/login) — cara login dan mengerjakan ujian
- [Panduan Guru](/docs/panduan-guru/bank-soal) — cara membuat soal dan memantau sesi
- [Panduan Admin](/docs/panduan-admin/manajemen-user) — manajemen user dan laporan
- [Panduan Super Admin](/docs/panduan-super-admin/instalasi) — instalasi dan konfigurasi server
