---
title: Deploy ke DigitalOcean App Platform
description: Deploy Sekolix CABT ke DigitalOcean App Platform — managed cloud dengan antarmuka bersih dan database MySQL terkelola.
sidebar:
  order: 5
---

import { Steps, Aside } from '@astrojs/starlight/components';

**DigitalOcean App Platform** adalah layanan managed cloud yang menangani deployment, scaling, dan SSL secara otomatis — cocok untuk tim yang ingin production-grade tanpa kelola server.

:::note[TL;DR]
| | |
|---|---|
| **Cocok untuk** | Tim dengan anggaran, sekolah yang butuh SLA |
| **Harga** | Basic $5/bln (app) + $15/bln (MySQL Managed) |
| **Database** | MySQL Managed Database (fully managed) |
| **Waktu setup** | ~25–35 menit |
| **File persisten** | ✅ Managed storage |
:::

<Aside type="note" title="Tidak Ada Free Tier Penuh">
DigitalOcean App Platform memiliki free tier terbatas (static sites saja). Untuk PHP + MySQL, kamu perlu paket berbayar mulai $5/bln untuk app + $15/bln untuk MySQL Managed Database.

Jika butuh gratis, gunakan [Railway](./railway) atau [Render](./render).
</Aside>

---

## Prasyarat

- ✅ Repository `sekolix-cabt` sudah di-push ke GitHub
- ✅ Akun DigitalOcean (perlu kartu kredit)
- ✅ PHP tersedia di mesin lokal (untuk generate `APP_KEY`)
- ✅ [doctl](https://docs.digitalocean.com/reference/doctl/how-to/install/) CLI (opsional, untuk App Spec)

---

## Langkah-langkah

<Steps>

1. **Buat MySQL Managed Database**

   Di DigitalOcean Dashboard:
   - Klik **Databases** di sidebar kiri
   - Klik **Create Database**
   - Pilih **MySQL** versi 8
   - Data center: **Singapore** (SGP1)
   - Plan: **Basic** ($15/bln, 1 GB RAM, 10 GB SSD)
   - Klik **Create Database Cluster**

   Tunggu hingga status menjadi **✅ Active** (~3–5 menit).

   Di halaman database, klik tab **Connection Details**. Catat:
   - **Host**: `db-mysql-xxx.db.ondigitalocean.com`
   - **Port**: `25060`
   - **Database**: `defaultdb`
   - **Username**: `doadmin`
   - **Password**: (tersedia di Connection Details)
   - **CA Certificate**: download file `ca-certificate.crt`

   <Aside type="tip">
   Klik **Add trusted sources** → tambahkan App Platform kamu nantinya agar database hanya bisa diakses dari app kamu sendiri.
   </Aside>

2. **Buat database khusus**

   Di tab **Databases** (dalam MySQL cluster):
   - Klik **Add new database**
   - Nama: `sekolix_cabt`
   - Klik **Save**

   (Opsional: buat user terpisah dengan akses hanya ke `sekolix_cabt` — lebih aman dari menggunakan `doadmin`)

3. **Generate APP_KEY**

   ```bash
   php artisan key:generate --show
   ```

   Copy outputnya.

4. **Buat App Platform App**

   Di DigitalOcean Dashboard:
   - Klik **Apps** → **Create App**
   - **Source**: GitHub → pilih repository `sekolix-cabt`
   - **Branch**: `main`
   - **Autodeploy**: centang ✅ (deploy otomatis saat push)

5. **Konfigurasi Source**

   Di halaman konfigurasi:
   - **Type**: Web Service
   - **Run Command**: `bash start.sh`
   - **Build Command**: `composer install --no-dev --optimize-autoloader && npm ci && npm run build`
   - **HTTP Port**: `80`
   - **Health Check Path**: `/login`

   <Aside type="note">
   Jika App Platform tidak mendeteksi PHP, tambahkan `Dockerfile` ke repository (lihat panduan [Docker Compose](./docker)).
   </Aside>

6. **Set Environment Variables**

   Di bagian **Environment Variables** klik **Edit**:

   ```env
   APP_NAME=Sekolix CABT
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://your-app.ondigitalocean.app

   APP_KEY=base64:HASIL_KEY_GENERATE_KAMU

   DB_CONNECTION=mysql
   DB_HOST=db-mysql-xxx.db.ondigitalocean.com
   DB_PORT=25060
   DB_DATABASE=sekolix_cabt
   DB_USERNAME=doadmin
   DB_PASSWORD=PASSWORD_DARI_DO_DATABASE

   MYSQL_ATTR_SSL_CA=/etc/ssl/certs/ca-certificates.crt

   SESSION_DRIVER=database
   SESSION_LIFETIME=120
   CACHE_STORE=database
   QUEUE_CONNECTION=sync
   FILESYSTEM_DISK=local
   LOG_CHANNEL=stderr
   LOG_LEVEL=error
   ```

   Centang **Encrypt** untuk `APP_KEY` dan `DB_PASSWORD`.

7. **Pilih Plan**

   - **Basic KV** ($5/bln): 512 MB RAM, 1 vCPU — cukup untuk demo
   - **Basic** ($12/bln): 1 GB RAM, 1 vCPU — rekomendasi untuk ujian aktif

8. **Deploy**

   Klik **Create Resources** dan tunggu deployment selesai (~5–10 menit).

   Pantau progress di tab **Runtime Logs**.

9. **Update APP_URL**

   Setelah deploy, DigitalOcean memberikan URL seperti `https://sekolix-cabt-xxxxx.ondigitalocean.app`.

   Pergi ke **Settings** → **App Variables** → update `APP_URL`.

   Redeploy otomatis akan berjalan.

10. **Jalankan migrasi**

    Di tab **Console** (Runtime):

    ```bash
    php artisan migrate:fresh --seed --force
    ```

11. **Buat akun Super Admin**

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

12. **Hubungkan database ke app**

    Di halaman MySQL cluster → **Trusted Sources** → tambahkan app kamu.

    Ini memastikan hanya app kamu yang bisa mengakses database.

</Steps>

---

## Menggunakan App Spec (Infrastructure as Code)

Kamu bisa mendefinisikan seluruh konfigurasi app dalam file `.do/app.yaml`:

```yaml
name: sekolix-cabt
region: sgp
services:
  - name: web
    github:
      repo: rezacodev/sekolix-cabt
      branch: main
      deploy_on_push: true
    run_command: bash start.sh
    build_command: >-
      composer install --no-dev --optimize-autoloader &&
      npm ci && npm run build
    http_port: 80
    health_check:
      http_path: /login
    instance_size_slug: basic-xxs
    instance_count: 1
    envs:
      - key: APP_NAME
        value: "Sekolix CABT"
      - key: APP_ENV
        value: production
      - key: APP_DEBUG
        value: "false"
      - key: APP_KEY
        value: "base64:xxx="
        type: SECRET
      - key: DB_CONNECTION
        value: mysql
      - key: LOG_CHANNEL
        value: stderr
```

Deploy dengan doctl:
```bash
doctl apps create --spec .do/app.yaml
```

---

## Environment Variables Lengkap

| Variabel | Contoh Nilai | Keterangan |
|---|---|---|
| `APP_KEY` | `base64:xxx=` | Key enkripsi — **encrypt** di dashboard |
| `DB_HOST` | `db-mysql-xxx.db.ondigitalocean.com` | Host database DO |
| `DB_PORT` | `25060` | Port MySQL DO (bukan 3306) |
| `MYSQL_ATTR_SSL_CA` | `/etc/ssl/certs/ca-certificates.crt` | TLS cert untuk koneksi aman |
| `DB_PASSWORD` | `xxxx` | **encrypt** di dashboard |

---

## Troubleshooting

### Cannot connect to database

1. Pastikan **Trusted Sources** di database sudah ditambah (langkah 12)
2. Port MySQL DO adalah **25060**, bukan 3306 — pastikan `DB_PORT=25060`
3. Aktifkan `MYSQL_ATTR_SSL_CA` — koneksi ke DO MySQL memerlukan SSL

### Build gagal: PHP not detected

Tambahkan `Dockerfile` ke repository. DigitalOcean App Platform mendukung Docker secara native.

### App timeout saat startup

Tambahkan health check interval yang lebih panjang di App Spec:
```yaml
health_check:
  http_path: /login
  initial_delay_seconds: 30
  period_seconds: 30
```

---

## Langkah Selanjutnya

- [Pengaturan Umum](/sekolix-cabt-site/docs/panduan-super-admin/pengaturan-umum)
- [Manajemen User](/sekolix-cabt-site/docs/panduan-admin/manajemen-user)
- [Troubleshooting](/sekolix-cabt-site/docs/referensi/troubleshooting)
