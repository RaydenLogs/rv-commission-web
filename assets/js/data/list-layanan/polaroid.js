/* =========================================
  DATA LAYANAN: CETAK FOTO POLAROID
  ========================================= */

window.RV = window.RV || {};

RV.layananPolaroid = [
    {
        id: "polaroid",
        nama: "Cetak Foto Polaroid",
        ikon: "polaroid",
        ringkas:
            "Cetak foto gaya polaroid dengan kertas glossy premium dan frame custom.",
        deskripsi:
            "Abadikan momen dalam cetakan bergaya polaroid yang hangat dan estetik. Dicetak dengan kertas foto premium, tersedia pilihan ukuran mini dan square, serta tulisan atau frame custom di bagian bawah foto.",
        fitur: [
            "Kertas foto premium tebal",
            "Bisa tambah tulisan custom",
            "Kemasan rapi siap jadi hadiah",
        ],
        paket: [
            {
                nama: "10 Lembar",
                harga: 10000,
                estimasi: "1 hari",
                isi: ["10 foto ukuran 2R", "Tulisan custom", "Kemasan plastik klip"],
            },
            {
                nama: "50 Lembar",
                harga: 50000,
                estimasi: "2 - 3 hari",
                isi: [
                    "50 foto foto ukuran 2R",
                    "Warna frame dan tulisan custom",
                    "Kemasan plastik klip",
                ],
            },
            {
                nama: "100 Lembar",
                harga: 100000,
                estimasi: "3 - 7 hari",
                isi: [
                    "100 foto ukuran 2R",
                    "Desain frame dan tulisan custom",
                    "Kemasan box kecil",
                ],
            },
            {
                nama: "Custom",
                harga: 1000,
                estimasi: ">7 hari (tergantung)",
                isi: [
                    "Foto ukuran 2R",
                    "Desain frame dan tulisan custom",
                    "Kemasan plastik/box kecil",
                    "harga tertera adalah harga untuk 1 foto",
                ],
            },
        ],
        tags: ["portrait", "landscape"],
        portofolio: [
            {
                src: "assets/img/portofolio/polaroid/1.jpg",
                judul: "Set Kenangan Wisuda",
                tag: "portrait",
            },
            {
                src: "assets/img/portofolio/polaroid/3.jpg",
                judul: "Foto Liburan",
                tag: "portrait",
            },
            {
                src: "assets/img/portofolio/polaroid/2.jpg",
                judul: "Hadiah Anniversary",
                tag: "landscape",
            },
            {
                src: "assets/img/portofolio/polaroid/4.jpg",
                judul: "Dekorasi Kamar",
                tag: "landscape",
            },
        ],
    },
];
