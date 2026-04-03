---
title: Instalasi
description: Panduan instalasi cepat Sekolix CABT untuk IT/Super Admin.
---

import { Steps } from '@astrojs/starlight/components';

<Steps>

1. **Clone repositori**

   ```bash
   git clone https://github.com/rezacodev/sekolix-cabt.git sekolix-cabt
   cd sekolix-cabt
   ```

2. **Install dependensi**

   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi environment**

   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

   Edit file `.env` — sesuaikan `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`.

   Untuk notifikasi email, isi juga:
   ```env
   MAIL_MAILER=smtp
   MAIL_HOST=smtp.example.com
   MAIL_PORT=587
   MAIL_USERNAME=your@email.com
   MAIL_PASSWORD=yourpassword
   MAIL_FROM_ADDRESS=your@email.com
   MAIL_FROM_NAME="Sekolix CABT"
   ```

4. **Migrasi database & seeder**

   ```bash
   php artisan migrate --seed
   php artisan storage:link
   ```

5. **Build aset & jalankan**

   ```bash
   npm run build
   php artisan serve
   ```

   Akses di `http://localhost:8000`.

</Steps>

## Persyaratan Sistem

| Komponen | Versi Minimum |
|---|---|
| PHP | 8.2 |
| Composer | 2.x |
| Node.js | 18.x |
| MySQL | 8.0 / MariaDB 10.6 |
| PHP ext | `gd`, `zip`, `mbstring`, `pdo_mysql` |

## Scheduler & Queue (Notifikasi Email)

Untuk notifikasi email otomatis (sesi dibuka/ditutup), jalankan queue worker dan scheduler:

```bash
# Queue worker (background)
php artisan queue:work --daemon

# Scheduler (cron — jalankan setiap menit)
* * * * * cd /path/to/sekolix-cabt && php artisan schedule:run >> /dev/null 2>&1
```

:::tip
Jika menggunakan shared hosting tanpa akses daemon, gunakan cron job Cpanel setiap menit untuk `schedule:run`. Notifikasi email bersifat opsional — sistem tetap berjalan normal tanpanya.
:::

Panduan lengkap deployment production tersedia di [Panduan Super Admin](/docs/panduan-super-admin/instalasi).
