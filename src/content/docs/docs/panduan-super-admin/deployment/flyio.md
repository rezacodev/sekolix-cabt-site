---
title: Deploy ke Fly.io
description: Deploy Sekolix CABT ke Fly.io menggunakan flyctl CLI — kontrol penuh dengan volume persisten gratis.
sidebar:
  order: 4
---

import { Steps, Aside } from '@astrojs/starlight/components';

**Fly.io** memberikan 3 VM kecil gratis dengan kontrol penuh melalui CLI. Mendukung MySQL, volume persisten, dan deployment global.

:::note[TL;DR]
| | |
|---|---|
| **Cocok untuk** | Developer yang familiar dengan CLI dan Docker |
| **Harga** | Gratis (3 VM shared-cpu-1x) · ~$1–5/bln untuk MySQL |
| **Database** | MySQL atau PostgreSQL via Fly managed DB |
| **Waktu setup** | ~30–40 menit |
| **File persisten** | ✅ Volume gratis 3 GB |
:::

<Aside type="note" title="Untuk Developer">
Fly.io lebih teknis dari Railway atau Render. Kamu perlu familiar dengan terminal, Docker, dan CLI. Jika kamu pemula, gunakan [Railway](./railway) terlebih dahulu.
</Aside>

---

## Prasyarat

- ✅ Repository `sekolix-cabt` sudah di-push ke GitHub atau clone lokal
- ✅ [flyctl](https://fly.io/docs/hands-on/install-flyctl/) terinstal
- ✅ Akun Fly.io (perlu kartu kredit untuk verifikasi, tidak langsung ditagih)
- ✅ Docker Desktop berjalan (untuk build lokal)
- ✅ PHP tersedia di mesin lokal (untuk generate `APP_KEY`)

---

## Instalasi flyctl

```bash
# Windows (PowerShell)
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"

# macOS
brew install flyctl

# Linux
curl -L https://fly.io/install.sh | sh
```

Login:
```bash
fly auth login
```

---

## Langkah-langkah

<Steps>

1. **Buat Dockerfile**

   Fly.io menggunakan Docker. Buat `Dockerfile` di root project (sama seperti panduan [Docker Compose](./docker), langkah 1).

   Pastikan `CMD` di akhir Dockerfile adalah:
   ```dockerfile
   CMD ["sh", "start.sh"]
   ```

2. **Inisialisasi Fly app**

   Di folder project:

   ```bash
   cd sekolix-cabt
   fly launch --no-deploy
   ```

   Fly CLI akan bertanya beberapa hal:
   - **App name**: pilih nama unik, misalnya `sekolix-cabt-namasekolah`
   - **Region**: pilih `sin` (Singapore) untuk Indonesia
   - **PostgreSQL**: tolak (`N`) — kita gunakan MySQL
   - **Redis**: tolak (`N`)

   Fly akan membuat file `fly.toml` di root project.

3. **Edit fly.toml**

   Buka `fly.toml` yang baru dibuat dan sesuaikan:

   ```toml
   app = "sekolix-cabt-namasekolah"
   primary_region = "sin"

   [build]

   [http_service]
     internal_port = 80
     force_https = true
     auto_stop_machines = true
     auto_start_machines = true
     min_machines_running = 0

     [http_service.concurrency]
       type = "requests"
       hard_limit = 200
       soft_limit = 100

   [[vm]]
     memory = "512mb"
     cpu_kind = "shared"
     cpus = 1

   [mounts]
     source = "sekolix_storage"
     destination = "/app/storage/app"
   ```

4. **Buat volume persisten**

   ```bash
   fly volumes create sekolix_storage --region sin --size 3
   ```

   Volume ini menyimpan file upload yang tidak hilang saat redeploy.

5. **Buat database MySQL**

   Fly menyediakan managed MySQL:

   ```bash
   fly mysql create
   ```

   Pilih plan terkecil untuk menghemat biaya. Catat connection string yang diberikan.

   Atau gunakan database MySQL eksternal (PlanetScale, dsb.) — lebih hemat.

6. **Generate APP_KEY**

   ```bash
   php artisan key:generate --show
   ```

   Copy outputnya.

7. **Set secrets (environment variables)**

   Fly menyimpan environment variables sebagai "secrets" yang terenkripsi:

   ```bash
   fly secrets set \
     APP_NAME="Sekolix CABT" \
     APP_ENV=production \
     APP_DEBUG=false \
     APP_URL=https://sekolix-cabt-namasekolah.fly.dev \
     APP_KEY="base64:HASIL_KEY_GENERATE_KAMU" \
     DB_CONNECTION=mysql \
     DB_HOST=DARI_MYSQL_CONNECTION_STRING \
     DB_PORT=3306 \
     DB_DATABASE=sekolix_cabt \
     DB_USERNAME=DARI_MYSQL \
     DB_PASSWORD=DARI_MYSQL \
     SESSION_DRIVER=database \
     CACHE_STORE=database \
     QUEUE_CONNECTION=sync \
     FILESYSTEM_DISK=local \
     LOG_CHANNEL=stderr \
     LOG_LEVEL=error
   ```

   <Aside type="tip">
   Jalankan satu per satu atau buat file `.env.fly` lalu import dengan `cat .env.fly | fly secrets import`.
   </Aside>

8. **Deploy**

   ```bash
   fly deploy
   ```

   Fly akan build Docker image dan deploy ke region Singapore. Proses pertama memakan waktu 5–10 menit.

   Pantau progres:
   ```bash
   fly logs
   ```

9. **Jalankan migrasi**

   Setelah deploy berhasil:

   ```bash
   fly ssh console
   php artisan migrate:fresh --seed --force
   ```

10. **Buat akun Super Admin**

    Di console SSH yang sama:

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

    Ketik `exit` untuk keluar dari SSH.

11. **Akses Aplikasi**

    | Halaman | URL |
    |---|---|
    | Login Peserta | `https://sekolix-cabt-namasekolah.fly.dev/login` |
    | Panel Admin/Guru | `https://sekolix-cabt-namasekolah.fly.dev/cabt` |

</Steps>

---

## Perintah Fly Berguna

```bash
# Lihat status app
fly status

# Lihat log real-time
fly logs

# SSH ke container
fly ssh console

# Redeploy
fly deploy

# Scale machine
fly scale memory 1024

# Lihat daftar secrets
fly secrets list

# Update secret
fly secrets set APP_DEBUG=false
```

---

## Catatan Penting

### Auto Stop/Start

`auto_stop_machines = true` di `fly.toml` membuat machine mati saat tidak ada traffic (hemat biaya). Machine otomatis hidup lagi saat ada request, tapi cold start memakan ~3–5 detik.

Untuk menghindari cold start, set `min_machines_running = 1` (menambah biaya ~$1.94/bln).

### Volume dan Redeploy

Volume `sekolix_storage` persisten — file upload tidak akan hilang saat `fly deploy`. Pastikan path `/app/storage/app` sama dengan `destination` di `fly.toml`.

---

## Troubleshooting

### Build gagal: Dockerfile not found

Pastikan `Dockerfile` ada di root project dan sudah ter-commit ke Git.

### SSH tidak bisa connect

```bash
fly ssh issue --agent   # regenerate SSH certificate
```

### Migration gagal

Cek apakah secrets DB sudah di-set dengan benar:
```bash
fly secrets list
fly ssh console
php artisan tinker --execute="DB::connection()->getPdo();"
```

### Volume tidak ter-mount

Verifikasi nama volume di `fly.toml` sesuai dengan yang dibuat:
```bash
fly volumes list
```

---

## Langkah Selanjutnya

- [Pengaturan Umum](/sekolix-cabt-site/docs/panduan-super-admin/pengaturan-umum)
- [Manajemen User](/sekolix-cabt-site/docs/panduan-admin/manajemen-user)
- [Troubleshooting](/sekolix-cabt-site/docs/referensi/troubleshooting)
