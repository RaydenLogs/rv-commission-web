/* =========================================
  DATA LAYANAN: PHOTO EDITING
  ========================================= */

window.RV = window.RV || {};

RV.layananPhotoEditing = [
    {
        id: "photo-editing",
        nama: "Photo Editing",
        ikon: "wand",
        ringkas: "Retouch, color grading, hingga manipulasi foto yang imajinatif.",
        deskripsi:
            "Sentuhan akhir yang membuat foto terlihat profesional. Mulai dari retouch kulit natural, penyesuaian warna sinematik, sampai manipulasi foto surreal yang menggabungkan beberapa gambar menjadi satu karya utuh.",
        fitur: [
            "Hasil natural, tidak berlebihan",
            "Pengerjaan dalam resolusi asli",
            "Pratinjau sebelum file final",
        ],
        paket: [
            {
                nama: "Retouch",
                harga: 50000,
                estimasi: "1 hari",
                isi: [
                    "Retouch wajah dan kulit",
                    "Koreksi warna dasar",
                    "1 kali revisi",
                ],
            },
            {
                nama: "Grading",
                harga: 10000,
                estimasi: "1 - 2 hari",
                isi: ["Retouch lengkap", "Color grading sinematik", "3 kali revisi"],
            },
            {
                nama: "Manipulasi",
                harga: 300000,
                estimasi: "3 - 5 hari",
                isi: [
                    "Manipulasi multi foto",
                    "Efek dan pencahayaan custom",
                    "File PSD tersedia",
                ],
            },
        ],
        tags: ["Retouch", "Color Grading", "Manipulasi"],
        portofolio: [
            {
                src: "assets/img/portofolio/photo-editing/1.jpg",
                judul: "Retouch Potret",
                tag: "Retouch",
            },
            {
                src: "assets/img/portofolio/photo-editing/2.jpg",
                judul: "Dunia Fantasi",
                tag: "Manipulasi",
            },
            {
                src: "assets/img/portofolio/photo-editing/3.jpg",
                judul: "Tone Senja",
                tag: "Color Grading",
            },
            {
                src: "assets/img/portofolio/photo-editing/4.jpg",
                judul: "Produk Melayang",
                tag: "Manipulasi",
            },
            {
                src: "assets/img/portofolio/photo-editing/5.jpg",
                judul: "Prewedding Film",
                tag: "Color Grading",
            },
            {
                src: "assets/img/portofolio/photo-editing/6.jpg",
                judul: "Beauty Retouch",
                tag: "Retouch",
            },
        ],
    },
];
