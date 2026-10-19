/* =========================================
   HALAMAN PESANAN
   Menampilkan data dari assets/js/data/pesanan.js
   dengan pencarian dan filter status.
   ========================================= */

RV.pageInit = function () {
  var u = RV.util;
  var data = RV.pesanan || [];
  var statusInfo = {
    antre: { label: 'Dalam Antrean' },
    proses: { label: 'Dikerjakan' },
    revisi: { label: 'Tahap Revisi' },
    selesai: { label: 'Selesai' }
  };
  var filter = 'semua';
  var keyword = '';

  document.getElementById('orderUpdated').textContent = RV.pesananDiperbarui || '-';

  // Ringkasan jumlah
  var hitung = function (s) { return data.filter(function (d) { return d.status === s; }).length; };
  document.getElementById('orderStats').innerHTML = Object.keys(statusInfo).map(function (key, i) {
    return '<div class="stat-card status-' + key + '" data-reveal style="--d:' + i * 80 + 'ms">' +
      '<span class="stat-num" data-count="' + hitung(key) + '">0</span>' +
      '<span class="stat-label"><i></i>' + statusInfo[key].label + '</span></div>';
  }).join('');

  // Tombol filter
  var filterEl = document.getElementById('orderFilter');
  var opsi = [{ key: 'semua', label: 'Semua' }].concat(Object.keys(statusInfo).map(function (k) {
    return { key: k, label: statusInfo[k].label };
  }));
  filterEl.innerHTML = opsi.map(function (o) {
    return '<button class="chip' + (o.key === filter ? ' is-active' : '') + '" data-key="' + o.key + '">' + o.label + '</button>';
  }).join('');

  var listEl = document.getElementById('orderList');

  function cocok(d) {
    if (filter !== 'semua' && d.status !== filter) return false;
    if (!keyword) return true;
    var l = u.getLayanan(d.layanan);
    var teks = [d.kode, d.klien, d.detail, l ? l.nama : ''].join(' ').toLowerCase();
    return teks.indexOf(keyword) > -1;
  }

  function render() {
    var hasil = data.filter(cocok);
    if (!hasil.length) {
      listEl.innerHTML = '<div class="empty-state"><h3>Pesanan tidak ditemukan</h3><p>Periksa kembali kode pesanan Anda atau hubungi kami.</p></div>';
      return;
    }
    listEl.innerHTML = hasil.map(function (d, i) {
      var l = u.getLayanan(d.layanan) || { nama: d.layanan, ikon: 'diamond' };
      var s = statusInfo[d.status] || { label: d.status };
      var live = d.status === 'proses' || d.status === 'revisi' ? ' is-live' : '';
      return '<article class="order-card" data-reveal style="--d:' + Math.min(i, 6) * 60 + 'ms">' +
        '<div class="oc-main">' +
          '<span class="oc-icon">' + RV.icon(l.ikon) + '</span>' +
          '<div class="oc-text">' +
            '<span class="oc-code mono">' + u.esc(d.kode) + '</span>' +
            '<h3>' + u.esc(d.detail) + '</h3>' +
            '<span class="oc-sub">' + u.esc(l.nama) + ' <i></i> ' + u.esc(d.klien) + '</span>' +
          '</div>' +
        '</div>' +
        '<div class="oc-dates">' +
          '<span><small>Masuk</small>' + u.esc(d.masuk) + '</span>' +
          '<span><small>Estimasi</small>' + u.esc(d.estimasi) + '</span>' +
        '</div>' +
        '<div class="oc-status">' +
          '<div class="oc-status-top"><span class="status status-' + d.status + live + '">' + s.label + '</span><b>' + d.progres + '%</b></div>' +
          '<div class="progress" data-progress="' + d.progres + '"><span></span></div>' +
        '</div>' +
      '</article>';
    }).join('');
    RV.anim.scan(listEl);
  }

  filterEl.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;
    filter = chip.dataset.key;
    filterEl.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('is-active', c === chip); });
    listEl.classList.add('swap-out');
    setTimeout(function () { render(); listEl.classList.remove('swap-out'); }, 280);
  });

  var timer;
  document.getElementById('orderSearch').addEventListener('input', function (e) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      keyword = e.target.value.trim().toLowerCase();
      render();
    }, 200);
  });

  render();
};
