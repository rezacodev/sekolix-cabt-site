---
title: Deploy ke VPS Ubuntu Manual
description: Panduan lengkap deploy Sekolix CABT ke VPS Ubuntu 22.04 dengan Nginx, PHP-FPM 8.2, MySQL, dan SSL Certbot.
sidebar:
  order: 7
  badge:
    text: Lanjutan
    variant: danger
---

import { Steps, Aside } from '@astrojs/starlight/components';

Deploy ke **VPS Ubuntu** memberikan kontrol penuh atas server — cocok untuk multi-aplikasi, penghematan biaya jangka panjang, dan persyaratan data residency.

:::note[TL;DR]
| | |
|---|---|
| **Cocok untuk** | IT sekolah berpengalaman, multi-aplikasi, kontrol penuh |
| **Harga** | $4–10/bln (Hetzner, DigitalOcean Droplet, Vultr) |
| **Database** | MySQL self-hosted di server yang sama |
| **Waktu setup** | ~45–90 menit |
| **File persisten** | ✅ Penuh (disk VPS) |
:::

<Aside type="caution" title="Untuk Pengguna Tingkat Lanjut">
Panduan ini mengasumsikan kamu familiar dengan Linux command line, SSH, dan manajemen server dasar. Jika kamu pemula, gunakan [Railway](./railway) untuk memulai lebih cepat.
</Aside>

---

## Prasyarat

- ✅ VPS dengan Ubuntu 22.04 LTS (min. 1 vCPU, 1 GB RAM)
- ✅ Akses SSH ke VPS sebagai root atau user dengan sudo
- ✅ Domain yang sudah diarahkan ke IP VPS (untuk SSL)
- ✅ Repository `sekolix-cabt` di GitHub

---

## Spesifikasi Server yang Direkomendasikan

| Kebutuhan | Minimal | Rekomendasi |
|---|---|---|
| vCPU | 1 | 2 |
| RAM | 1 GB | 2 GB |
| Storage | 20 GB SSD | 40 GB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 22.04 LTS |
| PHP | 8.2 | 8.2 |

---

## Langkah-langkah

<Steps>

1. **Update sistem dan install dependensi dasar**

   SSH ke VPS sebagai root:

   ```bash
   ssh root@IP_VPS_KAMU
   ```

   Update sistem:

   ```bash
   apt update && apt upgrade -y
   apt install -y git curl wget unzip software-properties-common ufw
   ```

2. **Install PHP 8.2 dan ekstensi**

   ```bash
   add-apt-repository ppa:ondrej/php -y
   apt update
   apt install -y \
     php8.2 \
     php8.2-fpm \
     php8.2-mysql \
     php8.2-mbstring \
     php8.2-xml \
     php8.2-bcmath \
     php8.2-curl \
     php8.2-zip \
     php8.2-gd \
     php8.2-intl \
     php8.2-opcache \
     php8.2-tokenizer
   ```

   Verifikasi:

   ```bash
   php -v
   # PHP 8.2.x (cli)
   ```

3. **Install Nginx**

   ```bash
   apt install -y nginx
   systemctl enable nginx
   systemctl start nginx
   ```

4. **Install MySQL 8.0**

   ```bash
   apt install -y mysql-server
   systemctl enable mysql
   systemctl start mysql
   ```

   Jalankan wizard keamanan MySQL:

   ```bash
   mysql_secure_installation
   ```

   Jawab pertanyaan:
   - Validate password: `Y`
   - Password strength: `2` (Strong)
   - Masukkan root password yang kuat
   - Remove anonymous users: `Y`
   - Disallow root login remotely: `Y`
   - Remove test database: `Y`
   - Reload privilege tables: `Y`

5. **Buat database dan user MySQL**

   Login ke MySQL:

   ```bash
   mysql -u root -p
   ```

   Jalankan perintah SQL berikut:

   ```sql
   CREATE DATABASE sekolix_cabt CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER 'sekolix'@'localhost' IDENTIFIED BY 'PasswordDatabaseKuat123!';
   GRANT ALL PRIVILEGES ON sekolix_cabt.* TO 'sekolix'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

   <Aside type="caution">
   Ganti `PasswordDatabaseKuat123!` dengan password yang kuat dan unik. Catat baik-baik.
   </Aside>

6. **Install Composer**

   ```bash
   curl -sS https://getcomposer.org/installer | php
   mv composer.phar /usr/local/bin/composer
   chmod +x /usr/local/bin/composer
   composer --version
   ```

7. **Install Node.js 20**

   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs
   node -v && npm -v
   ```

8. **Clone repository**

   Buat direktori web:

   ```bash
   mkdir -p /var/www
   cd /var/www
   git clone https://github.com/USERNAME/sekolix-cabt.git
   cd sekolix-cabt
   ```

   Ganti `USERNAME` dengan username GitHub kamu.

9. **Konfigurasi .env**

   ```bash
   cp .env.example .env
   ```

   Edit file `.env`:

   ```bash
   nano .env
   ```

   Isi dengan nilai berikut:

   ```env
   APP_NAME=Sekolix CABT
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://ujian.sekolahmu.id

   APP_KEY=  # akan di-generate di langkah berikutnya

   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=sekolix_cabt
   DB_USERNAME=sekolix
   DB_PASSWORD=PasswordDatabaseKuat123!

   SESSION_DRIVER=database
   SESSION_LIFETIME=120
   CACHE_STORE=database
   QUEUE_CONNECTION=sync
   FILESYSTEM_DISK=local
   LOG_CHANNEL=daily
   LOG_LEVEL=error
   ```

   Simpan dengan `Ctrl+O`, keluar dengan `Ctrl+X`.

10. **Install dependencies dan build assets**

    ```bash
    composer install --no-dev --optimize-autoloader
    npm ci && npm run build
    ```

11. **Generate APP_KEY dan setup Laravel**

    ```bash
    php artisan key:generate
    php artisan migrate --force
    php artisan db:seed --force
    php artisan storage:link
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    ```

12. **Set permissions**

    ```bash
    chown -R www-data:www-data /var/www/sekolix-cabt
    chmod -R 755 /var/www/sekolix-cabt
    chmod -R 775 /var/www/sekolix-cabt/storage
    chmod -R 775 /var/www/sekolix-cabt/bootstrap/cache
    ```

13. **Konfigurasi Nginx**

    Buat virtual host:

    ```bash
    nano /etc/nginx/sites-available/sekolix-cabt
    ```

    Paste konfigurasi berikut:

    ```nginx
    server {
        listen 80;
        listen [::]:80;
        server_name ujian.sekolahmu.id;
        root /var/www/sekolix-cabt/public;
        index index.php index.html;

        client_max_body_size 50M;

        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-Content-Type-Options "nosniff";

        charset utf-8;

        location / {
            try_files $uri $uri/ /index.php?$query_string;
        }

        location = /favicon.ico { access_log off; log_not_found off; }
        location = /robots.txt  { access_log off; log_not_found off; }

        error_page 404 /index.php;

        location ~ \.php$ {
            fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
            fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
            include fastcgi_params;
            fastcgi_hide_header X-Powered-By;
        }

        location ~ /\.(?!well-known).* {
            deny all;
        }

        gzip on;
        gzip_types text/plain text/css application/json application/javascript;
        gzip_min_length 1000;
    }
    ```

    Ganti `ujian.sekolahmu.id` dengan domain kamu.

    Aktifkan site dan test konfigurasi:

    ```bash
    ln -s /etc/nginx/sites-available/sekolix-cabt /etc/nginx/sites-enabled/
    nginx -t
    systemctl reload nginx
    ```

14. **Install SSL dengan Certbot**

    ```bash
    apt install -y certbot python3-certbot-nginx
    certbot --nginx -d ujian.sekolahmu.id
    ```

    Ikuti petunjuk: masukkan email, setujui ToS, pilih redirect HTTP ke HTTPS.

    Certbot otomatis memperbarui sertifikat setiap 90 hari.

15. **Konfigurasi Firewall**

    ```bash
    ufw allow OpenSSH
    ufw allow 'Nginx Full'
    ufw --force enable
    ufw status
    ```

16. **Buat akun Super Admin**

    ```bash
    cd /var/www/sekolix-cabt
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

17. **Akses Aplikasi**

    Buka browser dan akses `https://ujian.sekolahmu.id`:

    | Halaman | URL |
    |---|---|
    | Login Peserta | `https://ujian.sekolahmu.id/login` |
    | Panel Admin/Guru | `https://ujian.sekolahmu.id/cabt` |

</Steps>

---

## Setup Auto-Deploy dari GitHub (Opsional)

Agar server otomatis pull update saat ada push ke GitHub, buat script deploy:

```bash
nano /var/www/sekolix-cabt/deploy.sh
```

```bash
#!/bin/bash
set -e

cd /var/www/sekolix-cabt

git pull origin main
composer install --no-dev --optimize-autoloader
npm ci && npm run build
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
chown -R www-data:www-data storage bootstrap/cache

echo "Deploy selesai!"
```

```bash
chmod +x /var/www/sekolix-cabt/deploy.sh
```

Jalankan manual saat update: `bash /var/www/sekolix-cabt/deploy.sh`

---

## Monitoring dan Maintenance

### Cek log aplikasi

```bash
tail -f /var/www/sekolix-cabt/storage/logs/laravel.log
```

### Restart PHP-FPM setelah update PHP

```bash
systemctl restart php8.2-fpm
```

### Backup database otomatis

```bash
# Tambahkan ke crontab: crontab -e
0 2 * * * mysqldump -u sekolix -p'PasswordDatabaseKuat123!' sekolix_cabt > /backup/sekolix_$(date +\%Y\%m\%d).sql
```

---

## Troubleshooting

### 502 Bad Gateway

```bash
systemctl status php8.2-fpm
systemctl restart php8.2-fpm
```

Cek juga socket path di Nginx config: `/var/run/php/php8.2-fpm.sock`

### Permission denied di storage

```bash
chown -R www-data:www-data /var/www/sekolix-cabt/storage
chmod -R 775 /var/www/sekolix-cabt/storage
```

### Certbot gagal: domain tidak resolve

Pastikan DNS A record sudah diarahkan ke IP VPS dan sudah propagate (bisa dicek di [dnschecker.org](https://dnschecker.org)):

```bash
dig ujian.sekolahmu.id A
```

### Error 500 setelah deploy

```bash
# Cek log
tail -50 /var/www/sekolix-cabt/storage/logs/laravel.log

# Clear semua cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Rebuild cache
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

---

## Langkah Selanjutnya

- [Pengaturan Umum](/sekolix-cabt-site/docs/panduan-super-admin/pengaturan-umum)
- [Manajemen User](/sekolix-cabt-site/docs/panduan-admin/manajemen-user)
- [Troubleshooting](/sekolix-cabt-site/docs/referensi/troubleshooting)
