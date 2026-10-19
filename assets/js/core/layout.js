/* =========================================
   LAYOUT
   Membuat header dan footer otomatis di setiap halaman
   agar cukup diubah di satu tempat.
   ========================================= */

RV.layout = {
  render: function () {
    var page = document.body.getAttribute('data-page') || '';
    var currentId = RV.util.param('id');
    var c = RV.config;

    // Logo: pakai gambar bila diisi di config, jika tidak pakai logo bawaan
    var mark = c.logo
      ? '<span class="brand-mark"><img src="' + c.logo + '" alt="' + c.nama + '"></span>'
      : '<span class="brand-mark">' + RV.brandMark() + '</span>';

    // Isi dropdown kategori dari data layanan
    var kategori = RV.layanan.map(function (l) {
      var aktif = page === 'layanan' && currentId === l.id ? ' is-active' : '';
      return '<a class="drop-item' + aktif + '" href="layanan/?id=' + l.id + '">' +
        '<span class="drop-icon">' + RV.icon(l.ikon) + '</span>' +
        '<span><span class="drop-name">' + l.nama + '</span>' +
        '<span class="drop-sub">Mulai ' + RV.util.rupiah(RV.util.hargaMulai(l)) + '</span></span></a>';
    }).join('');

    var lainnya = [
      { href: 'cara-pesan/', nama: 'Cara Pesan dan FAQ', sub: 'Alur pemesanan dan pertanyaan umum', ikon: 'info', key: 'cara-pesan' },
      { href: 'tos/', nama: 'Syarat dan Ketentuan', sub: 'Aturan layanan dan kerja sama', ikon: 'shield', key: 'tos' }
    ].map(function (m) {
      return '<a class="drop-item' + (page === m.key ? ' is-active' : '') + '" href="' + m.href + '">' +
        '<span class="drop-icon">' + RV.icon(m.ikon) + '</span>' +
        '<span><span class="drop-name">' + m.nama + '</span><span class="drop-sub">' + m.sub + '</span></span></a>';
    }).join('');

    function link(href, label, key) {
      return '<li><a class="nav-link' + (page === key ? ' is-active' : '') + '" href="' + href + '">' + label + '</a></li>';
    }

    var header =
      '<header class="site-header">' +
        '<div class="container header-inner">' +
          '<a class="brand" href="index.html" aria-label="' + c.nama + ' beranda">' + mark +
            '<span class="brand-text">Rayden <em>Viz</em></span></a>' +
          '<nav class="nav" aria-label="Navigasi utama"><ul class="nav-list">' +
            link('index.html', 'Home', 'home') +
            '<li class="has-drop"><button class="nav-link' + (page === 'layanan' ? ' is-active' : '') + '" aria-expanded="false">Kategori ' + RV.icon('chevronDown') + '</button>' +
              '<div class="dropdown dropdown-wide"><div class="dropdown-grid">' + kategori + '</div></div></li>' +
            link('pesanan/', 'Pesanan', 'pesanan') +
            link('pembayaran/', 'Pembayaran', 'pembayaran') +
            link('kontak/', 'Kontak', 'kontak') +
            '<li class="has-drop"><button class="nav-link' + (page === 'tos' || page === 'cara-pesan' ? ' is-active' : '') + '" aria-expanded="false">Lainnya ' + RV.icon('chevronDown') + '</button>' +
              '<div class="dropdown"><div class="dropdown-grid">' + lainnya + '</div></div></li>' +
          '</ul></nav>' +
          '<a class="btn btn-gold btn-sm header-cta" href="' + RV.util.waLink() + '" target="_blank" rel="noopener" data-magnetic>Pesan Sekarang ' + RV.icon('arrowUpRight', 'icon-diag') + '</a>' +
          '<button class="nav-toggle" aria-label="Buka menu" aria-expanded="false"><span></span><span></span></button>' +
        '</div>' +
      '</header>';

    var footer =
      '<footer class="site-footer"><div class="container footer-inner">' +
        '<span class="footer-brand">Rayden <em>Viz</em></span>' +
        '<span class="footer-copy">' + new Date().getFullYear() + ' Rayden Viz. Hak cipta dilindungi.</span>' +
        '<div class="footer-social">' +
          '<a href="' + RV.util.waLink() + '" target="_blank" rel="noopener" aria-label="WhatsApp">' + RV.icon('whatsapp') + '</a>' +
          '<a href="' + RV.util.igLink() + '" target="_blank" rel="noopener" aria-label="Instagram">' + RV.icon('instagram') + '</a>' +
          '<a href="' + RV.util.ttLink() + '" target="_blank" rel="noopener" aria-label="TikTok">' + RV.icon('tiktok') + '</a>' +
        '</div>' +
      '</div></footer>';

    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    if (h) h.outerHTML = header;
    if (f) f.outerHTML = footer;

    this.bindNav();
    this.bindLinks();
  },

  // Perilaku menu dan dropdown
  bindNav: function () {
    var root = document.documentElement;
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.nav-toggle');
    var drops = document.querySelectorAll('.has-drop');
    var isDesktop = function () { return window.innerWidth > 1080; };

    toggle.addEventListener('click', function () {
      var open = root.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
    });

    drops.forEach(function (d) {
      var btn = d.querySelector('button');
      var timer;
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = !d.classList.contains('is-open');
        drops.forEach(function (o) { if (o !== d) o.classList.remove('is-open'); });
        d.classList.toggle('is-open', open);
        btn.setAttribute('aria-expanded', open);
      });
      // Buka saat diarahkan kursor di desktop
      d.addEventListener('mouseenter', function () {
        if (!isDesktop()) return;
        clearTimeout(timer);
        drops.forEach(function (o) { if (o !== d) o.classList.remove('is-open'); });
        d.classList.add('is-open');
      });
      d.addEventListener('mouseleave', function () {
        if (!isDesktop()) return;
        timer = setTimeout(function () { d.classList.remove('is-open'); }, 160);
      });
    });

    document.addEventListener('click', function (e) {
      if (isDesktop() && !e.target.closest('.has-drop')) drops.forEach(function (d) { d.classList.remove('is-open'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        drops.forEach(function (d) { d.classList.remove('is-open'); });
        root.classList.remove('nav-open');
      }
    });

    // Header berubah saat halaman discroll
    var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 24); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  },

  // Isi otomatis link sosial media dan transisi antar halaman
  bindLinks: function () {
    var u = RV.util;
    document.querySelectorAll('[data-link]').forEach(function (a) {
      var t = a.getAttribute('data-link');
      if (t === 'wa') a.href = u.waLink(a.getAttribute('data-text'));
      if (t === 'ig') a.href = u.igLink();
      if (t === 'tt') a.href = u.ttLink();
      a.target = '_blank';
      a.rel = 'noopener';
    });
    document.querySelectorAll('[data-fill]').forEach(function (el) {
      var t = el.getAttribute('data-fill');
      if (t === 'ig') el.textContent = '@' + RV.config.instagram;
      if (t === 'tt') el.textContent = '@' + RV.config.tiktok;
      if (t === 'wa') el.textContent = '+' + RV.config.whatsapp;
      if (t === 'jam') el.textContent = RV.config.jamKerja;
      if (t === 'respon') el.textContent = RV.config.waktuRespon;
    });

    // Transisi halus saat pindah halaman
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      var href = a.getAttribute('href');
      if (!href || a.target === '_blank' || href.charAt(0) === '#' || /^(https?:|mailto:|tel:)/.test(href) || a.hasAttribute('download')) return;
      e.preventDefault();
      document.documentElement.classList.remove('nav-open');
      document.documentElement.classList.add('is-leaving');
      setTimeout(function () { location.href = href; }, 420);
    });

    // Hapus layar transisi saat kembali dengan tombol back
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) document.documentElement.classList.remove('is-leaving');
    });
  },

  // Sembunyikan loader setelah halaman siap
  hideLoader: function () {
    var root = document.documentElement;
    var first = true;
    try { first = !sessionStorage.getItem('rv-visited'); sessionStorage.setItem('rv-visited', '1'); } catch (err) { /* abaikan */ }
    var delay = first ? 650 : 120;
    var done = function () { setTimeout(function () { root.classList.remove('is-loading'); }, delay); };
    if (document.readyState === 'complete') done();
    else window.addEventListener('load', done);
    // Pengaman bila ada gambar lambat
    setTimeout(function () { root.classList.remove('is-loading'); }, 2500);
  }
};
