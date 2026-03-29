---
title: Deploy ke Render.com
description: Deploy Sekolix CABT ke Render.com dengan free tier 750 jam/bulan dan persistent disk gratis.
sidebar:
  order: 2
---

import { Steps, Aside } from '@astrojs/starlight/components';

**Render.com** adalah platform cloud yang menawarkan free tier 750 jam/bulan dengan persistent disk gratis — alternatif solid untuk Railway.

:::note[TL;DR]
| | |
|---|---|
| **Cocok untuk** | Demo, sekolah kecil, alternatif Railway |
| **Harga** | Gratis (750 jam/bln) · Starter $7/bln |
| **Database** | PostgreSQL (gratis) · MySQL hanya di paket berbayar |
| **Waktu setup** | ~20–25 menit |
| **File persisten** | Disk 1 GB gratis |
:::

<Aside type="caution" title="PostgreSQL, bukan MySQL">
Render free tier menggunakan **PostgreSQL**. Sekolix CABT dikembangkan dengan MySQL — kamu perlu MySQL eksternal (misalnya [PlanetScale](https://planetscale.com) gratis 5 GB) atau upgrade ke paket berbayar.

Panduan ini menggunakan **PlanetScale** sebagai database MySQL eksternal gratis.
</Aside>

---

## Prasyarat

- ✅ Repository `sekolix-cabt` sudah di-push ke GitHub
- ✅ File `start.sh` ada di repository
- ✅ Punya akun GitHub
- ✅ Akun [PlanetScale](https://planetscale.com) (gratis) atau database MySQL eksternal lain
- ✅ PHP tersedia di mesin lokal (untuk generate `APP_KEY`)

---

## Langkah-langkah

<Steps>

1. **Buat database MySQL di PlanetScale**

   Buka [planetscale.com](https://planetscale.com) → **Create a database**.

   - Nama: `sekolix-cabt`
   - Region: pilih yang dekat (Singapore untuk Indonesia)
   - Plan: **Free**

   Setelah dibuat, buka database → **Connect** → pilih **Laravel** dari dropdown.

   Catat empat nilai ini:
   ```
   DB_HOST=aws.connect.psdb.cloud
   DB_PORT=3306
   DB_DATABASE=sekolix-cabt
   DB_USERNAME=xxxxxxxx
   DB_PASSWORD=pscale_pw_xxxxxxxx
   ```

   Aktifkan juga `MYSQL_ATTR_SSL_CA` — PlanetScale memerlukan koneksi SSL.

   <Aside type="note">
   PlanetScale menggunakan branching (seperti Git). Branch `main` adalah database production kamu.
   </Aside>

2. **Generate APP_KEY**

   Di folder project lokal:

   ```bash
   php artisan key:generate --show
   ```

   Copy outputnya (termasuk `base64:` di awal).

3. **Buat Web Service di Render**

   Buka [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**.

   - **Connect a repository** → pilih `sekolix-cabt`
   - **Runtime**: `Docker` (jika ada Dockerfile) atau `Native Environment` → PHP

   <Aside type="tip">
   Render mendukung deteksi otomatis. Jika tidak ada Dockerfile, pilih **Native Environment** dan set build/start command secara manual.
   </Aside>

4. **Konfigurasi Build & Start Command**

   Di halaman konfigurasi Render:

   | Setting | Nilai |
   |---|---|
   | **Build Command** | `composer install --no-dev --optimize-autoloader && npm ci && npm run build` |
   | **Start Command** | `bash start.sh` |
   | **Health Check Path** | `/login` |
   | **Instance Type** | Free |

5. **Set Environment Variables**

   Scroll ke bagian **Environment Variables** → klik **Add from .env**.

   Isi variabel berikut:

   ```env
   APP_NAME=Sekolix CABT
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-app.onrender.com

   APP_KEY=base64:GANTI_DENGAN_KEY_YANG_KAMU_GENERATE

   DB_CONNECTION=mysql
   DB_HOST=aws.connect.psdb.cloud
   DB_PORT=3306
   DB_DATABASE=sekolix-cabt
   DB_USERNAME=DARI_PLANETSCALE
   DB_PASSWORD=DARI_PLANETSCALE

   MYSQL_ATTR_SSL_CA=/etc/ssl/certs/ca-certificates.crt

   SESSION_DRIVER=database
   SESSION_LIFETIME=120
   CACHE_STORE=database
   QUEUE_CONNECTION=sync
   FILESYSTEM_DISK=local
   LOG_CHANNEL=stderr
   LOG_LEVEL=error
   ```

6. **Deploy**

   Klik **Create Web Service**. Render akan mulai build dan deploy otomatis.

   Pantau di tab **Logs**. Proses build pertama memakan waktu 5–10 menit.

7. **Update APP_URL**

   Setelah deploy selesai, Render menampilkan URL seperti `https://sekolix-cabt.onrender.com`.

   Pergi ke **Environment** → update `APP_URL` dengan URL tersebut → klik **Save Changes**.

   Render otomatis redeploy dengan nilai baru.

8. **Buat Akun Super Admin**

   Buka **Shell** di Render (tab **Shell**) dan jalankan:

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

9. **Akses Aplikasi**

   | Halaman | URL |
   |---|---|
   | Login Peserta | `https://your-app.onrender.com/login` |
   | Panel Admin/Guru | `https://your-app.onrender.com/cabt` |

</Steps>

---

## Environment Variables Lengkap

| Variabel | Contoh Nilai | Keterangan |
|---|---|---|
| `APP_NAME` | `Sekolix CABT` | Nama aplikasi |
| `APP_ENV` | `production` | Jangan ubah |
| `APP_DEBUG` | `false` | **Wajib `false`** di production |
| `APP_URL` | `https://xxx.onrender.com` | URL lengkap aplikasi |
| `APP_KEY` | `base64:xxx=` | Key enkripsi |
| `DB_CONNECTION` | `mysql` | Driver database |
| `DB_HOST` | `aws.connect.psdb.cloud` | Host PlanetScale |
| `DB_PORT` | `3306` | Port MySQL |
| `DB_DATABASE` | `sekolix-cabt` | Nama database PlanetScale |
| `DB_USERNAME` | `xxxxxxxx` | Username PlanetScale |
| `DB_PASSWORD` | `pscale_pw_xxx` | Password PlanetScale |
| `MYSQL_ATTR_SSL_CA` | `/etc/ssl/certs/ca-certificates.crt` | SSL cert untuk PlanetScale |
| `SESSION_DRIVER` | `database` | Session di DB |
| `CACHE_STORE` | `database` | Cache di DB |
| `QUEUE_CONNECTION` | `sync` | Tanpa worker terpisah |
| `LOG_CHANNEL` | `stderr` | Log ke Render console |

---

## Catatan Penting

### Free Tier Render

| Resource | Batas |
|---|---|
| Jam/bulan | 750 jam |
| RAM | 512 MB |
| Disk | 1 GB persistent |
| **Spin down** | **Service mati setelah 15 menit tidak aktif** |

<Aside type="caution" title="Cold Start">
Free tier Render akan **spin down** (mati) jika tidak ada request selama 15 menit. Request pertama setelah mati bisa memakan waktu 30–60 detik. Untuk menghindari ini, upgrade ke **Starter Plan** ($7/bln) atau gunakan layanan ping eksternal seperti [UptimeRobot](https://uptimerobot.com).
</Aside>

---

## Troubleshooting

### Build gagal: PHP not found

Render mungkin tidak mendeteksi PHP secara otomatis. Tambahkan file `render.yaml` di root project:

```yaml
services:
  - type: web
    name: sekolix-cabt
    runtime: docker
    buildCommand: composer install --no-dev --optimize-autoloader && npm ci && npm run build
    startCommand: bash start.sh
```

### Error koneksi PlanetScale (SSL)

Pastikan `MYSQL_ATTR_SSL_CA` di-set. Jika masih gagal, coba nilai:
```
MYSQL_ATTR_SSL_CA=/etc/ssl/certs/ca-bundle.crt
```

### Service tidak mau start

Cek tab **Logs** → pastikan `start.sh` memiliki izin eksekusi (`chmod +x start.sh`) dan sudah ter-commit.

---

## Langkah Selanjutnya

- [Pengaturan Umum](/sekolix-cabt-site/docs/panduan-super-admin/pengaturan-umum)
- [Manajemen User](/sekolix-cabt-site/docs/panduan-admin/manajemen-user)
- [Troubleshooting](/sekolix-cabt-site/docs/referensi/troubleshooting)
