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

### BS — Benar/Salah

Terdiri dari beberapa pernyataan yang harus ditandai Benar atau Salah. Nilai proporsional berdasarkan jumlah pernyataan yang dijawab dengan benar.

```
nilai = bobot_soal × (jumlah_pernyataan_benar / total_pernyataan)
```

Contoh: Soal bobot 2, 4 pernyataan, peserta menjawab 3 benar →  
nilai = 2 × (3/4) = **1.5**

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

### CLOZE — Isian Rumpang

Teks dengan beberapa bagian yang dikosongkan (`[_1]`, `[_2]`, dst.). Setiap blank dinilai secara independen.

```
nilai_per_blank = (bobot_soal / jumlah_blank)   (jika blank dijawab benar)
nilai_total     = Σ nilai_per_blank
```

Pencocokan jawaban blank bersifat case-insensitive; alternatif jawaban didukung.

Contoh: Soal bobot 3, 3 blank, peserta menjawab 2 blank benar →  
nilai = (3/3) + (3/3) + 0 = **2.0**

### URAIAN — Uraian / Essay

Dinilai manual oleh guru. Rentang nilai: **0 – bobot_soal**.

---

## Poin Negatif

Jika paket ujian mengaktifkan **Poin Negatif** dan soal dikonfigurasi dengan nilai `poin_negatif > 0`, maka jawaban salah akan mengurangi nilai:

```
nilai = -poin_negatif_soal   (jika salah)
nilai = 0                    (jika kosong/tidak dijawab)
```

:::caution
Poin negatif hanya berlaku untuk soal yang dijawab salah — soal yang dibiarkan kosong tidak mengalami pengurangan nilai.
:::

---

## Formula Nilai Akhir

```
nilai_akhir = (Σ nilai_perolehan_per_soal / Σ bobot_max_per_soal) × 100
```

Nilai akhir selalu dalam skala **0–100**.

---

## Aturan Bisnis Penting

| Aturan | Detail |
|---|---|
| Satu attempt aktif per sesi | Peserta tidak bisa mulai ulang selama attempt berstatus `berlangsung` |
| Batas pengulangan | Jika `max_pengulangan` tercapai, peserta tidak bisa mulai lagi |
| Waktu dari server | Timer dihitung server: `sisa = (waktu_mulai + durasi×60) − now()` |
| Timer per soal | Jika aktif, soal dikunci setelah batas waktu per soal habis — jawaban kosong |
| Submit idempotent | Jika attempt sudah `selesai`, submit ulang redirect ke hasil tanpa error |
| Lock position | Soal dengan `lock_position = true` tidak ikut diacak |
| Soft-lock paket | Paket aktif di sesi tidak bisa diedit soalnya (hanya metadata) |
| Poin negatif ≥ 0 | Nilai total attempt tidak bisa negatif — di-floor ke 0 sebelum konversi skala |
