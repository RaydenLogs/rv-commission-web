/* =========================================
   ANIMASI
   Efek muncul saat scroll, teks per kata, pergantian kata,
   penghitung angka, efek miring 3D, tombol magnet, dan kursor.
   ========================================= */

RV.anim = (function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var io;

  // Pecah teks menjadi kata agar bisa dianimasikan satu per satu
  function splitText(el) {
    if (el.dataset.splitDone) return;
    el.dataset.splitDone = '1';
    var i = 0;
    var nodes = Array.prototype.slice.call(el.childNodes);
    el.innerHTML = '';
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { el.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span');
          w.className = 'w';
          w.innerHTML = '<span class="wi" style="--i:' + (i++) + '"></span>';
          w.firstChild.textContent = part;
          el.appendChild(w);
        });
      } else if (node.nodeName === 'BR') {
        el.appendChild(node);
      } else {
        // Elemen seperti <em> dipecah per kata dengan gaya yang sama
        node.textContent.trim().split(/\s+/).forEach(function (part, n) {
          if (n > 0) el.appendChild(document.createTextNode(' '));
          var wrap = document.createElement('span');
          wrap.className = 'w';
          var inner = document.createElement('span');
          inner.className = 'wi';
          inner.style.setProperty('--i', i++);
          var clone = node.cloneNode(false);
          clone.textContent = part;
          inner.appendChild(clone);
          wrap.appendChild(inner);
          el.appendChild(wrap);
        });
      }
    });
  }

  // Penghitung angka
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = target + suffix; return; }
    var start = performance.now(), dur = 1800;
    (function step(now) {
      var t = Math.min((now - start) / dur, 1);
      var k = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(target * k) + suffix;
      if (t < 1) requestAnimationFrame(step);
    })(start);
  }

  // Amati elemen yang masuk layar
  function scan(root) {
    root = root || document;
    if (!io) io = new IntersectionObserver(onVisible, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    root.querySelectorAll('[data-split]').forEach(splitText);
    root.querySelectorAll('[data-reveal], [data-split], [data-count], [data-progress]').forEach(function (el) {
      if (el.dataset.observed) return;
      el.dataset.observed = '1';
      io.observe(el);
    });
    root.querySelectorAll('[data-tilt]').forEach(bindTilt);
    root.querySelectorAll('[data-magnetic]').forEach(bindMagnetic);
  }

  function onVisible(entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      var el = en.target;
      el.classList.add('is-visible');
      if (el.hasAttribute('data-count')) countUp(el);
      if (el.hasAttribute('data-progress')) {
        var bar = el.querySelector('span');
        if (bar) bar.style.width = el.getAttribute('data-progress') + '%';
      }
      io.unobserve(el);
    });
  }

  // Pergantian kata dengan efek blur halus
  function rotators() {
    document.querySelectorAll('[data-rotate]').forEach(function (el) {
      var words = el.getAttribute('data-rotate').split('|');
      var i = 0;
      if (reduce || words.length < 2) return;
      setInterval(function () {
        el.classList.add('is-out');
        setTimeout(function () {
          i = (i + 1) % words.length;
          el.textContent = words[i];
          el.classList.remove('is-out');
          el.classList.add('is-in');
          void el.offsetWidth;
          el.classList.remove('is-in');
        }, 500);
      }, 2800);
    });
  }

  // Efek miring 3D mengikuti kursor
  function bindTilt(el) {
    if (el.dataset.tiltBound || !finePointer || reduce) return;
    el.dataset.tiltBound = '1';
    var max = parseFloat(el.getAttribute('data-tilt')) || 6;
    var raf;
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width;
      var py = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        el.classList.add('is-tilting');
        el.style.setProperty('--ry', ((px - 0.5) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - py) * max * 2).toFixed(2) + 'deg');
        el.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (py * 100).toFixed(1) + '%');
      });
    });
    el.addEventListener('pointerleave', function () {
      cancelAnimationFrame(raf);
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    });
  }

  // Tombol sedikit tertarik ke arah kursor
  function bindMagnetic(el) {
    if (el.dataset.magBound || !finePointer || reduce) return;
    el.dataset.magBound = '1';
    el.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), color 0.45s, border-color 0.45s, background 0.45s';
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) * 0.22;
      var y = (e.clientY - r.top - r.height / 2) * 0.32;
      el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
    el.addEventListener('pointerleave', function () { el.style.transform = ''; });
  }

  // Kursor lingkaran dan cahaya latar
  function cursor() {
    if (!finePointer || reduce) return;
    var c = document.createElement('div');
    c.className = 'cursor';
    var amb = document.createElement('div');
    amb.className = 'ambient';
    document.body.appendChild(amb);
    document.body.appendChild(c);

    var mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my, ax = mx, ay = my;
    window.addEventListener('pointermove', function (e) {
      mx = e.clientX; my = e.clientY;
      c.classList.add('is-on');
      var t = e.target;
      var view = t.closest && t.closest('[data-cursor="view"]');
      var hov = t.closest && t.closest('a, button, [data-tilt], input, select, textarea, label');
      c.classList.toggle('is-view', !!view);
      c.classList.toggle('is-hover', !view && !!hov);
      c.textContent = view ? 'LIHAT' : '';
    }, { passive: true });
    document.addEventListener('pointerleave', function () { c.classList.remove('is-on'); });
    window.addEventListener('pointerdown', function () { c.classList.add('is-down'); });
    window.addEventListener('pointerup', function () { c.classList.remove('is-down'); });

    (function loop() {
      cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
      ax += (mx - ax) * 0.05; ay += (my - ay) * 0.05;
      c.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)';
      amb.style.transform = 'translate3d(' + ax + 'px,' + ay + 'px,0)';
      requestAnimationFrame(loop);
    })();
  }

  // Gerak parallax ringan saat scroll
  function parallax() {
    var els = document.querySelectorAll('[data-parallax]');
    if (!els.length || reduce) return;
    var ticking = false;
    function update() {
      els.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax'));
        var r = el.parentElement.getBoundingClientRect();
        var offset = (r.top + r.height / 2 - innerHeight / 2) * speed;
        el.style.translate = '0 ' + offset.toFixed(1) + 'px';
      });
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  function init() {
    scan(document);
    rotators();
    cursor();
    parallax();
  }

  return { init: init, scan: scan, reduce: reduce, finePointer: finePointer };
})();
