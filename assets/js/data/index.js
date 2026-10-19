/* =========================================
  DATA PESANAN
  Gabungan semua data pesanan per status.
  ========================================= */

window.RV = window.RV || {};

RV.pesananDiperbarui = "17 Oktober 2026";

RV.serviceInitials = {
  "desain-grafis": "DG",
  "photo-editing": "PE",
  "web-design": "WD",
  "app-design": "AD",
  "roblox": "RB",
  "model-3d": "M3",
  "polaroid": "PL",
  "stiker": "ST"
};

function parseTanggalMasuk(value) {
  if (!value || typeof value !== 'string') return 0;
  var bulan = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, Mei: 4, Jun: 5,
    Jul: 6, Agu: 7, Sep: 8, Okt: 9, Nov: 10, Des: 11
  };
  var match = value.match(/(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/);
  if (!match) return 0;
  var hari = Number(match[1]);
  var namaBulan = match[2];
  var tahun = Number(match[3]);
  var indeksBulan = bulan[namaBulan] !== undefined ? bulan[namaBulan] : 0;
  return new Date(tahun, indeksBulan, hari).getTime();
}

RV.maskNamaKlien = function (nama) {
  if (!nama || typeof nama !== 'string') return '-';
  var value = nama.trim();
  if (!value) return '-';
  var parts = value.split(/\s+/);
  if (parts.length === 1) {
    var single = parts[0];
    if (single.length <= 2) return single.charAt(0) + '*';
    return single.slice(0, 2) + '*'.repeat(Math.max(2, single.length - 3)) + single.slice(-1);
  }

  var first = parts[0].replace(/[^A-Za-z]/g, '');
  var last = parts[parts.length - 1].replace(/[^A-Za-z]/g, '');

  if (!first && !last) return value.slice(0, 2) + '***';
  if (!first) return '***' + last.slice(-2);
  if (!last) return first.slice(0, 2) + '***';

  return first.slice(0, 2) + '***' + last.slice(-1);
};

RV.generateKodePesanan = function (order, nomorUrut) {
  var layanan = order && order.layanan ? order.layanan : 'lainnya';
  var awal = RV.serviceInitials[layanan] || 'OT';
  var t = parseTanggalMasuk(order && order.masuk ? order.masuk : '');
  var date = new Date(t);
  if (!date || isNaN(date.getTime())) return 'RV-' + awal + '-0000-000';

  var tahun = String(date.getFullYear()).slice(2, 4);
  var bulan = String(date.getMonth() + 1).padStart(2, '0');
  var urut = String(nomorUrut).padStart(3, '0');
  return 'RV-' + awal + '-' + tahun + bulan + '-' + urut;
};

var kelompokStatus = [
  { key: 'proses', items: RV.pesananProses || [] },
  { key: 'revisi', items: RV.pesananRevisi || [] },
  { key: 'ditunda', items: RV.pesananDitunda || [] },
  { key: 'antre', items: RV.pesananAntre || [] },
  { key: 'selesai', items: RV.pesananSelesai || [] }
];

RV.pesanan = [];
kelompokStatus.forEach(function (group) {
  (group.items || []).forEach(function (order) {
    if (!order) return;
    order.status = group.key;
    order.estimasi = group.key === 'ditunda' ? '-' : (order.estimasi || '-');
    order.klien = RV.maskNamaKlien(order.klien);
    RV.pesanan.push(order);
  });
});

var semuaKelompok = {};
RV.pesanan = RV.pesanan.map(function (order) {
  if (!order) return order;
  var tanggal = new Date(parseTanggalMasuk(order.masuk) || Date.now());
  var key = (order.layanan || 'lainnya') + '-' + tanggal.getFullYear() + '-' + String(tanggal.getMonth() + 1).padStart(2, '0');
  semuaKelompok[key] = (semuaKelompok[key] || 0) + 1;
  order.kode = RV.generateKodePesanan(order, semuaKelompok[key]);
  return order;
});

var statusUrutan = ['proses', 'revisi', 'ditunda', 'antre', 'selesai'];
var statusIndex = {};
statusUrutan.forEach(function (status, index) {
  statusIndex[status] = index;
});

RV.pesanan.sort(function (a, b) {
  var statusA = a && a.status ? a.status : 'lainnya';
  var statusB = b && b.status ? b.status : 'lainnya';
  var urutA = statusIndex[statusA] !== undefined ? statusIndex[statusA] : statusUrutan.length;
  var urutB = statusIndex[statusB] !== undefined ? statusIndex[statusB] : statusUrutan.length;

  if (urutA !== urutB) return urutA - urutB;

  return parseTanggalMasuk(b && b.masuk ? b.masuk : '') - parseTanggalMasuk(a && a.masuk ? a.masuk : '');
});