---
title: Fitur Anti-Kecurangan
description: Penjelasan teknis semua fitur proctoring, cara kerjanya, dan rekomendasi konfigurasi.
sidebar:
  order: 3
---

## Gambaran Umum

Sekolix CABT memiliki sistem pengawasan berlapis untuk meminimalkan kecurangan selama ujian online. Sistem bekerja pada tiga level:

1. **Server-side** — validasi waktu, sesi, dan attempt di server; tidak bisa dimanipulasi dari browser
2. **Client-side** — deteksi perilaku browser (perpindahan tab, fullscreen, copy-paste)
3. **Jaringan** — pembatasan akses berdasarkan IP komputer

Konfigurasi semua fitur ini dikelola oleh Super Admin di **Pengaturan Umum → Anti-Kecurangan**.

---

## Deteksi Perpindahan Tab / Window

### Cara Kerja

Browser menyediakan API `Page Visibility` yang memberitahu halaman saat tab menjadi tidak aktif. Sekolix CABT memantau dua event:

- `visibilitychange` — tab berpindah antara foreground dan background
- `blur` — jendela browser kehilangan fokus (berpindah ke aplikasi lain)

Setiap kali event ini terdeteksi, hitungan pelanggaran bertambah, notifikasi tampil ke peserta, dan event dicatat di **Attempt Log** dengan timestamp.

### Yang Terhitung sebagai Pelanggaran

| ✅ Terhitung | ❌ Tidak Terhitung |
|---|---|
| Berpindah ke tab lain di browser | Scroll di dalam halaman ujian |
| Membuka tab atau window baru | Klik di dalam area ujian |
| Alt+Tab ke aplikasi lain (Word, kalkulator) | Koneksi internet terputus sesaat |
| Menekan Esc saat fullscreen wajib aktif | Menggeser halaman ke bawah/atas |
| Meminimalkan jendela browser | |

### Notifikasi ke Peserta

Setiap pelanggaran menampilkan notifikasi di layar peserta:

> ⚠️ Perpindahan tab terdeteksi (2 dari 3). Terus berpindah tab dapat mengakibatkan ujian dikumpulkan otomatis.

### Tindakan saat Batas Tercapai

| Konfigurasi Tindakan | Efek |
|---|---|
| **Peringatan** | Notifikasi lebih keras muncul, ujian tetap berjalan. Guru bisa melihat hitungan pelanggaran di monitor sesi |
| **Auto-Submit** | Ujian dikumpulkan otomatis, peserta langsung diarahkan ke halaman hasil |

---

## Wajib Fullscreen

### Cara Kerja

Saat fitur ini aktif, halaman ujian menggunakan **Fullscreen API** browser:

- Tombol "Mulai Ujian" tidak berfungsi sebelum browser masuk ke mode fullscreen
- Browser menampilkan dialog izin fullscreen (satu kali per sesi browser)
- Jika peserta keluar dari fullscreen dengan cara apapun, event dihitung sebagai **perpindahan tab** dengan counter yang sama

### Cara Keluar Fullscreen yang Terdeteksi

- Menekan tombol **Esc**
- Menekan **F11** (toggle fullscreen)
- Mengklik tombol fullscreen di browser
- Membuka dialog sistem (beberapa browser)

### Keterbatasan

- Pengguna dua monitor bisa berpindah ke monitor kedua tanpa mudah terdeteksi
- Ekstensi browser tertentu dapat menyiasati fullscreen requirement
- Tidak mencegah penggunaan ponsel terpisah sebagai alat contek

---

## Pencegahan Copy-Paste

Saat aktif, event berikut dinonaktifkan di halaman ujian:

| Event | Shortcut yang Diblokir |
|---|---|
| `copy` | Ctrl+C / Cmd+C |
| `paste` | Ctrl+V / Cmd+V |
| `cut` | Ctrl+X / Cmd+X |
| `selectall` | Ctrl+A / Cmd+A |
| `contextmenu` | Klik kanan (jika fitur Cegah Klik Kanan juga aktif) |

:::caution
**Keterbatasan:** Fitur ini bekerja di level JavaScript. Peserta yang menggunakan **browser developer tools** (F12), ekstensi browser, atau browser khusus masih bisa menyiasatinya. Fitur ini hanya efektif sebagai pencegahan pada pengguna biasa.
:::

---

## Whitelist IP

### Cara Kerja

Jika whitelist IP dikonfigurasi, server memeriksa IP sumber setiap request ke endpoint berikut:

- Halaman konfirmasi ujian (sebelum mulai)
- Halaman pengerjaan ujian
- Endpoint pengiriman jawaban (AJAX)

IP yang tidak terdaftar mendapat respons **403 Forbidden** dan tidak dapat mengakses halaman ujian.

### Format Konfigurasi

```
# IP tunggal — komputer tertentu
192.168.1.50

# Range CIDR — seluruh subnet lab (192.168.1.1 s.d. 192.168.1.254)
192.168.1.0/24

# Beberapa range berbeda
10.0.0.0/8
172.16.5.100
```

### Konfigurasi di Belakang Reverse Proxy

Jika aplikasi berjalan di belakang Nginx atau load balancer, server menerima IP proxy bukan IP klien. Tambahkan di file `.env`:

```ini
# Semua proxy dipercaya (gunakan di lingkungan proxy internal)
APP_TRUSTED_PROXIES=*

# Atau daftarkan IP proxy spesifik
APP_TRUSTED_PROXIES=10.0.0.1,10.0.0.2
```

Setelah mengubah `.env`, jalankan:

```bash
php artisan config:clear
php artisan config:cache
```

---

## Attempt Log

Semua aktivitas peserta selama ujian dicatat otomatis di **Attempt Log** — tersimpan permanen di database.

### Event yang Dicatat

| Event | Keterangan |
|---|---|
| `mulai` | Peserta klik "Mulai Ujian" dan attempt dibuat |
| `resume` | Peserta membuka kembali ujian setelah koneksi terputus atau browser ditutup |
| `tab_switch` | Perpindahan tab atau window terdeteksi |
| `blur` | Jendela browser kehilangan fokus |
| `fullscreen_keluar` | Peserta keluar dari mode fullscreen |
| `submit` | Peserta klik "Selesai & Kumpulkan" secara manual |
| `timeout` | Auto-submit karena waktu ujian habis (0 detik) |
| `auto_submit_tab` | Auto-submit karena batas perpindahan tab tercapai |
| `kick` | Peserta dikeluarkan paksa oleh guru atau admin |

### Cara Melihat Attempt Log

1. Buka halaman **Monitor** sesi yang aktif atau sudah selesai
2. Klik nama peserta di tabel monitor
3. Tab **"Log Aktivitas"** menampilkan timeline semua event dengan timestamp

Log ini dapat digunakan sebagai bukti jika ada peserta yang mengklaim terjadi masalah teknis selama ujian.

---

## Paksa Keluar (Kick)

Guru atau Admin dapat mengeluarkan paksa peserta yang sedang mengerjakan:

1. Buka **Monitor** sesi yang berlangsung
2. Di baris peserta yang ingin dikeluarkan, klik tombol **"Paksa Keluar"**
3. Konfirmasi pada dialog yang muncul

**Efek paksa keluar:**

- Peserta tiba-tiba dilogout dari halaman ujian (halaman otomatis redirect)
- Status attempt berubah menjadi **"Diskualifikasi"**
- Event `kick` dicatat di Attempt Log dengan timestamp
- Peserta tidak dapat memulai ujian lagi di sesi tersebut — bahkan jika masih ada sisa attempt

---

## Rekomendasi Konfigurasi per Skenario

| Skenario | Maks. Tab | Tindakan | Fullscreen | Copy-Paste | IP Whitelist |
|---|---|---|---|---|---|
| Lab komputer + pengawas fisik | 3 | Peringatan | Mati | Mati | Aktif (IP lab) |
| Lab komputer tanpa pengawas | 2 | Auto-Submit | Aktif | Aktif | Aktif (IP lab) |
| Ujian online dari rumah | 1 | Auto-Submit | Aktif | Aktif | Mati |
| Latihan / try-out informal | 0 (tidak dibatasi) | — | Mati | Mati | Mati |

:::tip
Untuk konfigurasi terbaik: aktifkan **Whitelist IP** jika ujian di lab, dan aktifkan **Auto-Submit** pada skenario tanpa pengawas fisik. Dua kombinasi ini memberikan jaminan keamanan paling kuat.
:::
