/* =========================================
   HALAMAN PEMBAYARAN
   Data diambil dari RV.config.pembayaran (config.js)
   ========================================= */

RV.pageInit = function () {
  var u = RV.util;
  var pay = RV.config.pembayaran;

  // Wadah QRIS
  document.getElementById('qrisCard').innerHTML =
    '<span class="sheen"></span>' +
    '<div class="qris-top"><span class="qris-label">' + RV.icon('qr') + 'QRIS</span><span class="qris-hint">Semua e-wallet dan m-banking</span></div>' +
    '<button class="qris-frame" id="qrisZoom" aria-label="Perbesar QRIS" data-cursor="view">' +
      u.imgSlot(pay.qris, { label: 'Gambar QRIS', ratio: '1 / 1', cls: 'fit-contain' }) +
      '<span class="qris-scan" aria-hidden="true"></span>' +
    '</button>' +
    '<div class="qris-bottom">' +
      '<div><small>Atas nama</small><strong>' + u.esc(pay.qrisNama) + '</strong></div>' +
      '<a class="icon-btn" href="' + u.esc(pay.qris) + '" download aria-label="Unduh QRIS">' + RV.icon('download') + '</a>' +
    '</div>';

  document.getElementById('qrisZoom').addEventListener('click', function () {
    RV.lightbox.open([{ src: pay.qris, judul: 'QRIS ' + pay.qrisNama, tag: 'Scan untuk membayar' }], 0);
  });

  // Baris metode transfer
  function baris(m, i) {
    return '<div class="pay-item" style="--d:' + i * 80 + 'ms">' +
      u.payLogo(m) +
      '<div class="pay-info">' +
        '<span class="pay-name">' + u.esc(m.nama) + '</span>' +
        '<span class="copy-num mono">' + u.esc(m.nomor) + '</span>' +
        '<span class="pay-owner">a.n. ' + u.esc(m.atasNama) + '</span>' +
      '</div>' +
      '<button class="copy-btn" data-copy="' + u.esc(m.nomor.replace(/\s/g, '')) + '" aria-label="Salin nomor ' + u.esc(m.nama) + '">' +
        RV.icon('copy') + '<span>Salin</span></button>' +
    '</div>';
  }
  document.getElementById('ewalletList').innerHTML = pay.ewallet.map(baris).join('');
  document.getElementById('bankList').innerHTML = pay.bank.map(baris).join('');

  // Tombol salin
  document.querySelectorAll('.copy-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      u.copy(b.dataset.copy, 'Nomor disalin');
      b.classList.add('is-done');
      b.querySelector('span').textContent = 'Tersalin';
      setTimeout(function () {
        b.classList.remove('is-done');
        b.querySelector('span').textContent = 'Salin';
      }, 2000);
    });
  });

  // Mitra tunai
  document.getElementById('cashList').innerHTML = pay.cash.map(function (c, i) {
    return '<article class="cash-card" data-reveal style="--d:' + i * 100 + 'ms">' +
      '<div class="cash-photo">' + u.imgSlot(c.foto, { label: 'Foto lokasi ' + c.mitra, ratio: '16 / 9' }) + '</div>' +
      '<div class="cash-body">' +
        '<span class="cash-tag">' + RV.icon('cash') + 'Mitra Tunai</span>' +
        '<h3>' + u.esc(c.mitra) + '</h3>' +
        '<p>' + RV.icon('pin') + u.esc(c.alamat) + '</p>' +
        '<p>' + RV.icon('clock') + u.esc(c.jam) + '</p>' +
        '<a class="link-arrow" href="' + u.esc(c.maps) + '" target="_blank" rel="noopener">Buka di peta ' + RV.icon('arrowRight') + '</a>' +
      '</div></article>';
  }).join('');

  // Konfirmasi lewat WhatsApp
  document.getElementById('btnConfirm').href = u.waLink(
    'Halo Rayden Viz, saya sudah melakukan pembayaran.\n' +
    'Kode pesanan: \n' +
    'Nama: \n' +
    'Metode: \n' +
    'Nominal: \n\n' +
    'Bukti pembayaran saya lampirkan.'
  );
};
