---
title: Pilihan Platform Deployment
description: Perbandingan platform untuk deploy Sekolix CABT — Railway, Render, VPS, Docker, Fly.io, cPanel, DigitalOcean, dan Heroku.
sidebar:
  order: 3
---

import { Aside, Card, CardGrid, LinkCard } from '@astrojs/starlight/components';

Sekolix CABT dapat di-deploy ke berbagai platform cloud maupun on-premise. Pilih platform sesuai kebutuhan, anggaran, dan kemampuan teknis kamu.

<Aside type="note" title="Belum pernah deploy sebelumnya?">
Mulai dari **Railway** — paling mudah, tidak perlu konfigurasi server, dan memiliki tier gratis yang cukup untuk demo dan ujian skala kecil.
</Aside>

---

## Perbandingan Platform

| Platform | Tingkat Kesulitan | Harga Estimasi | Database | File Persisten | Cocok Untuk |
|---|---|---|---|---|---|
| [**Railway**](./deployment/railway) ⭐ | 🟢 Mudah | Gratis / $5/bln | MySQL native | Volume (berbayar) | Demo, sekolah kecil |
| [**Render.com**](./deployment/render) | 🟢 Mudah | Gratis / $7/bln | PostgreSQL | Disk gratis | Demo, alternatif Railway |
| [**Heroku**](./deployment/heroku) | 🟢 Mudah | $5–7/bln | MySQL add-on | Ephemeral | Tim yang familiar Heroku |
| [**Docker Compose**](./deployment/docker) | 🟡 Menengah | Sesuai server | MySQL | ✅ Volume | Developer, staging lokal |
| [**Fly.io**](./deployment/flyio) | 🟡 Menengah | Gratis (terbatas) / $5/bln | MySQL/Postgres | ✅ Volume | Developer yang suka CLI |
| [**DigitalOcean App Platform**](./deployment/digitalocean) | 🟡 Menengah | $5–12/bln | MySQL Managed | ✅ | Tim dengan anggaran |
| [**VPS Ubuntu Manual**](./deployment/vps) | 🔴 Lanjutan | $4–10/bln | MySQL self-hosted | ✅ Penuh | Kontrol penuh, multi-app |
| [**Shared Hosting cPanel**](./deployment/cpanel) | 🔴 Lanjutan | Rp50–150rb/bln | MySQL shared | ✅ | Hosting lokal Indonesia |

---

## Panduan Per Platform

---

## Persiapan

Sebelum mulai, pastikan kamu sudah:

- ✅ Repository `sekolix-cabt` di-push ke GitHub (`rezacodev/sekolix-cabt`)
- ✅ File `nixpacks.toml`, `start.sh`, dan `Procfile` sudah ada di repository
- ✅ Punya akun GitHub
- ✅ PHP tersedia di mesin lokal (untuk generate `APP_KEY`)

---

<CardGrid>
  <LinkCard title="🟢 Railway" description="Paling mudah. MySQL native, cocok untuk pemula." href="./deployment/railway" />
  <LinkCard title="🟢 Render.com" description="Gratis 750 jam/bln, persistent disk, alternatif Railway." href="./deployment/render" />
  <LinkCard title="🟢 Heroku" description="Platform klasik, ekosistem add-on lengkap." href="./deployment/heroku" />
  <LinkCard title="🟡 Docker Compose" description="Ideal untuk developer dan staging lokal." href="./deployment/docker" />
  <LinkCard title="🟡 Fly.io" description="Kontrol penuh via CLI, volume persisten gratis." href="./deployment/flyio" />
  <LinkCard title="🟡 DigitalOcean App Platform" description="Managed cloud, harga terjangkau, antarmuka bersih." href="./deployment/digitalocean" />
  <LinkCard title="🔴 VPS Ubuntu Manual" description="Kontrol penuh, cocok untuk multi-aplikasi." href="./deployment/vps" />
  <LinkCard title="🔴 Shared Hosting cPanel" description="Hosting Indonesia, butuh PHP 8.2 + SSH." href="./deployment/cpanel" />
</CardGrid>

---

## Checklist Sebelum Go-Live

Sebelum menggunakan Sekolix CABT untuk ujian sungguhan, pastikan:

- [ ] `APP_DEBUG=false` sudah di-set
- [ ] `APP_KEY` sudah di-set secara permanen (tidak di-generate ulang setiap restart)
- [ ] Migrasi berhasil — tidak ada error di Logs saat startup
- [ ] Bisa login sebagai Super Admin di `/cabt`
- [ ] General Setting sudah dikonfigurasi (nama sekolah, logo, dll.)
- [ ] Test membuat sesi ujian dan mengerjakan ujian sebagai peserta
- [ ] Pertimbangkan persistent storage untuk file upload soal URAIAN

<Aside type="tip" title="Butuh bantuan?">
Cek halaman [Troubleshooting](/sekolix-cabt-site/docs/referensi/troubleshooting) untuk solusi masalah umum setelah deployment.
</Aside>
