---
title: Deploy ke Railway
description: Panduan lengkap deploy Sekolix CABT ke Railway — gratis, tanpa konfigurasi server, step by step untuk pemula.
sidebar:
  order: 1
---

import { Steps, Aside, Tabs, TabItem } from '@astrojs/starlight/components';

**Railway** adalah platform cloud yang paling mudah untuk deploy Laravel. Tidak perlu konfigurasi server, tidak perlu Docker — cukup hubungkan repository GitHub dan Railway menangani sisanya.

:::note[TL;DR]
| | |
|---|---|
| **Cocok untuk** | Pemula, IT sekolah, demo, ujian skala kecil–menengah |
| **Harga** | Gratis (500 jam/bln) · Hobby $5/bln (unlimited jam) |
| **Database** | MySQL native (satu klik) |
| **Waktu setup** | ~15–20 menit |
| **File persisten** | Volume berbayar (~$0.25/GB/bln) |
:::

---

## Prasyarat

Sebelum mulai, pastikan:

- ✅ Repository `sekolix-cabt` sudah di-push ke GitHub
- ✅ File `nixpacks.toml`, `start.sh`, dan `Procfile` ada di repository
- ✅ Punya akun GitHub
- ✅ PHP tersedia di mesin lokal (untuk generate `APP_KEY`)

---

## Langkah-langkah

<Steps>

1. **Buat akun Railway**

   Buka [railway.app](https://railway.app) lalu klik **Login with GitHub**.

   Izinkan Railway mengakses akun GitHub kamu. Akun Railway otomatis terhubung ke repository kamu.

2. **Buat project baru dari GitHub**

   Di dashboard Railway:
   - Klik **New Project**
   - Pilih **Deploy from GitHub repo**
   - Cari dan pilih repository `sekolix-cabt`
   - Klik **Deploy Now**

   Railway mulai build pertama. Build akan **gagal** karena database belum ada — itu normal, lanjutkan.

3. **Tambahkan MySQL**

   Di halaman project Railway:
   - Klik **+ New** → **Database** → **MySQL**
   - Klik **Add MySQL**

   Railway otomatis membuat database dan menyediakan variabel koneksi (`MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, `MYSQLPASSWORD`).

   <Aside type="tip" title="Cek kredensial MySQL">
   Klik service MySQL → tab **Variables** untuk melihat semua variabel koneksi.
   </Aside>

4. **Generate APP_KEY**

   `APP_KEY` adalah kunci enkripsi sesi. Jalankan perintah ini di folder project lokal:

   ```bash
   php artisan key:generate --show
   ```

   Output:
   ```
   base64:AbCdEfGhIjKlMnOpQrStUvWxYz1234567890AbCdEfGhIj=
   ```

   Copy seluruh teks tersebut termasuk `base64:` di awal.

5. **Set Environment Variables**

   Di Railway, klik service web → tab **Variables** → **Raw Editor**.

   Paste blok berikut, lalu sesuaikan nilainya:

   ```env
   APP_NAME=Sekolix CABT
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-app.up.railway.app

   APP_KEY=base64:GANTI_DENGAN_KEY_YANG_KAMU_GENERATE

   DB_CONNECTION=mysql
   DB_HOST=${{MySQL.MYSQLHOST}}
   DB_PORT=${{MySQL.MYSQLPORT}}
   DB_DATABASE=${{MySQL.MYSQLDATABASE}}
   DB_USERNAME=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}

   SESSION_DRIVER=database
   SESSION_LIFETIME=120
   CACHE_STORE=database
   QUEUE_CONNECTION=sync
   FILESYSTEM_DISK=local
   LOG_CHANNEL=stderr
   LOG_LEVEL=error
   ```

   <Aside type="caution">
   Jangan ubah bagian `${{MySQL.MYSQLHOST}}` — Railway mengisinya otomatis dari service MySQL yang kamu buat di langkah 3.
   </Aside>

6. **Dapatkan URL Aplikasi**

   Klik service web → **Settings** → **Networking** → **Generate Domain**.

   Railway menghasilkan URL seperti `https://sekolix-cabt-production.up.railway.app`.

   Kembali ke tab **Variables** dan update `APP_URL` dengan URL tersebut.

7. **Trigger Redeploy**

   Klik ikon **↺ Redeploy** di pojok kanan atas service.

   `start.sh` akan otomatis:
   - Cache konfigurasi Laravel
   - Jalankan migrasi database
   - Buat storage symlink
   - Seed data demo

   Pantau di tab **Logs**. Jika berhasil, kamu akan melihat banner sukses di log.

8. **Buat Akun Super Admin**

   Setelah deploy berhasil, buka tab **Shell** di Railway dan jalankan:

   ```bash
   php artisan tinker --execute="
   App\Models\User::create([
       'name'     => 'Super Admin',
       'username' => 'superadmin',
       'email'    => 'admin@sekolahmu.id',
       'password' => bcrypt('PasswordKuatKamu123!'),
       'level'    => 4,
   ]);
   "
   ```

   <Aside type="caution">
   Ganti `PasswordKuatKamu123!` dengan password yang kuat. Jika menggunakan data seeder, akun sudah dibuat otomatis.
   </Aside>

9. **Akses Aplikasi**

   | Halaman | URL |
   |---|---|
   | Login Peserta | `https://your-app.up.railway.app/login` |
   | Panel Admin/Guru | `https://your-app.up.railway.app/cabt` |
   | Livescore | `https://your-app.up.railway.app/sesi/{id}/livescore` |

</Steps>

---

## Environment Variables Lengkap

| Variabel | Contoh Nilai | Keterangan |
|---|---|---|
| `APP_NAME` | `Sekolix CABT` | Nama aplikasi |
| `APP_ENV` | `production` | Jangan ubah |
| `APP_DEBUG` | `false` | **Wajib `false`** di production |
| `APP_URL` | `https://xxx.up.railway.app` | URL lengkap aplikasi |
| `APP_KEY` | `base64:xxx=` | Key enkripsi — generate sekali |
| `DB_CONNECTION` | `mysql` | Driver database |
| `DB_HOST` | `${{MySQL.MYSQLHOST}}` | Host MySQL Railway |
| `DB_PORT` | `${{MySQL.MYSQLPORT}}` | Port MySQL |
| `DB_DATABASE` | `${{MySQL.MYSQLDATABASE}}` | Nama database |
| `DB_USERNAME` | `${{MySQL.MYSQLUSER}}` | Username MySQL |
| `DB_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` | Password MySQL |
| `SESSION_DRIVER` | `database` | Session di DB |
| `CACHE_STORE` | `database` | Cache di DB |
| `QUEUE_CONNECTION` | `sync` | Tanpa worker terpisah |
| `FILESYSTEM_DISK` | `local` | Storage lokal container |
| `LOG_CHANNEL` | `stderr` | Log ke Railway console |
| `LOG_LEVEL` | `error` | Hanya error yang dilog |

---

## Catatan Penting

### File Upload (Soal URAIAN)

<Aside type="caution" title="Storage Bersifat Sementara!">
Railway menggunakan container yang di-reset setiap redeploy. File upload peserta **akan hilang** saat restart.

**Solusi:**
1. **Railway Volume** — tambah persistent storage di Railway project → **Add Service** → **Volume**, mount ke `/app/storage/app`
2. **Cloudflare R2** (gratis 10 GB/bln) — set `FILESYSTEM_DISK=s3` dan konfigurasi S3-compatible credentials
</Aside>

### Batas Free Tier

| Resource | Batas |
|---|---|
| CPU | 500 jam/bulan |
| RAM | 512 MB |
| MySQL | 1 GB |
| Bandwidth | 100 GB/bulan |

<Aside type="tip">
Untuk ujian concurrent 30+ peserta, pertimbangkan upgrade ke plan **Hobby** ($5/bulan).
</Aside>

---

## Troubleshooting

### Build gagal

1. Pastikan `nixpacks.toml`, `start.sh`, `Procfile` sudah ter-commit dan di-push
2. Cek tab **Build Logs** untuk pesan error spesifik
3. Pastikan `composer.json` dan `package.json` valid

### Error 500

1. Cek tab **Logs** — cari baris `[ERROR]` atau `exception`
2. Pastikan `APP_KEY` sudah di-set (bukan kosong atau placeholder)
3. Test koneksi database via Shell: `php artisan tinker` → `DB::connection()->getPdo();`
4. Set `APP_DEBUG=true` sementara untuk melihat detail error, lalu kembalikan ke `false`

### Migrasi gagal (SQLSTATE HY000)

1. Pastikan MySQL plugin sudah ditambahkan
2. `DB_HOST` harus `${{MySQL.MYSQLHOST}}` (bukan IP manual)
3. Tunggu 1–2 menit setelah menambah MySQL, lalu redeploy

### Session reset setelah redeploy

Penyebab: `APP_KEY` di-generate ulang setiap startup. Pastikan `APP_KEY` di-set secara permanen di Railway Variables (langkah 4–5).

### File upload gagal

```bash
# Di Railway Shell:
ls -la public/storage           # cek symlink
php artisan storage:link        # buat ulang jika tidak ada
chmod -R 775 storage            # pastikan permission benar
```

---

## Langkah Selanjutnya

- [Pengaturan Umum](/sekolix-cabt-site/docs/panduan-super-admin/pengaturan-umum) — konfigurasi nama sekolah, logo, dan preferensi sistem
- [Manajemen User](/sekolix-cabt-site/docs/panduan-admin/manajemen-user) — buat akun guru dan peserta
- [Troubleshooting](/sekolix-cabt-site/docs/referensi/troubleshooting) — solusi masalah umum
