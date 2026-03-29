---
title: Deploy ke Heroku
description: Deploy Sekolix CABT ke Heroku menggunakan Procfile dan buildpack PHP — platform klasik dengan ekosistem add-on lengkap.
sidebar:
  order: 6
---

import { Steps, Aside } from '@astrojs/starlight/components';

**Heroku** adalah platform cloud pionir untuk aplikasi web. Meski tidak lagi memiliki free tier, harganya tetap terjangkau dan ekosistem add-on-nya sangat lengkap.

:::note[TL;DR]
| | |
|---|---|
| **Cocok untuk** | Tim yang sudah familiar Heroku, ekosistem add-on |
| **Harga** | Eco Dyno $5/bln + MySQL add-on ~$0–5/bln |
| **Database** | JawsDB MySQL (add-on, free tier 5 MB) |
| **Waktu setup** | ~15–20 menit |
| **File persisten** | Ephemeral (gunakan S3/Cloudflare R2 untuk file upload) |
:::

<Aside type="caution" title="Tidak Ada Free Tier">
Heroku menghapus free tier pada **November 2022**. Dyno terkecil (Eco) saat ini $5/bln. Jika butuh gratis, gunakan [Railway](./railway) atau [Render](./render).
</Aside>

---

## Prasyarat

- ✅ Repository `sekolix-cabt` sudah di-push ke GitHub
- ✅ Akun [Heroku](https://heroku.com) (perlu kartu kredit)
- ✅ [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) terinstal
- ✅ Git terinstal
- ✅ PHP tersedia di mesin lokal (untuk generate `APP_KEY`)

---

## Pastikan File Konfigurasi Ada

Repository harus memiliki `Procfile` di root:

```
web: vendor/bin/heroku-php-apache2 public/
```

Dan `composer.json` yang berisi PHP version requirement:

```json
{
    "require": {
        "php": "^8.2"
    }
}
```

---

## Langkah-langkah

<Steps>

1. **Login ke Heroku**

   ```bash
   heroku login
   ```

   Browser akan terbuka untuk konfirmasi login.

2. **Buat Heroku App**

   Di folder project:

   ```bash
   heroku create sekolix-cabt-namasekolah
   ```

   Heroku akan memberikan URL seperti `https://sekolix-cabt-namasekolah.herokuapp.com`.

3. **Tambahkan JawsDB MySQL Add-on**

   ```bash
   heroku addons:create jawsdb:kitefin --app sekolix-cabt-namasekolah
   ```

   `kitefin` adalah plan gratis (5 MB — cukup untuk development/demo).

   Untuk production, gunakan `leopard` ($10/bln, 1 GB):

   ```bash
   heroku addons:create jawsdb:leopard --app sekolix-cabt-namasekolah
   ```

   Setelah add-on dibuat, cek connection string:

   ```bash
   heroku config:get JAWSDB_URL --app sekolix-cabt-namasekolah
   ```

   Output berupa URL MySQL: `mysql://username:password@host:3306/database`

   <Aside type="tip">
   Catat masing-masing komponen dari URL tersebut: `username`, `password`, `host`, `database`.
   </Aside>

4. **Generate APP_KEY**

   ```bash
   php artisan key:generate --show
   ```

   Copy outputnya.

5. **Set Environment Variables**

   ```bash
   heroku config:set \
     APP_NAME="Sekolix CABT" \
     APP_ENV=production \
     APP_DEBUG=false \
     APP_URL=https://sekolix-cabt-namasekolah.herokuapp.com \
     APP_KEY="base64:HASIL_KEY_GENERATE_KAMU" \
     DB_CONNECTION=mysql \
     DB_HOST=HOST_DARI_JAWSDB_URL \
     DB_PORT=3306 \
     DB_DATABASE=DATABASE_DARI_JAWSDB_URL \
     DB_USERNAME=USERNAME_DARI_JAWSDB_URL \
     DB_PASSWORD=PASSWORD_DARI_JAWSDB_URL \
     SESSION_DRIVER=database \
     SESSION_LIFETIME=120 \
     CACHE_STORE=database \
     QUEUE_CONNECTION=sync \
     FILESYSTEM_DISK=local \
     LOG_CHANNEL=stderr \
     LOG_LEVEL=error \
     --app sekolix-cabt-namasekolah
   ```

6. **Deploy via Git**

   Tambahkan Heroku remote dan push:

   ```bash
   heroku git:remote -a sekolix-cabt-namasekolah
   git push heroku main
   ```

   Heroku otomatis mendeteksi PHP buildpack dan menjalankan `composer install`.

   <Aside type="note">
   Jika branch utama kamu bukan `main` tapi `master`: `git push heroku master`.
   </Aside>

7. **Jalankan migrasi**

   ```bash
   heroku run php artisan migrate:fresh --seed --force --app sekolix-cabt-namasekolah
   ```

8. **Buat akun Super Admin**

   ```bash
   heroku run php artisan tinker --app sekolix-cabt-namasekolah
   ```

   Di dalam tinker:

   ```php
   App\Models\User::create([
       'name'     => 'Super Admin',
       'username' => 'superadmin',
       'email'    => 'admin@sekolahmu.id',
       'password' => bcrypt('PasswordKuatKamu123!'),
       'level'    => 4,
   ]);
   exit;
   ```

9. **Akses Aplikasi**

   | Halaman | URL |
   |---|---|
   | Login Peserta | `https://sekolix-cabt-namasekolah.herokuapp.com/login` |
   | Panel Admin/Guru | `https://sekolix-cabt-namasekolah.herokuapp.com/cabt` |

</Steps>

---

## Deploy Otomatis via GitHub

Kamu bisa menghubungkan Heroku langsung ke GitHub untuk auto-deploy:

1. Di [Heroku Dashboard](https://dashboard.heroku.com), buka app kamu  
2. Tab **Deploy** → **Deployment method** → pilih **GitHub**
3. Connect repository `sekolix-cabt`
4. Aktifkan **Automatic deploys** dari branch `main`

Setiap `git push` ke `main` akan otomatis trigger deploy.

---

## Menggunakan Domain Kustom

```bash
# Tambah domain
heroku domains:add ujian.sekolahmu.id --app sekolix-cabt-namasekolah

# Dapatkan DNS target
heroku domains --app sekolix-cabt-namasekolah
```

Buat CNAME record di DNS provider kamu:
```
ujian.sekolahmu.id  CNAME  www.sekolix-cabt-namasekolah.herokudns.com
```

SSL otomatis dikonfigurasi Heroku (Automated Certificate Management).

---

## Catatan Penting

### File Upload

<Aside type="caution" title="Storage Bersifat Ephemeral">
Seperti Railway, Heroku dynos tidak menyimpan file saat restart. File upload peserta akan hilang.

**Solusi**: Gunakan [Cloudflare R2](https://developers.cloudflare.com/r2/) (gratis 10 GB/bln) atau Amazon S3, lalu set `FILESYSTEM_DISK=s3` beserta S3 credentials di Config Vars.
</Aside>

### Dyno Sleep (Eco Plan)

Eco dynos `$5/bln` tidur setelah 30 menit tidak aktif. Request pertama memerlukan ~10–20 detik.

Gunakan **Basic Dyno** ($7/bln) untuk dyno yang selalu aktif.

---

## Troubleshooting

### Push gagal: no PHP detected

Pastikan `composer.json` ada di root project dan `require.php` berisi versi PHP.

Tambahkan PHP buildpack secara eksplisit:
```bash
heroku buildpacks:set heroku/php --app sekolix-cabt-namasekolah
```

### Error H10 (App Crashed)

Cek log:
```bash
heroku logs --tail --app sekolix-cabt-namasekolah
```

Penyebab umum: `APP_KEY` kosong, koneksi database gagal.

### Migration gagal

Test koneksi database:
```bash
heroku run php artisan tinker --app sekolix-cabt-namasekolah
# Di dalam tinker:
DB::connection()->getPdo();
```

### Error 500 setelah deploy

Set `APP_DEBUG=true` sementara, cek error di `heroku logs`, lalu kembalikan ke `false`.

---

## Perintah Heroku Berguna

```bash
# Lihat log real-time
heroku logs --tail --app sekolix-cabt-namasekolah

# Jalankan perintah artisan
heroku run php artisan tinker --app sekolix-cabt-namasekolah

# Lihat semua config vars
heroku config --app sekolix-cabt-namasekolah

# Scale dyno
heroku scale web=1 --app sekolix-cabt-namasekolah

# Restart dyno
heroku restart --app sekolix-cabt-namasekolah
```

---

## Langkah Selanjutnya

- [Pengaturan Umum](/sekolix-cabt-site/docs/panduan-super-admin/pengaturan-umum)
- [Manajemen User](/sekolix-cabt-site/docs/panduan-admin/manajemen-user)
- [Troubleshooting](/sekolix-cabt-site/docs/referensi/troubleshooting)
