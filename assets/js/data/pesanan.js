/* =========================================
  DATA PESANAN
  Daftar pesanan yang tampil di halaman Pesanan.

  Status yang tersedia:
  antre   = Dalam antrean
  proses  = Sedang dikerjakan
  revisi  = Tahap revisi
  selesai = Selesai

  layanan diisi dengan id dari file layanan.js
  progres diisi angka 0 sampai 100

  List Kategori Pesanan:
  web-design, roblox, desian-grafis, polaroid, model-3d, stiker, app-design, photo-editing
   ========================================= */

RV.pesananDiperbarui = "17 Oktober 2026";

RV.pesanan = [
  // Proses
  {
    kode: "RV-2609-001",
    klien: "Pu**t",
    layanan: "web-design",
    detail: "Static Commission Web",
    masuk: "16 Sep 2026",
    estimasi: "24 Okt 2026",
    status: "proses",
    progres: 10,
  },

  // Revisi
  {
    kode: "RV-2610-002",
    klien: "it******GT",
    layanan: "roblox",
    detail: "Music Club Building (Build-only)",
    masuk: "17 Okt 2026",
    estimasi: "24 Okt 2026",
    status: "revisi",
    progres: 50,
  },

  {
    kode: "RV-2610-003",
    klien: "Sk****u0",
    layanan: "roblox",
    detail: "Natural Hangout Map (Full-Dev)",
    masuk: "17 Okt 2026",
    estimasi: "20 Nov 2026",
    status: "revisi",
    progres: 25,
  },

  // Antri

  // Selesai
  {
    kode: "RV-2610-001",
    klien: "In******D",
    layanan: "desain-grafis",
    detail: "Logo Kelas Informatika D25 Unsulbar",
    masuk: "19 Okt 2026",
    estimasi: "19 Okt 2026",
    status: "selesai",
    progres: 100,
  },
];