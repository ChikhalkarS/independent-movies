# STYLE BRIEF: Untold Epic — Brahmastra

## Tema & Perasaan
**Produk/Tema:** Brahmastra dari Mahabharata — senjata purba WMD yang diparalelkan dengan teori atom modern (Oppenheimer)
**Tiga kata sifat perasaan:** *Awe* (kagum), *Dread* (ngeri hormat), *Reverence* (penghormatan kuno)

## Konsep & Sidik Jari Struktur (Explainer)
**Gaya explainer:** Aksi kontinu (starter-explainer.html) — dunia mengalir, kamera mengikuti objek utama
**Rasio:** 9:16 vertikal (1080×1920) — Shorts/Reels
**Durasi target:** 60 detik (mengikuti VO)
**Suara:** VO pria dramatis + SFX (bass drop, chanting, transisi tajam) — **user generate & kirim ulang**

## Palet (dari tema, BUKAN dari starter)
| Warna | Hex | Sumber |
|---|---|---|
| **Brahmastra Gold** (utama) | #E8B84D | Emas kuno pada panah Brahmastra, ikon Mahabharata |
| **Plasma Cyan** (aksen) | #00FFFF | Energi plasma, glyph Devanagari bersinar |
| **Blue-White** (sorotan) | #E8F4FF | Ledakan termonuklir, inti plasma |
| **Blood Red** (latar) | #8B0000 | Langit senja medan perang Kurukshetra |
| **Deep Ochre** (tanah) | #986928 | Debu medan perang, tanah kering |
| **Shield Gold** (lengkung) | #FFD700 @ 0.3 | Kubah perlindungan mistis |
| **Ash Grey** (detail) | #3D3D3D | Abu, bayangan, partikel debu |

**Warna BUKAN dari brand (turunan):** Blood Red, Deep Ochre, Ash Grey — alasan: memperluas palet emas-sian untuk suasana gelap/epik

## Font Display (berkarakter, BUKAN Poppins/Inter/Roboto/Montserrat)
| Peran | Font | Alasan |
|---|---|---|
| **Display/Utama** | **Cinzel** (serif monumental, tebal) | Citra prasasti kuno, epik, otoriter |
| **Pendamping** | **IBM Plex Sans** (grotesk bersih) | Keterbacaan body, kontras modern vs kuno |
| **Aksen/Label** | **Noto Sans Devanagari** | Glyph Sanskrit asli untuk label teknis |

## Penekanan Teks
- **Tanpa sorotan kata (bentuk `tanpa`)** — penekanan dari: kata per kata redup→penuh, ukuran, jeda, objek UI di samping kata
- **Sentence case, bobot 500–600** — KAPITAL hanya adegan penekanan (hook & ledakan)
- **Tanpa titik otomatis** — hanya `?` untuk pertanyaan sungguhan, titik untuk dua kalimat pendek berturut-turut
- **Sorotan hanya bila style brief memilih** — ini memilih `tanpa`

## Bahasa Latar (satu untuk semua, dari techniques.md §7c)
**Grainy Gradient** (baris 9 tabel "Arah gaya"): *dasar gelap/warna dalam; bentuk bergradien jenuh 2–3 warna bercahaya dari dalam; butiran halus di seluruh frame*
- Lapisan 1: Gradien radial Blood Red → #1A0505 (langit)
- Lapisan 2: Blob gradien Plasma Cyan → Blue-White di pusat (energi Brahmastra)
- Lapisan 3: Butiran halus (noise SVG) di seluruh frame, opacity 0.15–0.25
- **Tidak flat, tidak hitam murni, tidak nebula default starter**

## Gerak Latar (satu dari §7c, BERBEDA dari proyek sebelumnya)
**Bentuk bergradien membuka/berputar pelan + kamera menembus lubang bentuk** (langsung dari tabel: "lapis bentuk membuka/berputar pelan, kamera menembus lubang bentuk, bola cahaya pemandu")
- Blob energi Brahmastra berputar lambat (0.05 rad/s) + bernapas (scale 1.0 ↔ 1.02)
- Kamera dolly ke dalam lubang gradien saat transisi adegan
- Partikel naik lambat dari tanah (abu/debu medan perang)

## Tanda Tangan Gerak (satu yang diulang sebagai identitas)
**Push-through termotivasi ke elemen yang bercerita** (dari §3 & §3b):
- Kamera mendekat ke glyph/glyph cluster saat VO menyebutnya
- Mundur ke wide saat konteks medan perang dibutuhkan
- **Bukan** zoom kosong, **bukan** whip default, **bukan** cut murni

## Gaya Render Objek (satu keluarga dari §7e)
**Glossy / Kaca** (utama) + **Garis Neon** (untuk glyph & blueprint):
- Shaft Brahmastra: glossy emas dengan subsurface scattering
- Glyph: garis neon cyan dengan glow luar
- Shield: hex grid garis neon emas, semi-transparan
- Ledakan: volume glow (bukan partikel 2D saja)

## Transisi
| Batas | Jenis | Pemicu Terlihat |
|---|---|---|
| Hook→Morph | Push-through ke manuscript | Manuscript "terbang" ke kamera |
| Morph→Charge | Camera dolly ke blueprint | Blueprint mengorbit, kamera ikut |
| Charge→Detonate | Cut keras di titik ledakan | Putih total 2 frame → rebound |
| Detonate→Parallel | Whip ke side-by-side | Shield menghilang, dunia bergeser |
| Parallel→Loop | Match-cut (hard cut) | Glyph framing identik |

**Satu momen istimewa:** Ledakan (30–34s) — volume glow maksimal, bass drop, shockwave distortion

## Aset & Sumber
- **Semua ilustrasi:** Generate via GPT Image 2 → hapus latar → cutout (bukan foto stok)
- **Glyph Devanagari:** SVG vektor asli, bukan font teks
- **Foto referensi:** Wikimedia Commons (medan perang, prasasti) — lisensi bebas
- **Tidak ada screenshot/UI mockup** (bukan app/SaaS)

## Checklist Hukum Anti-PPT
- [ ] Bukan section yang di-fade (dunia/kamera bergerak)
- [ ] Benang merah: Brahmastra hadir dari awal sampai akhir
- [ ] ≤ 2 tingkat teks per adegan (judul + label dunia)
- [ ] Gerak tiap detik (bahasa latar + kamera + objek)
- [ ] Transisi bervariasi (push-through, cut, whip, match-cut)
- [ ] Starter yang benar: `starter-explainer.html` (aksi kontinu)
- [ ] Latar tidak default gelap/nebula — grainy gradient dari tema
- [ ] Latar tidak statis — blob berputar, partikel, kamera dolly
- [ ] Berbeda dari proyek sebelumnya (palet, font, bahasa latar, tanda tangan)

---

**Disetujui sebelum kode:** ________________