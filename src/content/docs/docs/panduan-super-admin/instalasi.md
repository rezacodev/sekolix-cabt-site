---
title: Instalasi & Konfigurasi Server
description: Panduan lengkap instalasi Sekolix CABT di server production.
sidebar:
  order: 1
---

import { Steps, Aside } from '@astrojs/starlight/components';

## Persyaratan Server

| Komponen | Versi Minimum |
|---|---|
| PHP | 8.2 dengan ekstensi: pdo_mysql, mbstring, openssl, gd, zip |
| Composer | 2.x |
| Node.js | 18.x |
| MySQL | 8.0 / MariaDB 10.6 |
| Web Server | Nginx (direkomendasikan) / Apache |

## Instalasi

<Steps>

1. **Clone & install dependensi**

   ```bash
   git clone https://github.com/rezacodev/sekolix-cabt.git /var/www/sekolix-cabt
   cd /var/www/sekolix-cabt
   composer install --no-dev --optimize-autoloader
   npm install && npm run build
   ```

2. **Konfigurasi environment**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

   Edit `.env`:
   ```ini
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://cabt.sekolah.sch.id

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_DATABASE=sekolix_cabt
   DB_USERNAME=cabt_user
   DB_PASSWORD=password_kuat_di_sini
   ```

3. **Migrasi & storage**

   ```bash
   php artisan migrate --force
   php artisan storage:link
   chmod -R 775 storage bootstrap/cache
   chown -R www-data:www-data storage bootstrap/cache
   ```

4. **Optimasi production**

   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan event:cache
   ```

5. **Konfigurasi Nginx**

   ```nginx
   server {
       listen 80;
       server_name cabt.sekolah.sch.id;
       root /var/www/sekolix-cabt/public;

       add_header X-Frame-Options "SAMEORIGIN";
       add_header X-Content-Type-Options "nosniff";

       index index.php;

       location / {
           try_files $uri $uri/ /index.php?$query_string;
       }

       location ~ \.php$ {
           fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
           fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
           include fastcgi_params;
       }

       location ~ /\.(?!well-known).* {
           deny all;
       }
   }
   ```

</Steps>

## General Setting

Setelah instalasi, login sebagai Super Admin (level 4) dan navigasi ke **Pengaturan** di panel `/cabt`.

### Parameter Penting

| Setting | Default | Keterangan |
|---|---|---|
| `login_max_attempts` | 5 | Max percobaan login sebelum terkunci |
| `login_lockout_minutes` | 15 | Durasi lockout (menit) |
| `max_tab_switch` | 3 | Max perpindahan tab sebelum aksi |
| `tab_switch_action` | `log` | `log` / `lock` / `submit` |
| `prevent_copy_paste` | true | Nonaktifkan copy-paste di halaman ujian |
| `require_fullscreen` | false | Wajibkan fullscreen saat ujian |
| `max_upload_mb` | 5 | Ukuran max upload file URAIAN |
| `allow_multi_login` | false | Izinkan login dari beberapa device |
| `ip_whitelist` | (kosong) | Daftar IP yang diizinkan, pisah koma |
| `livescore_public` | false | Livescore bisa diakses tanpa login |

<Aside type="caution">
Jangan aktifkan `APP_DEBUG=true` di production. Ini dapat mengekspos informasi sensitif server.
</Aside>
