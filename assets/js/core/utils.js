/* =========================================
   UTILITAS
   Fungsi bantu yang dipakai di banyak halaman
   ========================================= */

RV.util = {
  // Format angka ke Rupiah
  rupiah: function (n) {
    return 'Rp ' + Number(n).toLocaleString('id-ID');
  },

  // Ambil parameter dari URL, misal ?id=web-design
  param: function (name) {
    return new URLSearchParams(location.search).get(name);
  },

  // Amankan teks sebelum dimasukkan ke HTML
  esc: function (str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  },

  // Link sosial media
  waLink: function (text) {
    return 'https://wa.me/' + RV.config.whatsapp + '?text=' + encodeURIComponent(text || RV.config.pesanAwal);
  },
  igLink: function () { return 'https://instagram.com/' + RV.config.instagram; },
  igDm: function () { return 'https://ig.me/m/' + RV.config.instagram; },
  ttLink: function () { return 'https://www.tiktok.com/@' + RV.config.tiktok; },

  // Cari layanan berdasarkan id
  getLayanan: function (id) {
    return RV.layanan.find(function (l) { return l.id === id; });
  },

  // Harga paket termurah
  hargaMulai: function (l) {
    return Math.min.apply(null, l.paket.map(function (p) { return p.harga; }));
  },

  /*
    Slot gambar. Jika foto belum ada, tampil petunjuk path tempat menaruh foto.
    opsi: { label, ratio, cls, alt }
  */
  imgSlot: function (src, opsi) {
    opsi = opsi || {};
    var e = RV.util.esc;
    return '<div class="img-slot ' + (opsi.cls || '') + '" style="--ratio:' + (opsi.ratio || '4 / 3') + '">' +
      '<img src="' + e(src) + '" alt="' + e(opsi.alt || opsi.label || '') + '" loading="lazy" decoding="async" ' +
      'onload="this.parentNode.classList.add(\'is-loaded\')" ' +
      'onerror="this.parentNode.classList.add(\'is-empty\')">' +
      '<div class="img-ph">' + RV.icon('image') +
      '<strong>' + e(opsi.label || 'Tempat foto') + '</strong>' +
      '<code>' + e(src) + '</code></div>' +
      '</div>';
  },

  // Logo metode pembayaran dengan cadangan teks
  payLogo: function (m) {
    return '<span class="pay-logo" style="--brand:' + m.warna + '">' +
      '<img src="' + RV.util.esc(m.logo) + '" alt="' + RV.util.esc(m.nama) + '" ' +
      'onerror="this.parentNode.classList.add(\'is-empty\')">' +
      '<span class="pay-fallback">' + RV.util.esc(m.inisial) + '</span></span>';
  },

  // Salin teks ke clipboard
  copy: function (text, pesan) {
    var done = function () { RV.toast(pesan || 'Berhasil disalin'); };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, function () { RV.util.copyFallback(text); done(); });
    } else {
      RV.util.copyFallback(text);
      done();
    }
  },
  copyFallback: function (text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (err) { /* abaikan */ }
    ta.remove();
  },

  // Animasi angka berubah (dipakai di harga)
  tweenNumber: function (el, from, to, format, dur) {
    dur = dur || 700;
    var start = performance.now();
    function step(now) {
      var t = Math.min((now - start) / dur, 1);
      var k = 1 - Math.pow(1 - t, 3);
      el.textContent = format(Math.round(from + (to - from) * k));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
};

/* ----- Toast notifikasi ----- */
RV.toast = function (msg) {
  var el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
  }
  el.innerHTML = RV.icon('check') + '<span>' + RV.util.esc(msg) + '</span>';
  el.classList.add('is-show');
  clearTimeout(RV.toast._t);
  RV.toast._t = setTimeout(function () { el.classList.remove('is-show'); }, 2600);
};

/* ----- Lightbox untuk memperbesar gambar ----- */
RV.lightbox = (function () {
  var box, stage, cap, count, items = [], idx = 0, startX = 0;

  function build() {
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML =
      '<span class="lb-count"></span>' +
      '<button class="icon-btn lb-close" aria-label="Tutup">' + RV.icon('close') + '</button>' +
      '<button class="icon-btn lb-prev" aria-label="Sebelumnya">' + RV.icon('chevronLeft') + '</button>' +
      '<figure class="lb-figure"><div class="lb-stage"></div><figcaption class="lb-caption"></figcaption></figure>' +
      '<button class="icon-btn lb-next" aria-label="Berikutnya">' + RV.icon('chevronRight') + '</button>';
    document.body.appendChild(box);
    stage = box.querySelector('.lb-stage');
    cap = box.querySelector('.lb-caption');
    count = box.querySelector('.lb-count');

    box.querySelector('.lb-close').addEventListener('click', close);
    box.querySelector('.lb-prev').addEventListener('click', function () { go(-1); });
    box.querySelector('.lb-next').addEventListener('click', function () { go(1); });
    box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('lb-figure')) close(); });
    box.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    });
  }

  function render() {
    var it = items[idx];
    stage.classList.remove('is-ready');
    setTimeout(function () {
      stage.innerHTML = '<img src="' + RV.util.esc(it.src) + '" alt="' + RV.util.esc(it.judul || '') + '">';
      var img = stage.querySelector('img');
      img.onload = function () { stage.classList.add('is-ready'); };
      img.onerror = function () {
        stage.innerHTML = '<div class="lb-empty"><div>Foto belum tersedia.<br><small class="mono">' + RV.util.esc(it.src) + '</small></div></div>';
        stage.classList.add('is-ready');
      };
      cap.innerHTML = (it.judul ? '<strong>' + RV.util.esc(it.judul) + '</strong>' : '') + (it.tag ? '<span>' + RV.util.esc(it.tag) + '</span>' : '');
      count.textContent = items.length > 1 ? (idx + 1) + ' / ' + items.length : '';
    }, 180);
    var multi = items.length > 1;
    box.querySelector('.lb-prev').style.visibility = multi ? '' : 'hidden';
    box.querySelector('.lb-next').style.visibility = multi ? '' : 'hidden';
  }

  function go(d) {
    if (items.length < 2) return;
    idx = (idx + d + items.length) % items.length;
    render();
  }

  function open(list, i) {
    if (!box) build();
    items = list;
    idx = i || 0;
    render();
    box.classList.add('is-open');
    document.documentElement.style.overflow = 'hidden';
  }

  function close() {
    box.classList.remove('is-open');
    document.documentElement.style.overflow = '';
  }

  return { open: open, close: close };
})();
