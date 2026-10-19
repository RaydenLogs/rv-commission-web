/* =========================================
   HALAMAN INFO (Cara Pesan, FAQ, dan ToS)
   Akordeon FAQ dan daftar isi otomatis untuk ToS.
   ========================================= */

RV.pageInit = function () {
  // Akordeon: hanya satu yang terbuka
  var items = document.querySelectorAll('.acc-item');
  items.forEach(function (item) {
    var head = item.querySelector('.acc-head');
    head.addEventListener('click', function () {
      var open = !item.classList.contains('is-open');
      items.forEach(function (o) {
        o.classList.remove('is-open');
        o.querySelector('.acc-head').setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('is-open', open);
      head.setAttribute('aria-expanded', open);
    });
  });

  // Daftar isi ToS dibuat dari judul setiap bagian
  var toc = document.getElementById('tocNav');
  if (!toc) return;
  var blocks = document.querySelectorAll('.tos-block');
  toc.innerHTML = Array.prototype.map.call(blocks, function (b) {
    var h = b.querySelector('h2');
    var num = h.querySelector('span').textContent;
    var judul = h.textContent.replace(num, '');
    return '<a href="#' + b.id + '"><span>' + num + '</span>' + judul + '</a>';
  }).join('');

  // Tandai bagian yang sedang dibaca
  var links = toc.querySelectorAll('a');
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      links.forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id); });
    });
  }, { rootMargin: '-35% 0px -60% 0px' });
  blocks.forEach(function (b) { spy.observe(b); });
};
