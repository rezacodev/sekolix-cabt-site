---
title: Instalasi
description: Panduan instalasi cepat Sekolix CABT untuk IT/Super Admin.
---

import { Steps } from '@astrojs/starlight/components';

<Steps>

1. **Clone repositori**

   ```bash
   git clone <url-repo> sekolix-cabt
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

Panduan lengkap deployment production tersedia di [Panduan Super Admin](/docs/panduan-super-admin/instalasi).
