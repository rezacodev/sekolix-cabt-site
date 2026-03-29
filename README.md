# sekolix-cabt-site

Situs landing page dan dokumentasi resmi untuk **Sekolix CABT** — sistem ujian berbasis komputer (Computer-Based Assessment Tool) untuk sekolah.

Dibangun dengan [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) untuk dokumentasi, dan [Tailwind CSS v4](https://tailwindcss.com) untuk styling.

---

## Tentang Proyek Ini

Repositori ini berisi dua bagian utama:

### Landing Page

Halaman utama (`src/pages/index.astro`) yang menampilkan fitur-fitur unggulan Sekolix CABT kepada pengunjung umum. Didesain dengan tema gelap, animasi scroll, dan komponen reusable di `src/components/landing/`.

### Dokumentasi

Dokumentasi pengguna lengkap yang dibangun dengan Starlight, tersedia di path `/docs`. Mencakup 20 halaman yang diorganisasikan berdasarkan peran pengguna:

| Seksi | Halaman |
|---|---|
| **Mulai di Sini** | Tentang Sekolix CABT, Instalasi Cepat |
| **Panduan Peserta** | Login & Akses, Mengerjakan Ujian, Submit & Hasil, LiveScore |
| **Panduan Guru** | Dashboard, Bank Soal, Kategori Soal, Paket & Sesi Ujian, Penilaian & Laporan |
| **Panduan Admin** | Manajemen User, Manajemen Rombel, Sesi & Laporan |
| **Panduan Super Admin** | Instalasi, Pengaturan Umum |
| **Referensi** | Tipe Soal, Anti-Kecurangan, Laporan & Dokumen, Troubleshooting |

---

## Struktur Proyek

```
src/
├── assets/              # Gambar dan aset statis
├── components/
│   └── landing/         # Komponen landing page
├── content/
│   └── docs/docs/       # File .md dokumentasi (diorganisasi per peran)
│       ├── panduan-peserta/
│       ├── panduan-guru/
│       ├── panduan-admin/
│       ├── panduan-super-admin/
│       └── referensi/
├── layouts/
│   └── Landing.astro    # Layout untuk landing page
├── pages/
│   └── index.astro      # Landing page utama
└── styles/
    ├── global.css
    └── docs.css         # Override styling Starlight
astro.config.mjs         # Konfigurasi Astro + Starlight sidebar
```

---

## Perintah

| Perintah | Aksi |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server di `localhost:4321` |
| `npm run build` | Build produksi ke `./dist/` |
| `npm run preview` | Preview build sebelum deploy |

---

## Keterkaitan dengan Repositori Utama

Proyek ini adalah **frontend statis** yang berdiri sendiri. Aplikasi Laravel (`sekolix-cabt`) adalah backend/admin yang terpisah. Keduanya di-deploy secara independen — situs ini tidak melakukan request ke Laravel.
