---
title: Deploy dengan Docker Compose
description: Jalankan Sekolix CABT secara terisolasi menggunakan Docker Compose — ideal untuk staging lokal, server VPS, atau tim developer.
sidebar:
  order: 3
---

import { Steps, Aside, FileTree } from '@astrojs/starlight/components';

**Docker Compose** memungkinkan kamu menjalankan seluruh stack Sekolix CABT (PHP, MySQL, Nginx) dalam container terisolasi — konsisten di semua mesin.

:::note[TL;DR]
| | |
|---|---|
| **Cocok untuk** | Developer, staging lokal, VPS self-hosted |
| **Harga** | Gratis (butuh server/VPS) · VPS ~$4–10/bln |
| **Database** | MySQL di container atau eksternal |
| **Waktu setup** | ~20–30 menit |
| **File persisten** | ✅ Volume Docker |
:::

---

## Prasyarat

- ✅ [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac) atau Docker Engine (Linux)
- ✅ Docker Compose v2+ (`docker compose version`)
- ✅ Repository `sekolix-cabt` sudah ter-clone di mesin kamu
- ✅ PHP tersedia di mesin lokal (untuk generate `APP_KEY`)

---

## Struktur File

Buat dua file di root project:

<FileTree>
- sekolix-cabt/
  - **Dockerfile** (build image PHP + Nginx)
  - **docker-compose.yml** (orchestration)
  - **docker/**
    - **nginx.conf** (konfigurasi Nginx)
  - .env
  - start.sh
  - ...
</FileTree>

---

## Langkah-langkah

<Steps>

1. **Buat Dockerfile**

   Buat file `Dockerfile` di root project:

   ```dockerfile
   FROM php:8.2-fpm-alpine

   # Install dependencies sistem
   RUN apk add --no-cache \
       nginx \
       nodejs \
       npm \
       git \
       curl \
       zip \
       unzip \
       libpng-dev \
       libjpeg-turbo-dev \
       libwebp-dev \
       freetype-dev \
       libzip-dev \
       oniguruma-dev

   # Install PHP extensions
   RUN docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install \
       pdo_mysql \
       mbstring \
       exif \
       pcntl \
       bcmath \
       gd \
       zip \
       opcache

   # Install Composer
   COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

   WORKDIR /app

   # Copy project files
   COPY . /app

   # Install PHP dependencies
   RUN composer install --no-dev --optimize-autoloader --no-interaction

   # Install Node dependencies dan build assets
   RUN npm ci && npm run build && rm -rf node_modules

   # Konfigurasi Nginx
   COPY docker/nginx.conf /etc/nginx/nginx.conf

   # Set permissions
   RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

   EXPOSE 80

   CMD ["sh", "start.sh"]
   ```

2. **Buat konfigurasi Nginx**

   Buat direktori dan file `docker/nginx.conf`:

   ```bash
   mkdir -p docker
   ```

   Isi `docker/nginx.conf`:

   ```nginx
   events {
       worker_connections 1024;
   }

   http {
       include       mime.types;
       default_type  application/octet-stream;
       sendfile      on;

       server {
           listen 80;
           root /app/public;
           index index.php;
           client_max_body_size 50M;

           location / {
               try_files $uri $uri/ /index.php?$query_string;
           }

           location ~ \.php$ {
               fastcgi_pass  127.0.0.1:9000;
               fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
               include       fastcgi_params;
           }

           location ~ /\.(?!well-known).* {
               deny all;
           }
       }
   }
   ```

3. **Buat docker-compose.yml**

   Di root project, buat `docker-compose.yml`:

   ```yaml
   services:
     app:
       build: .
       ports:
         - "8080:80"
       env_file:
         - .env
       environment:
         DB_HOST: db
         DB_PORT: 3306
       volumes:
         - storage_data:/app/storage/app
       depends_on:
         db:
           condition: service_healthy
       restart: unless-stopped

     db:
       image: mysql:8.0
       environment:
         MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
         MYSQL_DATABASE: ${DB_DATABASE}
         MYSQL_USER: ${DB_USERNAME}
         MYSQL_PASSWORD: ${DB_PASSWORD}
       volumes:
         - mysql_data:/var/lib/mysql
       healthcheck:
         test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
         interval: 10s
         timeout: 5s
         retries: 5
       restart: unless-stopped

   volumes:
     mysql_data:
     storage_data:
   ```

4. **Buat file .env**

   Copy `.env.example` ke `.env`:

   ```bash
   cp .env.example .env
   php artisan key:generate --show
   ```

   Isi `.env` dengan nilai berikut:

   ```env
   APP_NAME=Sekolix CABT
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=http://localhost:8080

   APP_KEY=base64:HASIL_KEY_GENERATE_DI_ATAS

   DB_CONNECTION=mysql
   DB_HOST=db
   DB_PORT=3306
   DB_DATABASE=sekolix_cabt
   DB_USERNAME=sekolix
   DB_PASSWORD=PasswordKuatUntukDatabase123!

   SESSION_DRIVER=database
   CACHE_STORE=database
   QUEUE_CONNECTION=sync
   FILESYSTEM_DISK=local
   LOG_CHANNEL=stderr
   LOG_LEVEL=error
   ```

   <Aside type="caution">
   `DB_HOST=db` mengacu pada nama service di `docker-compose.yml`. Jangan diubah saat menggunakan Docker Compose.
   </Aside>

5. **Build dan jalankan**

   ```bash
   # Build image dan start semua container
   docker compose up --build -d

   # Cek status container
   docker compose ps

   # Lihat log
   docker compose logs -f app
   ```

   Tunggu sampai log menampilkan pesan server siap.

6. **Jalankan migrasi dan seeder**

   Setelah container berjalan:

   ```bash
   docker compose exec app php artisan migrate:fresh --seed --force
   ```

7. **Buat akun Super Admin**

   ```bash
   docker compose exec app php artisan tinker --execute="
   App\Models\User::create([
       'name'     => 'Super Admin',
       'username' => 'superadmin',
       'email'    => 'admin@sekolahmu.id',
       'password' => bcrypt('PasswordKuatKamu123!'),
       'level'    => 4,
   ]);
   "
   ```

8. **Akses Aplikasi**

   Buka browser dan akses:

   | Halaman | URL |
   |---|---|
   | Login Peserta | `http://localhost:8080/login` |
   | Panel Admin/Guru | `http://localhost:8080/cabt` |

   Untuk production di VPS, ganti `localhost:8080` dengan domain kamu.

</Steps>

---

## Deploy ke VPS dengan Docker

Jika deploy ke VPS (bukan lokal):

```bash
# Di VPS (Ubuntu/Debian)
# 1. Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# 2. Clone repository
git clone https://github.com/rezacodev/sekolix-cabt.git
cd sekolix-cabt

# 3. Salin .env dan konfigurasi
cp .env.example .env
nano .env   # isi APP_KEY, DB_PASSWORD, APP_URL domain kamu

# 4. Build dan jalankan
docker compose up --build -d

# 5. Migrasi
docker compose exec app php artisan migrate --force
```

Untuk HTTPS di VPS, gunakan Nginx sebagai reverse proxy + Certbot untuk SSL certificate. Lihat panduan [VPS Ubuntu Manual](./vps).

---

## Perintah Docker Berguna

```bash
# Restart container app
docker compose restart app

# Update setelah git pull
docker compose up --build -d

# Masuk ke shell container
docker compose exec app sh

# Lihat log real-time
docker compose logs -f app

# Stop semua container
docker compose down

# Stop + hapus volume (HATI-HATI: data hilang!)
docker compose down -v
```

---

## Troubleshooting

### Container app langsung exit

Cek log:
```bash
docker compose logs app
```

Penyebab umum: `APP_KEY` kosong atau `DB_HOST` salah.

### Cannot connect to MySQL

Pastikan `DB_HOST=db` di `.env` — bukan `localhost` atau `127.0.0.1`. Docker Compose menggunakan nama service sebagai hostname.

### Permission denied di storage

```bash
docker compose exec app chmod -R 775 storage bootstrap/cache
docker compose exec app chown -R www-data:www-data storage bootstrap/cache
```

### Port 8080 sudah dipakai

Ubah mapping port di `docker-compose.yml`:
```yaml
ports:
  - "9090:80"   # ganti 8080 dengan port lain
```

---

## Langkah Selanjutnya

- [Deploy ke VPS Ubuntu](./vps) — untuk setup HTTPS dengan domain kustom
- [Pengaturan Umum](/sekolix-cabt-site/docs/panduan-super-admin/pengaturan-umum)
- [Troubleshooting](/sekolix-cabt-site/docs/referensi/troubleshooting)
