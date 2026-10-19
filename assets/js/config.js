/* =========================================
   PENGATURAN UTAMA
   Ubah kontak, sosial media, dan data pembayaran di file ini saja.
   ========================================= */

window.RV = window.RV || {};

RV.config = {
  nama: 'Rayden Viz',
  tagline: 'Studio Kreatif Digital',

  // Logo opsional. Isi dengan path gambar, misal 'assets/img/logo/logo.png'.
  // Biarkan kosong untuk memakai logo bawaan.
  logo: 'assets/img/logo/logo.png',

  // Nomor WhatsApp format 62 tanpa tanda plus, spasi, atau strip
  whatsapp: '6285657210492',

  // Username tanpa tanda @
  instagram: 'rayden.viz',
  tiktok: 'rayden.viz',

  jamKerja: 'Setiap Hari, 09.00 - 21.00 WITA',
  waktuRespon: 'Rata-rata membalas dalam 1 jam',

  // Pesan pembuka saat tombol WhatsApp umum diklik
  pesanAwal: 'Halo Rayden Viz, saya ingin konsultasi mengenai sebuah proyek.',

  // Data pembayaran
  pembayaran: {
    // Taruh gambar QRIS di path ini
    qris: 'assets/img/pembayaran/qris.png',
    qrisNama: 'Rayden Viz, Digital & Kreatif',

    ewallet: [
      {
        nama: 'GoPay',
        nomor: '082292497593',
        atasNama: 'Muh Rayhan S',
        logo: 'assets/img/pembayaran/gopay.png',
        warna: '#00AED6', // warna cadangan bila logo belum ada
        inisial: 'GoPay'
      },
      {
        nama: 'DANA',
        nomor: '082292497593',
        atasNama: 'Muh Rayhan S',
        logo: 'assets/img/pembayaran/dana.png',
        warna: '#118EEA',
        inisial: 'DANA'
      }
    ],

    bank: [
      {
        nama: 'Bank BRI',
        nomor: '4940 0101 8176 500',
        atasNama: 'Muh Rayhan S',
        logo: 'assets/img/pembayaran/bri.png',
        warna: '#00529C',
        inisial: 'BRI'
      }
    ],

    // Mitra pembayaran tunai. Tambah atau hapus sesuai kebutuhan.
    cash: [
      {
        mitra: 'Mitra Satu',
        alamat: 'Jl. Contoh Raya No. 12, Kota Anda',
        jam: 'Setiap hari, 10.00 - 20.00',
        maps: 'https://maps.google.com/?q=Monas+Jakarta',
        foto: 'assets/img/mitra/mitra-1.jpg'
      },
      {
        mitra: 'Mitra Dua',
        alamat: 'Jl. Contoh Kedua No. 8, Kota Anda',
        jam: 'Senin sampai Sabtu, 09.00 - 17.00',
        maps: 'https://maps.google.com/?q=Monas+Jakarta',
        foto: 'assets/img/mitra/mitra-2.jpg'
      }
    ]
  }
};
