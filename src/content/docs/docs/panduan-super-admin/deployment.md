---
title: Deployment ke Cloud (Railway)
description: Panduan lengkap deploy Sekolix CABT ke Railway — gratis, tanpa konfigurasi server, step by step untuk pemula.
---

import { Steps, Aside, Tabs, TabItem } from '@astrojs/starlight/components';

Panduan ini memandu kamu mempublikasikan Sekolix CABT ke internet menggunakan **Railway** — platform cloud yang paling mudah untuk aplikasi Laravel, gratis untuk keperluan demo dan testing.

<Aside type="note" title="Cocok untuk siapa?">
Panduan ini ditujukan untuk IT sekolah atau Super Admin yang ingin menjalankan Sekolix CABT secara online tanpa perlu menyewa server fisik. Tidak diperlukan pengalaman DevOps.
</Aside>

---

## Pilihan Platform

Beberapa platform cloud yang mendukung Laravel secara gratis:

| Platform | Gratis | Database | File Persisten | Kemudahan |
|---|---|---|---|---|
| **Railway** ⭐ | 500 jam/bulan | MySQL ✅ | Volume (berbayar) | ⭐⭐⭐⭐⭐ |
| **Render** | 750 jam/bulan | PostgreSQL ✅ | ✅ Disk gratis | ⭐⭐⭐⭐ |
| **Fly.io** | 3 VM kecil | MySQL/PgSQL ✅ | ✅ Volume | ⭐⭐⭐ |
| **VPS/cPanel** | — (berbayar) | MySQL ✅ | ✅ Penuh | ⭐⭐ |

Panduan ini menggunakan **Railway** karena paling mudah di-setup dan mendukung MySQL secara native — tidak perlu konfigurasi tambahan.

---

## Persiapan

Sebelum mulai, pastikan kamu sudah:

- ✅ Repository `sekolix-cabt` di-push ke GitHub (`rezacodev/sekolix-cabt`)
- ✅ File `nixpacks.toml`, `start.sh`, dan `Procfile` sudah ada di repository
- ✅ Punya akun GitHub
- ✅ PHP tersedia di mesin lokal (untuk generate `APP_KEY`)

---

## Deploy ke Railway

<Steps>

1. **Buat akun Railway**

   Buka [railway.app](https://railway.app) lalu klik **Login with GitHub**.

   Izinkan Railway mengakses akun GitHub kamu. Akun Railway otomatis terhubung ke GitHub.

2. **Buat project baru dari GitHub**

   Di dashboard Railway:
   - Klik **New Project**
   - Pilih **Deploy from GitHub repo**
   - Cari dan pilih repository **`rezacodev/sekolix-cabt`**
   - Klik **Deploy Now**

   Railway akan mulai proses build pertama (5–10 menit). Build akan **gagal** karena database dan environment variables belum di-set — itu normal, lanjutkan ke langkah berikutnya.

3. **Tambahkan Plugin MySQL**

   Di halaman project Railway:
   - Klik tombol **+ New** (atau **Add Service**)
   - Pilih **Database** → **MySQL**
   - Klik **Add MySQL**

   Railway otomatis membuat database dan menyediakan variabel koneksi seperti `MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, `MYSQLPASSWORD`.

   <Aside type="tip" title="Cara melihat kredensial MySQL">
   Klik service MySQL → tab **Variables** untuk melihat semua variabel koneksi. Kamu akan menggunakannya di langkah berikutnya.
   </Aside>

4. **Generate APP_KEY di mesin lokal**

   `APP_KEY` adalah kunci enkripsi untuk session dan cookie. Harus di-generate sebelum aplikasi bisa berjalan.

   Buka terminal di folder project Laravel kamu:

   ```bash
   php artisan key:generate --show
   ```

   Output akan muncul seperti ini:
   ```
   base64:AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCdEfGhIj=
   ```

   **Copy seluruh teks tersebut** (termasuk `base64:` di awal).

5. **Set Environment Variables**

   Di Railway, klik service web kamu (bukan MySQL) → tab **Variables** → klik **Raw Editor**.

   Paste seluruh blok berikut, lalu sesuaikan nilainya:

   ```env
   # ── Identitas Aplikasi ─────────────────────────────────
   APP_NAME=Sekolix CABT
   APP_ENV=production
   APP_DEBUG=false

   # ── Ganti dengan URL yang Railway berikan (langkah 6) ──
   APP_URL=https://your-app.up.railway.app

   # ── Paste hasil php artisan key:generate --show ────────
   APP_KEY=base64:GANTI_DENGAN_KEY_YANG_KAMU_GENERATE

   # ── Koneksi MySQL (pakai referensi variabel Railway) ───
   DB_CONNECTION=mysql
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_DATABASE=${{MySQL.MYSQLDATABASE}}
   DB_USERNAME=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}

   # ── Session & Cache ────────────────────────────────────
   SESSION_DRIVER=database
   SESSION_LIFETIME=120
   CACHE_STORE=database

   # ── Queue (sync = langsung, tanpa worker terpisah) ─────
   QUEUE_CONNECTION=sync

   # ── Storage & Log ──────────────────────────────────────
   FILESYSTEM_DISK=local
   LOG_CHANNEL=stderr
   LOG_LEVEL=error
   ```

   <Aside type="caution" title="Penting: Ganti placeholder">
   - `APP_KEY` → hasil perintah `php artisan key:generate --show`
   - `APP_URL` → URL yang kamu dapat di langkah 6
   - Jangan ubah bagian `${{MySQL.MYSQLHOST}}` dll — Railway akan mengisinya otomatis
   </Aside>

6. **Dapatkan URL Aplikasi**

   Di Railway, klik service web kamu → tab **Settings** → bagian **Networking** → klik **Generate Domain**.

   Railway akan membuat URL seperti:
   ```
   https://sekolix-cabt-production.up.railway.app
   ```

   Kembali ke tab **Variables** dan update `APP_URL` dengan URL tersebut.

7. **Trigger Redeploy**

   Setelah semua variabel di-set, klik **Redeploy** (ikon ↺ di pojok kanan atas service).

   Railway akan menjalankan ulang build dan `start.sh` yang secara otomatis:
   - Men-cache konfigurasi Laravel
   - Menjalankan migrasi database (membuat semua tabel)
   - Membuat storage symlink
   - Memulai web server

   Pantau prosesnya di tab **Logs**. Jika berhasil, kamu akan melihat:
   ```
   ╔══════════════════════════════════════════╗
   ║         Sekolix CABT Siap! 🚀            ║
   ╚══════════════════════════════════════════╝
   ```

8. **Buat Akun Super Admin**

   Setelah deploy berhasil, buka tab **Shell** di Railway (ikon terminal) dan jalankan seeder:

   ```bash
   php artisan db:seed --force
   ```

   Seeder akan membuat akun-akun default. Atau buat Super Admin manual:

   ```bash
   php artisan tinker
   ```

   Lalu di dalam tinker:

   ```php
   App\Models\User::create([
       'name'     => 'Super Admin',
       'username' => 'superadmin',
       'email'    => 'admin@sekolahmu.id',
       'password' => bcrypt('passwordKuatKamu123!'),
       'level'    => 4,
   ]);
   ```

   Ketik `exit` untuk keluar dari tinker.

   <Aside type="caution">
   Ganti `passwordKuatKamu123!` dengan password yang kuat dan unik!
   </Aside>

9. **Akses Aplikasi**

   Aplikasi kamu sudah online! Akses via:

   | Halaman | URL |
   |---|---|
   | **Login Peserta** | `https://your-app.up.railway.app/login` |
   | **Panel Admin/Guru** | `https://your-app.up.railway.app/cabt` |
   | **Livescore** | `https://your-app.up.railway.app/sesi/{id}/livescore` |

</Steps>

---

## Referensi Lengkap Environment Variables

Berikut daftar semua variabel yang bisa dikonfigurasi:

| Variabel | Contoh Nilai | Keterangan |
|---|---|---|
| `APP_NAME` | `Sekolix CABT` | Nama aplikasi yang tampil di browser |
| `APP_ENV` | `production` | Environment — jangan ubah |
| `APP_DEBUG` | `false` | **Wajib `false`** di production |
| `APP_URL` | `https://xxx.up.railway.app` | URL lengkap aplikasi |
| `APP_KEY` | `base64:xxx=` | Key enkripsi — generate sekali, jangan ubah |
| `DB_CONNECTION` | `mysql` | Driver database |
| `DB_HOST` | `${{MySQL.MYSQLHOST}}` | Host MySQL Railway |
| `DB_PORT` | `${{MySQL.MYSQLPORT}}` | Port MySQL Railway |
| `DB_DATABASE` | `${{MySQL.MYSQLDATABASE}}` | Nama database Railway |
| `DB_USERNAME` | `${{MySQL.MYSQLUSER}}` | Username MySQL Railway |
| `DB_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` | Password MySQL Railway |
| `SESSION_DRIVER` | `database` | Simpan session di DB |
| `SESSION_LIFETIME` | `120` | Durasi session (menit) |
| `CACHE_STORE` | `database` | Simpan cache di DB |
| `QUEUE_CONNECTION` | `sync` | `sync` = langsung, tanpa worker |
| `FILESYSTEM_DISK` | `local` | Disk storage (lihat catatan di bawah) |
| `LOG_CHANNEL` | `stderr` | Log ke stdout Railway |
| `LOG_LEVEL` | `error` | Hanya log error (hemat storage) |

---

## Catatan Penting

### File Upload (Soal URAIAN)

<Aside type="caution" title="Storage Bersifat Sementara!">
Railway menggunakan container yang di-reset setiap kali redeploy. File yang diupload peserta (jawaban soal URAIAN berupa gambar/PDF) **akan hilang** saat container restart atau redeploy.

**Solusi untuk production serius:**

1. **Railway Volume** — tambah persistent storage:
   - Railway project → **Add Service** → **Volume**
   - Mount path: `/app/storage/app`
   - Harga: ~$0.25/GB/bulan

2. **Cloudflare R2** (gratis 10 GB/bulan) — ubah `FILESYSTEM_DISK=s3` dan konfigurasikan S3-compatible credentials di `.env`.

3. **Nonaktifkan upload soal URAIAN** jika tidak dibutuhkan.
</Aside>

### Batas Free Tier Railway

| Resource | Batas Gratis |
|---|---|
| CPU | 500 jam/bulan (~20 hari) |
| RAM | 512 MB |
| Storage | Ephemeral (reset saat restart) |
| Bandwidth | 100 GB/bulan |
| MySQL | 1 GB |

<Aside type="tip">
Untuk ujian aktif di sekolah (concurrent 30+ peserta), pertimbangkan upgrade Railway ke plan **Hobby** ($5/bulan) untuk performa lebih stabil.
</Aside>

---

## Deploy ke Platform Lain

<Tabs>
  <TabItem label="Render.com">

  Render menawarkan free tier 750 jam/bulan dengan persistent disk gratis.

  **Konfigurasi di Render Dashboard:**

  | Setting | Nilai |
  |---|---|
  | **Runtime** | Node.js + PHP (atau Docker) |
  | **Build Command** | `composer install --no-dev --optimize-autoloader && npm ci && npm run build` |
  | **Start Command** | `bash start.sh` |
  | **Health Check Path** | `/login` |

  **Environment Variables** — sama seperti Railway, bedanya variabel koneksi MySQL harus diisi manual (bukan referensi `${{...}}`).

  <Aside type="caution">
  Render free tier menggunakan **PostgreSQL**, bukan MySQL. Butuh ubah `DB_CONNECTION=pgsql` di `.env` dan pastikan semua query kompatibel, atau pilih MySQL di paket berbayar.

  Alternatif: gunakan [PlanetScale](https://planetscale.com) (MySQL serverless, gratis 5GB) sebagai database eksternal.
  </Aside>

  </TabItem>
  <TabItem label="Fly.io">

  Fly.io memberikan 3 VM gratis dengan kontrol penuh. Lebih teknis dari Railway, cocok untuk developer yang familiar dengan Docker.

  **Instalasi Fly CLI:**
  ```bash
  # Windows (PowerShell)
  pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"

  # macOS/Linux
  curl -L https://fly.io/install.sh | sh
  ```

  **Deploy:**
  ```bash
  cd sekolix-cabt
  fly auth login        # Login akun
  fly launch            # Deteksi otomatis & buat fly.toml
  fly mysql create      # Buat database MySQL
  fly deploy            # Deploy ke Fly.io
  ```

  <Aside type="note">
  Fly.io memerlukan `fly.toml` dan mungkin `Dockerfile` untuk konfigurasi yang tepat. Lihat [dokumentasi Fly Laravel](https://fly.io/docs/laravel/) untuk panduan lengkap.
  </Aside>

  </TabItem>
  <TabItem label="VPS/cPanel">

  Jika kamu memiliki server sendiri (VPS, shared hosting dengan SSH, cPanel + Softaculous), lihat panduan instalasi on-premise:

  → [Instalasi di Server Sendiri](/sekolix-cabt-site/docs/panduan-super-admin/instalasi)

  Script `start.sh` bisa dijalankan langsung di server setelah setup awal:
  ```bash
  bash start.sh
  ```

  Untuk menjalankan sebagai background service (supaya tidak mati saat terminal ditutup):
  ```bash
  # Menggunakan PM2 (Node.js process manager, bisa manage PHP juga)
  npm install -g pm2
  pm2 start "bash start.sh" --name sekolix-cabt
  pm2 save
  pm2 startup
  ```

  </TabItem>
</Tabs>

---

## Troubleshooting

### Build gagal di Railway

**Masalah:** Railway menampilkan error saat build.

**Solusi:**
1. Pastikan file `nixpacks.toml`, `start.sh`, `Procfile` sudah ter-commit dan di-push ke GitHub
2. Cek tab **Build Logs** di Railway untuk pesan error spesifik
3. Pastikan `composer.json` dan `package.json` valid (tidak ada syntax error)

---

### Error 500 (Internal Server Error)

**Masalah:** Aplikasi menampilkan halaman error 500.

**Solusi:**
1. Buka tab **Logs** di Railway — cari baris yang diawali `[ERROR]` atau `exception`
2. Pastikan `APP_KEY` sudah di-set (bukan kosong atau placeholder)
3. Pastikan semua variabel `DB_*` sudah benar — test koneksi database via Shell:
   ```bash
   php artisan tinker
   DB::connection()->getPdo();
   ```
4. Set `APP_DEBUG=true` sementara untuk melihat pesan error detail, lalu kembalikan ke `false`

---

### Migrasi gagal: SQLSTATE\[HY000\]

**Masalah:** `php artisan migrate` gagal dengan error koneksi database.

**Solusi:**
1. Pastikan plugin **MySQL** sudah ditambahkan di Railway project
2. Variabel `DB_HOST` harus menggunakan referensi: `${{MySQL.MYSQLHOST}}`
3. Tunggu 1–2 menit setelah menambahkan plugin MySQL, lalu redeploy

---

### File upload gagal / tidak bisa diakses

**Masalah:** File soal URAIAN tidak bisa diupload atau diakses.

**Solusi:**
1. Cek apakah storage link sudah ada — via Railway Shell:
   ```bash
   ls -la public/storage
   ```
2. Jika tidak ada, jalankan:
   ```bash
   php artisan storage:link
   ```
3. Pastikan direktori `storage/app/private` bisa ditulis:
   ```bash
   chmod -R 775 storage
   ```

---

### Aplikasi lambat / timeout saat ujian

**Masalah:** Peserta mengalami halaman lambat atau timeout, terutama saat banyak peserta aktif.

**Penyebab:** Free tier Railway hanya 512 MB RAM. Filament + ujian concurrent bisa melebihi batas ini.

**Solusi:**
1. Upgrade ke Railway Hobby plan ($5/bulan) untuk RAM lebih besar
2. Aktifkan OPcache melalui `nixpacks.toml` (tambahkan `php82Extensions.opcache` ke `nixPkgs`)
3. Pastikan cache sudah aktif (cek dengan `php artisan config:show cache.default`)

---

### Session terus reset setelah redeploy

**Masalah:** User harus login ulang setiap kali ada redeploy.

**Penyebab:** `APP_KEY` di-generate ulang setiap startup karena tidak di-set di environment variables.

**Solusi:** Set `APP_KEY` secara permanen di Railway Dashboard → Variables. Lihat Langkah 4–5.

---

## Checklist Sebelum Go-Live

Sebelum menggunakan Sekolix CABT untuk ujian sungguhan, pastikan:

- [ ] `APP_DEBUG=false` sudah di-set
- [ ] `APP_KEY` tetap (tidak di-generate ulang setiap restart)
- [ ] Migrasi berhasil — tidak ada error di Logs saat startup
- [ ] Bisa login sebagai Super Admin di `/cabt`
- [ ] General Setting sudah dikonfigurasi (nama sekolah, logo, dll.)
- [ ] Test membuat sesi ujian dan mengerjakan ujian sebagai peserta
- [ ] Pertimbangkan Railway Volume untuk file upload URAIAN yang persisten
