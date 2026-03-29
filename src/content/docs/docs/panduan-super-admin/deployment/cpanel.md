---
title: Deploy ke Shared Hosting cPanel
description: Deploy Sekolix CABT ke shared hosting Indonesia dengan cPanel — menggunakan SSH, Composer, dan konfigurasi manual public_html.
sidebar:
  order: 8
  badge:
    text: Lanjutan
    variant: danger
---

import { Steps, Aside } from '@astrojs/starlight/components';

**Shared hosting cPanel** adalah pilihan hosting lokal Indonesia yang terjangkau. Deploy Laravel di cPanel memerlukan beberapa langkah manual, tetapi memungkinkan kamu memanfaatkan hosting yang sudah ada.

:::note[TL;DR]
| | |
|---|---|
| **Cocok untuk** | Yang sudah punya hosting cPanel, hemat biaya |
| **Harga** | Rp 50.000–150.000/bln (Niagahoster, IDCloudHost, dll.) |
| **Database** | MySQL shared |
| **Waktu setup** | ~30–60 menit |
| **File persisten** | ✅ Disk hosting |
:::

<Aside type="caution" title="Persyaratan Wajib">
Sekolix CABT membutuhkan **PHP 8.2** dan **akses SSH** ke hosting. Pastikan paket hosting kamu memenuhi syarat ini sebelum melanjutkan. Tidak semua hosting shared mendukung kedua persyaratan ini.

Hosting yang diketahui mendukung:
- **Niagahoster** — PHP 8.2 ✅, SSH ✅
- **IDCloudHost** — PHP 8.2 ✅, SSH ✅
- **Rumahweb** — PHP 8.2 ✅, SSH ✅ (paket Hybrid)
- **DomaiNesia** — PHP 8.2 ✅, SSH ✅

Pastikan tanya support hosting apakah SSH tersedia di paket kamu.
</Aside>

---

## Prasyarat

- ✅ Akun hosting cPanel dengan PHP 8.2
- ✅ Akses SSH ke hosting
- ✅ Database MySQL (buat via cPanel)
- ✅ Domain yang sudah diarahkan ke hosting
- ✅ Git tersedia di SSH hosting (biasanya sudah ada)
- ✅ Composer tersedia di SSH hosting (atau bisa install manual)

---

## Memahami Struktur Direktori

Di cPanel, `public_html` adalah folder yang bisa diakses publik (seperti `DocumentRoot` Nginx). Laravel memiliki folder `public/` sebagai web root-nya. Triknya adalah **memisahkan file Laravel dari `public_html`**:

```
/home/username/
├── public_html/          ← diakses publik (domain root)
│   ├── index.php         ← akan kita buat (mengarah ke ../sekolix-cabt/public)
│   ├── .htaccess         ← akan kita buat
│   └── storage -> ...    ← symlink ke storage/app/public
└── sekolix-cabt/         ← file Laravel (tidak bisa diakses publik)
    ├── app/
    ├── bootstrap/
    ├── public/
    ├── storage/
    └── ...
```

---

## Langkah-langkah

<Steps>

1. **Buat database MySQL di cPanel**

   Login ke cPanel → **MySQL Databases**:
   - Buat database baru: `username_sekolix` (prefix username otomatis ditambahkan)
   - Buat user baru: `username_sklxuser` dengan password kuat
   - Tambahkan user ke database dengan privilege **ALL PRIVILEGES**
   - Catat: nama database lengkap, username lengkap, dan password

   <Aside type="tip">
   Nama database dan user di cPanel selalu diawali dengan username cPanel kamu. Misalnya username `myschool`, maka database menjadi `myschool_sekolix`.
   </Aside>

2. **Aktifkan PHP 8.2 di cPanel**

   Di cPanel → **MultiPHP Manager** (atau **Select PHP Version**):
   - Pilih domain/subdomain kamu
   - Set PHP version ke **PHP 8.2**
   - Klik **Apply**

   Di **PHP Extensions**, pastikan ekstensi berikut aktif:
   - `pdo_mysql`, `mbstring`, `xml`, `bcmath`, `curl`, `zip`, `gd`, `intl`, `opcache`, `tokenizer`

3. **Aktifkan akses SSH**

   Di cPanel → **SSH Access**:
   - Klik **Manage SSH Keys**
   - Generate key baru atau upload public key dari mesin lokal
   - **Authorize** key tersebut

   Atau hubungi support hosting untuk mengaktifkan SSH.

   Login via SSH:
   ```bash
   ssh username@domain-atau-ip.com -p 22
   ```

4. **Clone repository ke folder di luar public_html**

   Di terminal SSH:

   ```bash
   cd ~
   git clone https://github.com/USERNAME/sekolix-cabt.git
   cd sekolix-cabt
   ```

5. **Install dependencies dengan Composer**

   Cek apakah Composer tersedia:

   ```bash
   composer --version
   ```

   Jika tidak ada, install Composer secara lokal:

   ```bash
   curl -sS https://getcomposer.org/installer | php
   # Gunakan: php composer.phar [perintah]
   ```

   Install dependencies:

   ```bash
   composer install --no-dev --optimize-autoloader
   ```

   <Aside type="note">
   Beberapa hosting membatasi waktu eksekusi SSH. Jika timeout, gunakan `nohup composer install --no-dev -o &` agar berjalan di background.
   </Aside>

6. **Build assets**

   Cek apakah Node.js tersedia:

   ```bash
   node -v
   ```

   Jika Node.js tidak tersedia di SSH hosting, **build assets di mesin lokal** terlebih dahulu, lalu upload folder `public/build/` via File Manager atau FTP:

   ```bash
   # Di mesin LOKAL:
   npm ci && npm run build
   # Upload folder public/build/ ke ~/sekolix-cabt/public/build/ di hosting
   ```

7. **Konfigurasi .env**

   ```bash
   cp .env.example .env
   nano .env
   ```

   Isi dengan nilai berikut:

   ```env
   APP_NAME=Sekolix CABT
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://subdomain.sekolahmu.id

   APP_KEY=  # akan di-generate di langkah berikutnya

   DB_CONNECTION=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_DATABASE=username_sekolix
   DB_USERNAME=username_sklxuser
   DB_PASSWORD=PasswordDatabase123!

   SESSION_DRIVER=database
   SESSION_LIFETIME=120
   CACHE_STORE=database
   QUEUE_CONNECTION=sync
   FILESYSTEM_DISK=local
   LOG_CHANNEL=daily
   LOG_LEVEL=error
   ```

8. **Generate APP_KEY dan setup Laravel**

   ```bash
   php artisan key:generate
   php artisan migrate --force
   php artisan db:seed --force
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

9. **Konfigurasi public_html**

   Buat `index.php` di `public_html` yang mengarahkan ke `public/` Laravel:

   ```bash
   # Backup public_html jika ada isinya
   mv ~/public_html ~/public_html_backup

   # Buat public_html baru
   mkdir ~/public_html
   ```

   Buat `~/public_html/index.php`:

   ```php
   <?php

   $laravelPublic = __DIR__ . '/../sekolix-cabt/public';

   // Ubah path sesuai struktur hosting kamu
   $_SERVER['DOCUMENT_ROOT'] = $laravelPublic;

   require $laravelPublic . '/index.php';
   ```

   Buat `~/public_html/.htaccess`:

   ```apache
   <IfModule mod_rewrite.c>
       RewriteEngine On

       # Redirect ke HTTPS
       RewriteCond %{HTTPS} off
       RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

       # Forward semua request ke index.php
       RewriteCond %{REQUEST_FILENAME} !-f
       RewriteCond %{REQUEST_FILENAME} !-d
       RewriteRule ^ index.php [L]
   </IfModule>
   ```

   <Aside type="tip">
   Alternatif yang lebih bersih: **symlink** dari `public_html` ke `sekolix-cabt/public`:
   ```bash
   rmdir ~/public_html
   ln -s ~/sekolix-cabt/public ~/public_html
   ```
   Ini hanya bekerja jika hosting mengizinkan symlink (cek dengan support hosting).
   </Aside>

10. **Buat storage symlink**

    ```bash
    cd ~/sekolix-cabt
    php artisan storage:link
    ```

    Jika gagal karena path berbeda, buat symlink manual:

    ```bash
    ln -s ~/sekolix-cabt/storage/app/public ~/public_html/storage
    ```

11. **Set permissions**

    ```bash
    chmod -R 755 ~/sekolix-cabt
    chmod -R 775 ~/sekolix-cabt/storage
    chmod -R 775 ~/sekolix-cabt/bootstrap/cache
    ```

12. **Buat akun Super Admin**

    ```bash
    cd ~/sekolix-cabt
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

13. **Akses Aplikasi**

    Buka browser dan akses domain kamu:

    | Halaman | URL |
    |---|---|
    | Login Peserta | `https://subdomain.sekolahmu.id/login` |
    | Panel Admin/Guru | `https://subdomain.sekolahmu.id/cabt` |

</Steps>

---

## Update Aplikasi

Saat ada update, SSH ke hosting dan jalankan:

```bash
cd ~/sekolix-cabt
git pull origin main
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

---

## Troubleshooting

### Error 500 / Blank Page

1. Set sementara `APP_DEBUG=true` di `.env`, refresh, cek pesan error
2. Cek log: `tail -50 ~/sekolix-cabt/storage/logs/laravel.log`
3. Set kembali `APP_DEBUG=false` setelah menemukan masalah

### Class not found / autoload error

```bash
cd ~/sekolix-cabt
composer dump-autoload --optimize
```

### Storage link gagal

Buat symlink manual:
```bash
ln -s ~/sekolix-cabt/storage/app/public ~/public_html/storage
```

### PHP version tidak berubah

Setelah mengubah PHP version di cPanel, pastikan `php -v` di SSH sudah menunjukkan 8.2. Jika tidak, set via `.htaccess`:
```apache
AddType application/x-httpd-php82 .php
```

Atau hubungi support hosting.

### Composer timeout

```bash
nohup composer install --no-dev --optimize-autoloader > composer_output.txt &
# Cek progress:
tail -f composer_output.txt
```

### upload_max_filesize terlalu kecil

Di cPanel → **MultiPHP INI Editor** → pilih domain → ubah:
```
upload_max_filesize = 50M
post_max_size = 50M
```

---

## Langkah Selanjutnya

- [Pengaturan Umum](/sekolix-cabt-site/docs/panduan-super-admin/pengaturan-umum)
- [Manajemen User](/sekolix-cabt-site/docs/panduan-admin/manajemen-user)
- [Troubleshooting](/sekolix-cabt-site/docs/referensi/troubleshooting)
