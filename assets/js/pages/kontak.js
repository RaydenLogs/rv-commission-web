/* =========================================
   HALAMAN KONTAK
   Form menyusun pesan lalu membuka WhatsApp atau Instagram.
   ========================================= */

RV.pageInit = function () {
  var u = RV.util;
  var select = document.getElementById('fLayanan');
  var pilih = u.param('layanan');

  select.innerHTML = RV.layanan.map(function (l) {
    return '<option value="' + l.id + '"' + (l.id === pilih ? ' selected' : '') + '>' + l.nama + '</option>';
  }).join('') + '<option value="lainnya">Lainnya</option>';

  var form = document.getElementById('contactForm');
  var err = document.getElementById('formError');

  function susunPesan() {
    var nama = form.nama.value.trim();
    var detail = form.pesan.value.trim();
    if (!nama || !detail) {
      err.textContent = 'Mohon isi nama dan detail kebutuhan terlebih dahulu.';
      (!nama ? form.nama : form.pesan).focus();
      return null;
    }
    err.textContent = '';
    var l = u.getLayanan(form.layanan.value);
    return 'Halo Rayden Viz, saya ' + nama + '.\n' +
      'Layanan: ' + (l ? l.nama : 'Lainnya') + '\n' +
      (form.budget.value.trim() ? 'Budget: ' + form.budget.value.trim() + '\n' : '') +
      '\nDetail kebutuhan:\n' + detail;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var teks = susunPesan();
    if (teks) window.open(u.waLink(teks), '_blank', 'noopener');
  });

  document.getElementById('sendIg').addEventListener('click', function () {
    var teks = susunPesan();
    if (!teks) return;
    u.copy(teks, 'Pesan disalin. Tempel di DM Instagram.');
    setTimeout(function () { window.open(u.igDm(), '_blank', 'noopener'); }, 700);
  });
};
