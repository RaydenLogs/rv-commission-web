/* =========================================
  DATA LAYANAN: CETAK STIKER
  ========================================= */

window.RV = window.RV || {};

RV.layananStiker = [
    {
        id: "stiker",
        nama: "Cetak Stiker",
        ikon: "sticker",
        ringkas:
            "Stiker vinyl, chromo, dan die cut custom dengan potongan presisi.",
        deskripsi:
            "Cetak stiker berkualitas untuk label produk, merchandise, atau koleksi pribadi. Tersedia bahan vinyl tahan air, chromo, dan transparan dengan pilihan potong kiss cut maupun die cut sesuai bentuk desain.",
        fitur: [
            "Bahan tahan air tersedia",
            "Potongan presisi mengikuti bentuk",
            "Bisa sekaligus dibuatkan desain",
        ],
        paket: [
            {
                nama: "A4 Chromo",
                harga: 15000,
                estimasi: "1 hari",
                isi: ["1 lembar A4 chromo", "Potong kiss cut", "File desain dari Anda"],
            },
            {
                nama: "A3 Vinyl",
                harga: 35000,
                estimasi: "1 - 2 hari",
                isi: ["1 lembar A3 vinyl", "Tahan air", "Potong mengikuti bentuk"],
            },
            {
                nama: "Die Cut",
                harga: 60000,
                estimasi: "2 - 3 hari",
                isi: [
                    "Stiker satuan die cut",
                    "Laminasi glossy atau doff",
                    "Gratis bantu layout",
                ],
            },
        ],
        tags: ["Vinyl", "Chromo", "Die Cut"],
        portofolio: [
            {
                src: "assets/img/portofolio/stiker/1.jpg",
                judul: "Label Produk Kopi",
                tag: "Vinyl",
            },
            {
                src: "assets/img/portofolio/stiker/2.jpg",
                judul: "Stiker Karakter",
                tag: "Die Cut",
            },
            {
                src: "assets/img/portofolio/stiker/3.jpg",
                judul: "Sticker Sheet",
                tag: "Chromo",
            },
            {
                src: "assets/img/portofolio/stiker/4.jpg",
                judul: "Merchandise Komunitas",
                tag: "Die Cut",
            },
            {
                src: "assets/img/portofolio/stiker/5.jpg",
                judul: "Label Kemasan",
                tag: "Vinyl",
            },
        ],
    },
];
