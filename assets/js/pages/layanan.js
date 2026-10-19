/* =========================================
   HALAMAN DETAIL LAYANAN
   Membaca ?id= dari alamat lalu menampilkan
   preview, info produk, paket, dan portofolio.
   ========================================= */

RV.pageInit = function () {
  var u = RV.util;
  var list = RV.layanan;
  var idx = list.findIndex(function (l) { return l.id === u.param('id'); });
  if (idx < 0) idx = 0;
  var L = list[idx];
  var paketAktif = Math.min(1, L.paket.length - 1); // paket tengah dipilih lebih dulu

  document.title = L.nama + ' | Rayden Viz';

  // Judul halaman
  document.getElementById('crumbName').textContent = L.nama;
  document.getElementById('catIndex').textContent = 'Kategori ' + String(idx + 1).padStart(2, '0') + ' dari ' + String(list.length).padStart(2, '0');
  var title = document.getElementById('catTitle');
  title.textContent = L.nama;
  title.setAttribute('data-split', '');

  // ----- Produk -----
  var paketTabs = L.paket.map(function (p, i) {
    return '<button class="pkg-tab' + (i === paketAktif ? ' is-active' : '') + '" data-i="' + i + '" role="tab" aria-selected="' + (i === paketAktif) + '">' +
      p.nama + (i === 1 ? '<span class="pkg-pop">Favorit</span>' : '') + '</button>';
  }).join('');

  document.getElementById('product').innerHTML =
    // Wadah preview
    '<div class="preview-wrap" data-reveal="left">' +
      '<div class="preview" data-tilt="4">' +
        u.imgSlot('assets/img/layanan/' + L.id + '.jpg', { label: 'Foto preview ' + L.nama, ratio: '4 / 3.4' }) +
        '<span class="sheen"></span>' +
        '<span class="preview-badge">' + RV.icon(L.ikon) + L.nama + '</span>' +
        '<button class="icon-btn preview-zoom" aria-label="Perbesar">' + RV.icon('expand') + '</button>' +
      '</div>' +
      '<div class="preview-corner c1"></div><div class="preview-corner c2"></div>' +
    '</div>' +

    // Info produk
    '<div class="info" data-reveal="right" style="--d:120ms">' +
      '<span class="badge">' + RV.icon(L.ikon) + 'Layanan Premium</span>' +
      '<h2 class="info-title">' + L.nama + '</h2>' +
      '<p class="info-desc">' + L.deskripsi + '</p>' +
      '<ul class="info-feats">' + L.fitur.map(function (f) { return '<li>' + RV.icon('check') + f + '</li>'; }).join('') + '</ul>' +

      '<div class="pkg">' +
        '<div class="pkg-tabs" role="tablist">' + paketTabs + '<span class="pkg-glider"></span></div>' +
        '<div class="pkg-body">' +
          '<div class="price-row">' +
            '<div><span class="price-label">Harga</span><strong class="price" id="price"></strong></div>' +
            '<div class="eta">' + RV.icon('clock') + '<span id="eta"></span></div>' +
          '</div>' +
          '<ul class="pkg-list" id="pkgList"></ul>' +
        '</div>' +
      '</div>' +

      '<div class="order-actions">' +
        '<a class="btn btn-gold" id="btnWa" target="_blank" rel="noopener" data-magnetic>' + RV.icon('whatsapp') + 'Pesan via WhatsApp</a>' +
        '<a class="btn btn-line" id="btnIg" href="#" data-magnetic>' + RV.icon('instagram') + 'Pesan via Instagram</a>' +
      '</div>' +
      '<p class="order-note">' + RV.icon('info') + 'Harga dapat menyesuaikan tingkat kerumitan. Konsultasi gratis sebelum pemesanan.</p>' +
    '</div>';

  // Perbesar preview
  document.querySelector('.preview-zoom').addEventListener('click', function () {
    RV.lightbox.open([{ src: 'assets/img/layanan/' + L.id + '.jpg', judul: L.nama, tag: 'Preview' }], 0);
  });

  // Ganti paket
  var priceEl = document.getElementById('price');
  var tabs = document.querySelectorAll('.pkg-tab');
  var glider = document.querySelector('.pkg-glider');
  var hargaSekarang = L.paket[paketAktif].harga;

  function pesanTeks() {
    var p = L.paket[paketAktif];
    return 'Halo Rayden Viz, saya ingin memesan:\n' +
      'Layanan: ' + L.nama + '\n' +
      'Paket: ' + p.nama + ' (' + u.rupiah(p.harga) + ')\n\n' +
      'Detail kebutuhan saya:\n';
  }

  function moveGlider() {
    var t = tabs[paketAktif];
    glider.style.width = t.offsetWidth + 'px';
    glider.style.transform = 'translateX(' + t.offsetLeft + 'px)';
  }

  function setPaket(i, animate) {
    var p = L.paket[i];
    paketAktif = i;
    tabs.forEach(function (t, n) {
      t.classList.toggle('is-active', n === i);
      t.setAttribute('aria-selected', n === i);
    });
    moveGlider();
    if (animate) u.tweenNumber(priceEl, hargaSekarang, p.harga, u.rupiah);
    else priceEl.textContent = u.rupiah(p.harga);
    hargaSekarang = p.harga;
    document.getElementById('eta').textContent = 'Estimasi ' + p.estimasi;

    var listEl = document.getElementById('pkgList');
    listEl.classList.add('swap-out');
    setTimeout(function () {
      listEl.innerHTML = p.isi.map(function (x) { return '<li>' + x + '</li>'; }).join('');
      listEl.classList.remove('swap-out');
    }, animate ? 220 : 0);

    document.getElementById('btnWa').href = u.waLink(pesanTeks());
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { setPaket(Number(t.dataset.i), true); });
  });
  window.addEventListener('resize', moveGlider);
  setPaket(paketAktif, false);
  // Posisikan ulang setelah huruf selesai dimuat
  if (document.fonts) document.fonts.ready.then(moveGlider);

  // Instagram tidak mendukung pesan otomatis, jadi pesan disalin dulu
  document.getElementById('btnIg').addEventListener('click', function (e) {
    e.preventDefault();
    u.copy(pesanTeks(), 'Pesan disalin. Tempel di DM Instagram.');
    setTimeout(function () { window.open(u.igDm(), '_blank', 'noopener'); }, 700);
  });

  // ----- Portofolio -----
  var porto = L.portofolio || [];
  var aktifTag = 'Semua';
  var ratios = ['4 / 5', '1 / 1', '3 / 4', '16 / 10', '4 / 3', '2 / 3'];
  document.getElementById('portoTitle').innerHTML = 'Karya <em class="text-gold">' + L.nama + '</em>';
  document.getElementById('portoTitle').setAttribute('data-split', '');

  var filterEl = document.getElementById('portoFilter');
  var tags = ['Semua'].concat((L.tags || []).filter(function (t) {
    return porto.some(function (p) { return p.tag === t; });
  }));
  filterEl.innerHTML = tags.length > 2 ? tags.map(function (t) {
    var n = t === 'Semua' ? porto.length : porto.filter(function (p) { return p.tag === t; }).length;
    return '<button class="chip' + (t === aktifTag ? ' is-active' : '') + '" data-tag="' + u.esc(t) + '">' + u.esc(t) + '<span class="count">' + n + '</span></button>';
  }).join('') : '';

  var grid = document.getElementById('portoGrid');

  function tampil() {
    return aktifTag === 'Semua' ? porto : porto.filter(function (p) { return p.tag === aktifTag; });
  }

  function renderPorto() {
    var data = tampil();
    if (!data.length) {
      grid.innerHTML = '<div class="empty-state"><h3>Portofolio segera hadir</h3><p>Karya untuk kategori ini sedang disiapkan.</p></div>';
      return;
    }
    grid.innerHTML = data.map(function (p, i) {
      var nomorAsli = porto.indexOf(p);
      return '<a class="masonry-item" href="' + u.esc(p.src) + '" data-i="' + i + '" data-reveal style="--d:' + (i % 3) * 80 + 'ms" data-cursor="view" aria-label="Lihat ' + u.esc(p.judul || 'karya') + '">' +
        u.imgSlot(p.src, { label: p.judul, ratio: ratios[nomorAsli % ratios.length] }) +
        '<span class="masonry-meta"><strong>' + u.esc(p.judul || '') + '</strong>' + (p.tag ? '<span>' + u.esc(p.tag) + '</span>' : '') + '</span>' +
        '</a>';
    }).join('');
    RV.anim.scan(grid);
  }

  grid.addEventListener('click', function (e) {
    var item = e.target.closest('.masonry-item');
    if (!item) return;
    e.preventDefault();
    RV.lightbox.open(tampil(), Number(item.dataset.i));
  });

  filterEl.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip');
    if (!chip || chip.dataset.tag === aktifTag) return;
    aktifTag = chip.dataset.tag;
    filterEl.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('is-active', c === chip); });
    grid.classList.add('swap-out');
    setTimeout(function () { renderPorto(); grid.classList.remove('swap-out'); }, 300);
  });

  renderPorto();

  // ----- Kategori sebelum dan sesudah -----
  var prev = list[(idx - 1 + list.length) % list.length];
  var next = list[(idx + 1) % list.length];
  document.getElementById('catNav').innerHTML =
    '<a class="cat-link prev" href="?id=' + prev.id + '" data-reveal="left">' +
      '<span class="cat-arrow">' + RV.icon('arrowRight') + '</span>' +
      '<span><small>Sebelumnya</small><strong>' + prev.nama + '</strong></span></a>' +
    '<a class="cat-link next" href="?id=' + next.id + '" data-reveal="right">' +
      '<span><small>Berikutnya</small><strong>' + next.nama + '</strong></span>' +
      '<span class="cat-arrow">' + RV.icon('arrowRight') + '</span></a>';
};
