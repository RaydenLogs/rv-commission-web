/* =========================================
  DATA LAYANAN: 3D MODEL DESIGN
  ========================================= */

window.RV = window.RV || {};

RV.layananModel3d = [
  {
    id: "model-3d",
    nama: "3D Model Design",
    ikon: "cube",
    ringkas: "Model 3D untuk game, visualisasi produk, dan kebutuhan cetak.",
    deskripsi:
      "Pembuatan model 3D dari konsep atau referensi, mulai dari properti low poly untuk game hingga model detail untuk visualisasi produk. Tersedia tekstur, render, dan format file sesuai kebutuhan Anda.",
    fitur: [
      "Topologi rapi dan efisien",
      "Tekstur dan material",
      "Format FBX, OBJ, atau GLB",
    ],
    paket: [
      {
        nama: "Low Poly",
        harga: 150000,
        estimasi: "2 - 3 hari",
        isi: ["1 model sederhana", "Warna atau tekstur dasar", "2 kali revisi"],
      },
      {
        nama: "Mid Detail",
        harga: 400000,
        estimasi: "4 - 6 hari",
        isi: ["1 model detail sedang", "Tekstur PBR", "3 render presentasi"],
      },
      {
        nama: "High Detail",
        harga: 1000000,
        estimasi: "1 - 2 minggu",
        isi: [
          "Model detail tinggi",
          "UV dan tekstur lengkap",
          "Render dan turntable",
        ],
      },
    ],
    tags: ["Prop", "Karakter", "Produk"],
    portofolio: [
      {
        src: "assets/img/portofolio/model-3d/1.jpg",
        judul: "Pedang Fantasi",
        tag: "Prop",
      },
      {
        src: "assets/img/portofolio/model-3d/2.jpg",
        judul: "Karakter Stylized",
        tag: "Karakter",
      },
      {
        src: "assets/img/portofolio/model-3d/3.jpg",
        judul: "Botol Parfum",
        tag: "Produk",
      },
      {
        src: "assets/img/portofolio/model-3d/4.jpg",
        judul: "Kursi Klasik",
        tag: "Prop",
      },
      {
        src: "assets/img/portofolio/model-3d/5.jpg",
        judul: "Maskot Brand",
        tag: "Karakter",
      },
    ],
  },
];
