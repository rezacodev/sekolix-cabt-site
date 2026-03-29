---
title: Tipe Soal & Formula Nilai
description: Penjelasan lengkap semua tipe soal dan formula kalkulasi nilai.
sidebar:
  order: 1
---

## Tipe Soal

### PG — Pilihan Ganda

Satu opsi benar. Nilai penuh jika benar, nol jika salah atau kosong.

```
nilai = bobot_soal   (jika benar)
nilai = 0            (jika salah/kosong)
```

### PG_BOBOT — PG Berbobot

Setiap opsi memiliki persentase bobot berbeda.

```
nilai = bobot_soal × (bobot_persen_opsi_dipilih / 100)
```

Contoh: Soal bobot 2, opsi A = 100%, opsi B = 50%, opsi C = 0%.  
Jika pilih B → nilai = 2 × (50/100) = **1.0**

### PGJ — PG Jawaban Majemuk

Lebih dari satu opsi benar. Nilai proporsional berdasarkan opsi benar yang dipilih.

```
nilai = bobot_soal × (jumlah_benar_dipilih / total_kunci_benar)
```

Nilai minimal 0 (tidak ada pengurangan).

### JODOH — Menjodohkan

Nilai proporsional berdasarkan pasangan yang dijodohkan dengan benar.

```
nilai = bobot_soal × (pasangan_benar / total_pasangan)
```

### ISIAN — Isian Singkat

Pencocokan keyword secara case-insensitive.

```
nilai = bobot_soal   (jika minimal 1 keyword cocok)
nilai = 0            (jika tidak ada keyword yang cocok)
```

### URAIAN — Uraian / Essay

Dinilai manual oleh guru. Rentang nilai: **0 – bobot_soal**.

---

## Formula Nilai Akhir

```
nilai_akhir = (Σ nilai_perolehan_per_soal / Σ bobot_max_per_soal) × 100
```

Nilai akhir selalu dalam skala **0–100**.

## Aturan Bisnis Penting

| Aturan | Detail |
|---|---|
| Satu attempt aktif per sesi | Peserta tidak bisa mulai ulang selama attempt berstatus `berlangsung` |
| Batas pengulangan | Jika `max_pengulangan` tercapai, peserta tidak bisa mulai lagi |
| Waktu dari server | Timer dihitung server: `sisa = (waktu_mulai + durasi×60) − now()` |
| Submit idempotent | Jika attempt sudah `selesai`, submit ulang redirect ke hasil tanpa error |
| Lock position | Soal dengan `lock_position = true` tidak ikut diacak |
| Soft-lock paket | Paket aktif di sesi tidak bisa diedit soalnya (hanya metadata) |
