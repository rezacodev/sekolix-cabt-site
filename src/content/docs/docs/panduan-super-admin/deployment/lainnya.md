---
title: Platform Lainnya
description: Panduan singkat deploy Sekolix CABT ke AWS, Google Cloud, Azure, dan platform lain yang mendukung Docker atau PHP.
sidebar:
  order: 9
---

import { Aside, LinkCard, CardGrid } from '@astrojs/starlight/components';

Halaman ini memberikan panduan singkat untuk platform-platform lain yang tidak tercakup secara lengkap di panduan utama. Semua platform ini mendukung deployment aplikasi Laravel/PHP, baik via Docker maupun buildpack.

<Aside type="note" title="Prasyarat Umum">
Untuk semua platform berikut, pastikan kamu sudah memiliki:
- Repository `sekolix-cabt` di GitHub (`rezacodev/sekolix-cabt`)
- File `Dockerfile` di root project (lihat panduan [Docker Compose](./docker))
- `APP_KEY` yang sudah di-generate (`php artisan key:generate --show`)
- Database MySQL (bisa dari layanan managed DB mana pun)
</Aside>

---

## Amazon Web Services (AWS)

### AWS Elastic Beanstalk

Elastic Beanstalk adalah PaaS AWS yang menangani deployment, scaling, dan monitoring secara otomatis.

**Langkah cepat:**

```bash
# Install AWS CLI dan EB CLI
pip install awscli awsebcli

# Konfigurasi kredensial AWS
aws configure

# Inisialisasi Elastic Beanstalk di folder project
cd sekolix-cabt
eb init sekolix-cabt --platform php-8.2 --region ap-southeast-1

# Buat environment dan deploy
eb create production --instance-type t3.micro

# Set environment variables
eb setenv APP_KEY=base64:xxx APP_ENV=production APP_DEBUG=false \
  DB_CONNECTION=mysql DB_HOST=xxx DB_DATABASE=xxx DB_USERNAME=xxx DB_PASSWORD=xxx

# Deploy ulang setelah set env
eb deploy
```

**Database:** Gunakan **Amazon RDS for MySQL** (dari AWS Console) dan hubungkan via `DB_HOST`.

### AWS App Runner

Alternatif yang lebih sederhana dari Elastic Beanstalk — deploy langsung dari container image.

```bash
# Build dan push Docker image ke Amazon ECR
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS \
  --password-stdin 123456789.dkr.ecr.ap-southeast-1.amazonaws.com

docker build -t sekolix-cabt .
docker tag sekolix-cabt:latest 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/sekolix-cabt:latest
docker push 123456789.dkr.ecr.ap-southeast-1.amazonaws.com/sekolix-cabt:latest
```

Lalu buat **App Runner service** dari AWS Console dengan image ECR tersebut.

<Aside type="tip">
AWS menyediakan **Free Tier 12 bulan** untuk t2.micro EC2 dan RDS db.t3.micro. App Runner tidak termasuk free tier.
</Aside>

---

## Google Cloud

### Google Cloud Run

Cloud Run menjalankan container stateless secara serverless — ideal untuk traffic tidak menentu.

```bash
# Login dan set project
gcloud auth login
gcloud config set project PROJECT_ID

# Build dan push ke Google Artifact Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/sekolix-cabt

# Deploy ke Cloud Run
gcloud run deploy sekolix-cabt \
  --image gcr.io/PROJECT_ID/sekolix-cabt \
  --platform managed \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars APP_ENV=production,APP_DEBUG=false \
  --set-secrets APP_KEY=app-key:latest,DB_PASSWORD=db-password:latest
```

**Database:** Gunakan **Cloud SQL for MySQL** dan hubungkan via Cloud SQL Auth Proxy.

### Google App Engine (Standard/Flexible)

```yaml
# app.yaml
runtime: php
env: standard
api_version: 1

runtime_config:
  document_root: public

env_variables:
  APP_ENV: production
  APP_DEBUG: "false"
  DB_CONNECTION: mysql

handlers:
  - url: /.*
    script: auto
    secure: always
```

```bash
gcloud app deploy
```

<Aside type="note">
Google Cloud menyediakan **$300 kredit gratis** untuk akun baru (berlaku 90 hari).
</Aside>

---

## Microsoft Azure

### Azure App Service

```bash
# Login ke Azure
az login

# Buat resource group dan App Service Plan
az group create --name sekolix-rg --location southeastasia
az appservice plan create --name sekolix-plan --resource-group sekolix-rg \
  --sku B1 --is-linux

# Buat Web App dengan container Docker
az webapp create --resource-group sekolix-rg --plan sekolix-plan \
  --name sekolix-cabt --deployment-container-image-name rezacodev/sekolix-cabt:latest

# Set environment variables
az webapp config appsettings set --resource-group sekolix-rg --name sekolix-cabt \
  --settings APP_ENV=production APP_DEBUG=false APP_KEY=base64:xxx \
    DB_CONNECTION=mysql DB_HOST=xxx DB_DATABASE=xxx
```

**Database:** Gunakan **Azure Database for MySQL** (Flexible Server).

<Aside type="tip">
Azure menyediakan **$200 kredit gratis** untuk akun baru (berlaku 30 hari).
</Aside>

---

## Platform Docker-Compatible Lainnya

Setiap platform yang mendukung Docker dapat menjalankan Sekolix CABT menggunakan `Dockerfile` yang sama. Berikut beberapa contoh:

| Platform | Cara Deploy | Free Tier |
|---|---|---|
| **Coolify** (self-hosted) | Git → Docker build otomatis | ✅ Self-hosted gratis |
| **Dokku** (self-hosted) | `git push dokku main` | ✅ Self-hosted gratis |
| **Caprover** (self-hosted) | Dashboard web + One-Click | ✅ Self-hosted gratis |
| **Portainer** | Stack dari `docker-compose.yml` | ✅ Community Edition gratis |
| **Qoddi** | Git → buildpack PHP | Gratis 3 apps |
| **Back4App Containers** | Docker image | Gratis 100 jam/bln |

### Coolify (Rekomendasi Self-Hosted)

[Coolify](https://coolify.io) adalah alternatif self-hosted Railway/Heroku yang gratis dan bisa dipasang di VPS manapun.

```bash
# Install Coolify di VPS Ubuntu
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

Setelah terinstal, buka dashboard Coolify → **New Resource** → **Application** → pilih repository GitHub → pilih **Dockerfile** sebagai build pack → set environment variables → Deploy.

---

## Panduan Umum: Deploy dengan Dockerfile

Jika platform kamu mendukung Docker tetapi tidak tercantum di atas, gunakan alur umum ini:

1. **Buat Dockerfile** — lihat panduan [Docker Compose](./docker)
2. **Build image:**
   ```bash
   docker build -t sekolix-cabt:latest .
   ```
3. **Push ke registry** (Docker Hub, GHCR, ECR, GAR):
   ```bash
   docker tag sekolix-cabt:latest namakamu/sekolix-cabt:latest
   docker push namakamu/sekolix-cabt:latest
   ```
4. **Set environment variables** di platform kamu (lihat tabel lengkap di [Railway](./railway#environment-variables-lengkap))
5. **Jalankan migrasi** via shell/console platform:
   ```bash
   php artisan migrate --force
   ```

---

## Langkah Selanjutnya

<CardGrid>
  <LinkCard title="Docker Compose" description="Panduan Dockerfile lengkap untuk semua platform Docker." href="./docker" />
  <LinkCard title="VPS Ubuntu Manual" description="Kontrol penuh di server sendiri tanpa Docker." href="./vps" />
  <LinkCard title="Troubleshooting" description="Solusi masalah umum setelah deployment." href="/sekolix-cabt-site/docs/referensi/troubleshooting" />
</CardGrid>
