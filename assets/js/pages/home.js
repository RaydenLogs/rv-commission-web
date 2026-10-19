/* =========================================
   HALAMAN HOME
   Mengisi kartu layanan, teks berjalan, keunggulan,
   alur kerja, dan karya pilihan.
   ========================================= */

RV.pageInit = function () {
  var u = RV.util;

  // Kartu layanan
  document.getElementById('serviceGrid').innerHTML = RV.layanan.map(function (l, i) {
    return '<a class="service-card" href="layanan.html?id=' + l.id + '" data-reveal style="--d:' + (i % 4) * 90 + 'ms">' +
      '<div class="service-inner" data-tilt="5">' +
        '<span class="sheen"></span>' +
        '<span class="service-num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="service-icon">' + RV.icon(l.ikon) + '</span>' +
        '<h3>' + l.nama + '</h3>' +
        '<p>' + l.ringkas + '</p>' +
        '<span class="service-foot"><span>Mulai <b>' + u.rupiah(u.hargaMulai(l)) + '</b></span>' +
        '<span class="service-arrow">' + RV.icon('arrowUpRight') + '</span></span>' +
      '</div></a>';
  }).join('');

  // Teks berjalan (diulang dua kali agar menyambung)
  var items = RV.layanan.map(function (l) {
    return '<span class="marquee-item">' + l.nama + RV.icon('diamond') + '</span>';
  }).join('');
  document.getElementById('marqueeTrack').innerHTML = items + items;

  // Keunggulan
  var why = [
    { ikon: 'target', judul: 'Detail yang presisi', isi: 'Setiap elemen ditempatkan dengan alasan. Tidak ada yang asal jadi, dari jarak huruf hingga sudut cahaya.' },
    { ikon: 'refresh', judul: 'Revisi yang terarah', isi: 'Kuota revisi jelas di setiap paket, dengan pratinjau berkala agar hasil akhir sesuai harapan Anda.' },
    { ikon: 'clock', judul: 'Tepat waktu', isi: 'Estimasi pengerjaan disampaikan sejak awal dan progres bisa dipantau langsung di halaman Pesanan.' },
    { ikon: 'file', judul: 'File lengkap dan rapi', isi: 'Anda menerima file final dalam format yang dibutuhkan, tersusun rapi dan siap digunakan.' }
  ];
  document.getElementById('whyList').innerHTML = why.map(function (w, i) {
    return '<div class="why-item" data-reveal style="--d:' + i * 80 + 'ms">' +
      '<span class="why-num">0' + (i + 1) + '</span>' +
      '<div><h3>' + RV.icon(w.ikon) + w.judul + '</h3><p>' + w.isi + '</p></div></div>';
  }).join('');

  // Alur kerja
  var steps = [
    { judul: 'Konsultasi', isi: 'Hubungi kami dan ceritakan kebutuhan, referensi, serta tenggat Anda.' },
    { judul: 'Pembayaran DP', isi: 'Setelah harga disepakati, bayar uang muka untuk masuk antrean.' },
    { judul: 'Pengerjaan', isi: 'Karya dikerjakan dengan pratinjau dan revisi sesuai paket.' },
    { judul: 'Serah terima', isi: 'Pelunasan lalu file final atau produk cetak dikirimkan.' }
  ];
  var proc = document.getElementById('process');
  proc.setAttribute('data-reveal', 'fade');
  proc.insertAdjacentHTML('beforeend', steps.map(function (s, i) {
    return '<div class="step" data-reveal style="--d:' + (i * 140 + 200) + 'ms">' +
      '<span class="step-dot">' + (i + 1) + '</span>' +
      '<div><h3>' + s.judul + '</h3><p>' + s.isi + '</p></div></div>';
  }).join(''));

  // Karya pilihan: foto pertama dari setiap kategori
  var ratios = ['4 / 5', '1 / 1', '3 / 4', '4 / 3', '2 / 3', '5 / 4', '3 / 4', '1 / 1'];
  document.getElementById('showcase').innerHTML = RV.layanan.map(function (l, i) {
    var p = l.portofolio[0] || { src: 'assets/img/layanan/' + l.id + '.jpg', judul: l.nama };
    return '<a class="show-item" href="layanan.html?id=' + l.id + '" data-reveal style="--d:' + (i % 4) * 80 + 'ms" data-cursor="view">' +
      u.imgSlot(p.src, { label: p.judul, ratio: ratios[i % ratios.length] }) +
      '<div class="show-meta"><div><span>' + l.nama + '</span><strong>' + u.esc(p.judul) + '</strong></div></div></a>';
  }).join('');

  // Objek 3D
  RV.scene3d(document.getElementById('hero3d'));
};
