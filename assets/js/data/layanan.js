/* =========================================
   DATA LAYANAN
   Setiap layanan di sini otomatis tampil di menu Kategori,
   halaman Home, dan halaman detail layanan.

   Cara menambah foto portofolio:
   1. Taruh foto di folder assets/img/portofolio/<id layanan>/
   2. Tambahkan satu baris di bagian portofolio, contoh:
      { src: 'assets/img/portofolio/desain-grafis/logo-kopi.jpg', judul: 'Logo Kedai Kopi', tag: 'Logo' }
   Ukuran foto bebas, tampilan menyesuaikan otomatis.

   Foto utama (preview) tiap layanan taruh di:
   assets/img/layanan/<id layanan>.jpg
   ========================================= */

RV.layanan = [
  {
    id: 'desain-grafis',
    nama: 'Desain Grafis',
    ikon: 'pen',
    ringkas: 'Logo, banner, konten sosial media, poster, dan kebutuhan visual brand.',
    deskripsi: 'Identitas visual yang rapi dan berkarakter untuk brand, acara, maupun konten pribadi. Setiap desain dibuat dari nol dengan riset gaya, pemilihan warna, dan tipografi yang tepat agar pesan Anda tersampaikan dengan elegan.',
    fitur: ['Desain original tanpa template', 'File resolusi tinggi siap cetak dan unggah', 'Konsultasi konsep sebelum pengerjaan'],
    paket: [
      { nama: 'Basic', harga: 50000, estimasi: '1 - 2 hari', isi: ['1 desain konten atau banner', '2 kali revisi', 'File JPG dan PNG'] },
      { nama: 'Standard', harga: 150000, estimasi: '2 - 4 hari', isi: ['Logo atau 3 desain konten', '4 kali revisi', 'File JPG, PNG, dan PDF'] },
      { nama: 'Premium', harga: 350000, estimasi: '4 - 7 hari', isi: ['Logo dan brand kit lengkap', 'Revisi tanpa batas wajar', 'File master editable'] }
    ],
    tags: ['Logo', 'Banner', 'Sosial Media', 'Poster'],
    portofolio: [
      { src: 'assets/img/portofolio/desain-grafis/1.jpg', judul: 'Logo Brand Kopi', tag: 'Logo' },
      { src: 'assets/img/portofolio/desain-grafis/2.jpg', judul: 'Poster Acara Musik', tag: 'Poster' },
      { src: 'assets/img/portofolio/desain-grafis/3.jpg', judul: 'Feed Instagram Butik', tag: 'Sosial Media' },
      { src: 'assets/img/portofolio/desain-grafis/4.jpg', judul: 'Banner Promo Toko', tag: 'Banner' },
      { src: 'assets/img/portofolio/desain-grafis/5.jpg', judul: 'Logo Studio Foto', tag: 'Logo' },
      { src: 'assets/img/portofolio/desain-grafis/6.jpg', judul: 'Poster Seminar', tag: 'Poster' }
    ]
  },
  {
    id: 'photo-editing',
    nama: 'Photo Editing',
    ikon: 'wand',
    ringkas: 'Retouch, color grading, hingga manipulasi foto yang imajinatif.',
    deskripsi: 'Sentuhan akhir yang membuat foto terlihat profesional. Mulai dari retouch kulit natural, penyesuaian warna sinematik, sampai manipulasi foto surreal yang menggabungkan beberapa gambar menjadi satu karya utuh.',
    fitur: ['Hasil natural, tidak berlebihan', 'Pengerjaan dalam resolusi asli', 'Pratinjau sebelum file final'],
    paket: [
      { nama: 'Retouch', harga: 25000, estimasi: '1 hari', isi: ['Retouch wajah dan kulit', 'Koreksi warna dasar', '1 kali revisi'] },
      { nama: 'Grading', harga: 75000, estimasi: '1 - 2 hari', isi: ['Retouch lengkap', 'Color grading sinematik', '3 kali revisi'] },
      { nama: 'Manipulasi', harga: 200000, estimasi: '3 - 5 hari', isi: ['Manipulasi multi foto', 'Efek dan pencahayaan custom', 'File PSD tersedia'] }
    ],
    tags: ['Retouch', 'Color Grading', 'Manipulasi'],
    portofolio: [
      { src: 'assets/img/portofolio/photo-editing/1.jpg', judul: 'Retouch Potret', tag: 'Retouch' },
      { src: 'assets/img/portofolio/photo-editing/2.jpg', judul: 'Dunia Fantasi', tag: 'Manipulasi' },
      { src: 'assets/img/portofolio/photo-editing/3.jpg', judul: 'Tone Senja', tag: 'Color Grading' },
      { src: 'assets/img/portofolio/photo-editing/4.jpg', judul: 'Produk Melayang', tag: 'Manipulasi' },
      { src: 'assets/img/portofolio/photo-editing/5.jpg', judul: 'Prewedding Film', tag: 'Color Grading' },
      { src: 'assets/img/portofolio/photo-editing/6.jpg', judul: 'Beauty Retouch', tag: 'Retouch' }
    ]
  },
  {
    id: 'web-design',
    nama: 'Web Design',
    ikon: 'monitor',
    ringkas: 'Tampilan website modern, responsif, dan nyaman dijelajahi.',
    deskripsi: 'Desain website yang memadukan estetika dan kemudahan penggunaan. Cocok untuk landing page produk, company profile, hingga portofolio pribadi. Tersedia opsi desain saja atau desain sekaligus pembuatan website statis.',
    fitur: ['Desain responsif untuk semua perangkat', 'Struktur halaman berorientasi konversi', 'File desain Figma diserahkan'],
    paket: [
      { nama: 'Landing', harga: 500000, estimasi: '4 - 6 hari', isi: ['1 halaman landing page', 'Versi desktop dan mobile', '3 kali revisi'] },
      { nama: 'Company', harga: 1500000, estimasi: '1 - 2 minggu', isi: ['Hingga 5 halaman', 'Komponen UI konsisten', 'Prototype interaktif'] },
      { nama: 'Full Build', harga: 3500000, estimasi: '2 - 4 minggu', isi: ['Desain dan coding website', 'Animasi interaktif', 'Bantuan online pasca rilis'] }
    ],
    tags: ['Landing Page', 'Company Profile', 'Portofolio'],
    portofolio: [
      { src: 'assets/img/portofolio/web-design/1.jpg', judul: 'Landing Page Parfum', tag: 'Landing Page' },
      { src: 'assets/img/portofolio/web-design/2.jpg', judul: 'Website Arsitek', tag: 'Company Profile' },
      { src: 'assets/img/portofolio/web-design/3.jpg', judul: 'Portofolio Fotografer', tag: 'Portofolio' },
      { src: 'assets/img/portofolio/web-design/4.jpg', judul: 'Landing Page Event', tag: 'Landing Page' },
      { src: 'assets/img/portofolio/web-design/5.jpg', judul: 'Profil Perusahaan', tag: 'Company Profile' }
    ]
  },
  {
    id: 'app-design',
    nama: 'Mobile App Design',
    ikon: 'phone',
    ringkas: 'UI dan UX aplikasi mobile yang intuitif dan siap dikembangkan.',
    deskripsi: 'Rancangan antarmuka aplikasi mobile dari alur pengguna hingga tampilan akhir. Setiap layar dibuat konsisten dengan design system sederhana sehingga mudah diteruskan ke tahap pengembangan oleh developer.',
    fitur: ['User flow dan wireframe', 'Design system dan komponen', 'Prototype yang bisa dicoba'],
    paket: [
      { nama: 'Starter', harga: 750000, estimasi: '5 - 7 hari', isi: ['Hingga 5 layar', 'Style guide dasar', '3 kali revisi'] },
      { nama: 'Pro', harga: 1800000, estimasi: '2 minggu', isi: ['Hingga 15 layar', 'Prototype interaktif', 'Komponen reusable'] },
      { nama: 'Complete', harga: 3500000, estimasi: '3 - 4 minggu', isi: ['Layar tanpa batas wajar', 'Design system lengkap', 'Handoff ke developer'] }
    ],
    tags: ['UI Design', 'UX Flow', 'Prototype'],
    portofolio: [
      { src: 'assets/img/portofolio/app-design/1.jpg', judul: 'Aplikasi Kasir', tag: 'UI Design' },
      { src: 'assets/img/portofolio/app-design/2.jpg', judul: 'Aplikasi Kebugaran', tag: 'Prototype' },
      { src: 'assets/img/portofolio/app-design/3.jpg', judul: 'Alur Pemesanan', tag: 'UX Flow' },
      { src: 'assets/img/portofolio/app-design/4.jpg', judul: 'Dompet Digital', tag: 'UI Design' },
      { src: 'assets/img/portofolio/app-design/5.jpg', judul: 'Aplikasi Musik', tag: 'Prototype' }
    ]
  },
  {
    id: 'roblox',
    nama: 'Roblox Map Development',
    ikon: 'blocks',
    ringkas: 'Build map dan scripting Luau untuk game Roblox Anda.',
    deskripsi: 'Pembangunan map Roblox yang detail dan teroptimasi, lengkap dengan scripting Luau untuk sistem gameplay. Mulai dari showcase map, obby, roleplay, hingga sistem custom seperti toko, inventori, dan leaderboard.',
    fitur: ['Build rapi dan teroptimasi', 'Script Luau bersih dan terstruktur', 'File place diserahkan lengkap'],
    paket: [
      { nama: 'Build', harga: 300000, estimasi: '3 - 5 hari', isi: ['Map ukuran kecil', 'Lighting dan atmosfer', '2 kali revisi'] },
      { nama: 'Build + Script', harga: 900000, estimasi: '1 - 2 minggu', isi: ['Map ukuran sedang', 'Hingga 3 sistem script', 'Uji coba bersama'] },
      { nama: 'Full Game', harga: 2500000, estimasi: '3 - 5 minggu', isi: ['Map besar dan detail', 'Sistem gameplay lengkap', 'Bantuan setelah rilis'] }
    ],
    tags: ['Build', 'Scripting', 'Showcase'],
    portofolio: [
      { src: 'assets/img/portofolio/roblox/1.jpg', judul: 'Kota Malam', tag: 'Showcase' },
      { src: 'assets/img/portofolio/roblox/2.jpg', judul: 'Obby Sky Temple', tag: 'Build' },
      { src: 'assets/img/portofolio/roblox/3.jpg', judul: 'Sistem Toko', tag: 'Scripting' },
      { src: 'assets/img/portofolio/roblox/4.jpg', judul: 'Hutan Misteri', tag: 'Build' },
      { src: 'assets/img/portofolio/roblox/5.jpg', judul: 'Lobby Game', tag: 'Showcase' },
      { src: 'assets/img/portofolio/roblox/6.jpg', judul: 'Sistem Inventori', tag: 'Scripting' }
    ]
  },
  {
    id: 'model-3d',
    nama: '3D Model Design',
    ikon: 'cube',
    ringkas: 'Model 3D untuk game, visualisasi produk, dan kebutuhan cetak.',
    deskripsi: 'Pembuatan model 3D dari konsep atau referensi, mulai dari properti low poly untuk game hingga model detail untuk visualisasi produk. Tersedia tekstur, render, dan format file sesuai kebutuhan Anda.',
    fitur: ['Topologi rapi dan efisien', 'Tekstur dan material', 'Format FBX, OBJ, atau GLB'],
    paket: [
      { nama: 'Low Poly', harga: 150000, estimasi: '2 - 3 hari', isi: ['1 model sederhana', 'Warna atau tekstur dasar', '2 kali revisi'] },
      { nama: 'Mid Detail', harga: 400000, estimasi: '4 - 6 hari', isi: ['1 model detail sedang', 'Tekstur PBR', '3 render presentasi'] },
      { nama: 'High Detail', harga: 1000000, estimasi: '1 - 2 minggu', isi: ['Model detail tinggi', 'UV dan tekstur lengkap', 'Render dan turntable'] }
    ],
    tags: ['Prop', 'Karakter', 'Produk'],
    portofolio: [
      { src: 'assets/img/portofolio/model-3d/1.jpg', judul: 'Pedang Fantasi', tag: 'Prop' },
      { src: 'assets/img/portofolio/model-3d/2.jpg', judul: 'Karakter Stylized', tag: 'Karakter' },
      { src: 'assets/img/portofolio/model-3d/3.jpg', judul: 'Botol Parfum', tag: 'Produk' },
      { src: 'assets/img/portofolio/model-3d/4.jpg', judul: 'Kursi Klasik', tag: 'Prop' },
      { src: 'assets/img/portofolio/model-3d/5.jpg', judul: 'Maskot Brand', tag: 'Karakter' }
    ]
  },
  {
    id: 'polaroid',
    nama: 'Cetak Foto Polaroid',
    ikon: 'polaroid',
    ringkas: 'Cetak foto gaya polaroid dengan kertas premium dan frame custom.',
    deskripsi: 'Abadikan momen dalam cetakan bergaya polaroid yang hangat dan estetik. Dicetak dengan kertas foto premium, tersedia pilihan ukuran mini dan square, serta tulisan atau frame custom di bagian bawah foto.',
    fitur: ['Kertas foto premium tebal', 'Bisa tambah tulisan custom', 'Kemasan rapi siap jadi hadiah'],
    paket: [
      { nama: '10 Lembar', harga: 25000, estimasi: '1 hari', isi: ['10 foto ukuran mini', 'Penyesuaian warna ringan', 'Kemasan plastik klip'] },
      { nama: '25 Lembar', harga: 55000, estimasi: '1 - 2 hari', isi: ['25 foto mini atau square', 'Tulisan custom', 'Kemasan amplop kraft'] },
      { nama: '50 Lembar', harga: 100000, estimasi: '2 - 3 hari', isi: ['50 foto ukuran bebas', 'Frame dan tulisan custom', 'Box hadiah eksklusif'] }
    ],
    tags: ['Mini', 'Square', 'Custom Frame'],
    portofolio: [
      { src: 'assets/img/portofolio/polaroid/1.jpg', judul: 'Set Kenangan Wisuda', tag: 'Mini' },
      { src: 'assets/img/portofolio/polaroid/2.jpg', judul: 'Hadiah Anniversary', tag: 'Custom Frame' },
      { src: 'assets/img/portofolio/polaroid/3.jpg', judul: 'Foto Liburan', tag: 'Square' },
      { src: 'assets/img/portofolio/polaroid/4.jpg', judul: 'Dekorasi Kamar', tag: 'Mini' }
    ]
  },
  {
    id: 'stiker',
    nama: 'Cetak Stiker',
    ikon: 'sticker',
    ringkas: 'Stiker vinyl, chromo, dan die cut custom dengan potongan presisi.',
    deskripsi: 'Cetak stiker berkualitas untuk label produk, merchandise, atau koleksi pribadi. Tersedia bahan vinyl tahan air, chromo, dan transparan dengan pilihan potong kiss cut maupun die cut sesuai bentuk desain.',
    fitur: ['Bahan tahan air tersedia', 'Potongan presisi mengikuti bentuk', 'Bisa sekaligus dibuatkan desain'],
    paket: [
      { nama: 'A4 Chromo', harga: 15000, estimasi: '1 hari', isi: ['1 lembar A4 chromo', 'Potong kiss cut', 'File desain dari Anda'] },
      { nama: 'A3 Vinyl', harga: 35000, estimasi: '1 - 2 hari', isi: ['1 lembar A3 vinyl', 'Tahan air', 'Potong mengikuti bentuk'] },
      { nama: 'Die Cut', harga: 60000, estimasi: '2 - 3 hari', isi: ['Stiker satuan die cut', 'Laminasi glossy atau doff', 'Gratis bantu layout'] }
    ],
    tags: ['Vinyl', 'Chromo', 'Die Cut'],
    portofolio: [
      { src: 'assets/img/portofolio/stiker/1.jpg', judul: 'Label Produk Kopi', tag: 'Vinyl' },
      { src: 'assets/img/portofolio/stiker/2.jpg', judul: 'Stiker Karakter', tag: 'Die Cut' },
      { src: 'assets/img/portofolio/stiker/3.jpg', judul: 'Sticker Sheet', tag: 'Chromo' },
      { src: 'assets/img/portofolio/stiker/4.jpg', judul: 'Merchandise Komunitas', tag: 'Die Cut' },
      { src: 'assets/img/portofolio/stiker/5.jpg', judul: 'Label Kemasan', tag: 'Vinyl' }
    ]
  }
];
