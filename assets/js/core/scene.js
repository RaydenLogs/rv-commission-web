/* =========================================
   SCENE INTERAKTIF
   RV.scene3d  : objek 3D emas di hero (bisa diputar dengan drag)
   RV.dotField : latar titik 2D yang bereaksi terhadap kursor
   Tanpa library tambahan, digambar langsung di canvas.
   ========================================= */

RV.scene3d = function (canvas) {
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reduce = RV.anim.reduce;
  var W = 0, H = 0, dpr = 1, R = 0;

  // Normalisasi titik ke jari-jari 1
  function norm(p) { var l = Math.hypot(p[0], p[1], p[2]); return [p[0] / l, p[1] / l, p[2] / l]; }
  function edgesOf(v, maxLen) {
    var e = [];
    for (var i = 0; i < v.length; i++) for (var j = i + 1; j < v.length; j++) {
      if (Math.hypot(v[i][0] - v[j][0], v[i][1] - v[j][1], v[i][2] - v[j][2]) < maxLen) e.push([i, j]);
    }
    return e;
  }

  // Ikosahedron (bentuk utama)
  var t = (1 + Math.sqrt(5)) / 2;
  var ico = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]].map(norm);
  var icoEdges = edgesOf(ico, 1.1);

  // Kubus kecil di dalam
  var cube = [];
  [-1, 1].forEach(function (x) { [-1, 1].forEach(function (y) { [-1, 1].forEach(function (z) { cube.push([x * 0.32, y * 0.32, z * 0.32]); }); }); });
  var cubeEdges = edgesOf(cube, 0.65);

  // Bola titik di luar
  var sphere = [], N = 180, ga = Math.PI * (3 - Math.sqrt(5));
  for (var i = 0; i < N; i++) {
    var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = ga * i;
    sphere.push([Math.cos(th) * r * 1.55, y * 1.55, Math.sin(th) * r * 1.55]);
  }

  // Cincin orbit
  var ring = [];
  for (var k = 0; k < 120; k++) {
    var a = (k / 120) * Math.PI * 2;
    ring.push([Math.cos(a) * 1.95, 0, Math.sin(a) * 1.95]);
  }

  // Status putaran
  var rotX = -0.35, rotY = 0.4, velX = 0, velY = 0;
  var baseSpeed = reduce ? 0 : 0.0028;
  var tiltX = 0, tiltY = 0, targetTX = 0, targetTY = 0;
  var dragging = false, lastX = 0, lastY = 0, moved = 0, pulse = 0, time = 0;
  var running = false, visible = true;

  function rot(p, ax, ay) {
    var cy = Math.cos(ay), sy = Math.sin(ay), cx = Math.cos(ax), sx = Math.sin(ax);
    var x = p[0] * cy + p[2] * sy, z = -p[0] * sy + p[2] * cy;
    var y = p[1] * cx - z * sx; z = p[1] * sx + z * cx;
    return [x, y, z];
  }
  function proj(p, scale) {
    var D = 4.2, s = D / (D + p[2]);
    return { x: W / 2 + p[0] * R * s * scale, y: H / 2 + p[1] * R * s * scale, z: p[2], s: s };
  }

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = rect.width; H = rect.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = Math.min(W, H) * 0.24;
    if (!running) draw();
  }

  function gold(a) { return 'rgba(218,171,45,' + a.toFixed(3) + ')'; }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var ax = rotX + tiltX, ay = rotY + tiltY;
    var scale = 1 + pulse * 0.08 + Math.sin(time * 0.02) * 0.012;

    // Cahaya lembut di tengah
    var g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, R * 1.9);
    g.addColorStop(0, 'rgba(218,171,45,0.10)');
    g.addColorStop(1, 'rgba(218,171,45,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // Bola titik
    sphere.forEach(function (p) {
      var q = proj(rot(p, ax * 0.6, ay * 0.6), scale);
      var a = 0.08 + (1 - (q.z + 1.6) / 3.2) * 0.45;
      ctx.fillStyle = gold(Math.max(a, 0.05));
      ctx.beginPath();
      ctx.arc(q.x, q.y, 1.1 * q.s, 0, Math.PI * 2);
      ctx.fill();
    });

    // Cincin orbit miring
    ctx.beginPath();
    ring.forEach(function (p, i) {
      var q = proj(rot(rot(p, 0.42, time * 0.004), ax * 0.3 - 0.2, 0.3), scale);
      if (i === 0) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
    });
    ctx.closePath();
    ctx.strokeStyle = gold(0.16);
    ctx.lineWidth = 1;
    ctx.stroke();

    // Titik yang mengorbit di cincin
    var op = ring[Math.floor(time * 0.6) % ring.length];
    var oq = proj(rot(rot(op, 0.42, time * 0.004), ax * 0.3 - 0.2, 0.3), scale);
    ctx.fillStyle = gold(0.95);
    ctx.beginPath(); ctx.arc(oq.x, oq.y, 3 * oq.s, 0, Math.PI * 2); ctx.fill();

    // Kubus dalam berputar berlawanan
    var cp = cube.map(function (p) { return proj(rot(p, -ax * 1.4, -ay * 1.6), scale); });
    cubeEdges.forEach(function (e) {
      var a = cp[e[0]], b = cp[e[1]];
      ctx.strokeStyle = 'rgba(165,122,3,0.55)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    });

    // Ikosahedron utama
    var ip = ico.map(function (p) { return proj(rot(p, ax, ay), scale); });
    icoEdges.forEach(function (e) {
      var a = ip[e[0]], b = ip[e[1]];
      var depth = 1 - ((a.z + b.z) / 2 + 1) / 2;
      ctx.strokeStyle = gold(0.18 + depth * 0.7);
      ctx.lineWidth = 0.8 + depth * 0.9;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    });
    ip.forEach(function (q) {
      var depth = 1 - (q.z + 1) / 2;
      ctx.fillStyle = depth > 0.5 ? '#F6DC8F' : gold(0.5);
      ctx.beginPath(); ctx.arc(q.x, q.y, (1.6 + depth * 2) * q.s, 0, Math.PI * 2); ctx.fill();
    });
  }

  function loop() {
    if (!visible || document.hidden) { running = false; return; }
    running = true;
    time++;
    if (!dragging) {
      velY += (baseSpeed - velY) * 0.03;
      velX += (0 - velX) * 0.04;
    }
    rotY += velY; rotX += velX;
    rotX = Math.max(-1.2, Math.min(1.2, rotX));
    tiltX += (targetTX - tiltX) * 0.05;
    tiltY += (targetTY - tiltY) * 0.05;
    pulse *= 0.93;
    draw();
    requestAnimationFrame(loop);
  }
  function start() { if (!running && visible) requestAnimationFrame(loop); }

  // Interaksi drag dan klik
  canvas.addEventListener('pointerdown', function (e) {
    dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = 'grabbing';
  });
  canvas.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    targetTY = ((e.clientX - r.left) / r.width - 0.5) * 0.5;
    targetTX = -((e.clientY - r.top) / r.height - 0.5) * 0.4;
    if (!dragging) { start(); return; }
    var dx = e.clientX - lastX, dy = e.clientY - lastY;
    moved += Math.abs(dx) + Math.abs(dy);
    velY = dx * 0.006; velX = dy * 0.004;
    rotY += velY; rotX += velX;
    lastX = e.clientX; lastY = e.clientY;
    if (!running) draw();
  });
  function end() {
    if (!dragging) return;
    dragging = false;
    canvas.style.cursor = '';
    if (moved < 6) pulse = 1;
    start();
  }
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('pointerleave', function () { targetTX = 0; targetTY = 0; });

  // Hemat daya: berhenti saat tidak terlihat
  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; start(); }).observe(canvas);
  document.addEventListener('visibilitychange', start);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(canvas.parentElement);
  else window.addEventListener('resize', resize);

  resize();
  start();
};

/* ----- Latar titik 2D interaktif ----- */
RV.dotField = function (canvas) {
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var W, H, dpr, dots = [], gap = 30;
  var mx = -9999, my = -9999, active = false, raf = null, visible = true;

  function build() {
    var r = canvas.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dots = [];
    gap = W < 600 ? 24 : 30;
    for (var x = gap / 2; x < W; x += gap) for (var y = gap / 2; y < H; y += gap) dots.push({ x: x, y: y, s: 0 });
    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    var still = true;
    dots.forEach(function (d) {
      var dist = Math.hypot(d.x - mx, d.y - my);
      var target = active ? Math.max(0, 1 - dist / 160) : 0;
      d.s += (target - d.s) * 0.12;
      if (Math.abs(target - d.s) > 0.01) still = false;
      var push = d.s * 8;
      var ang = Math.atan2(d.y - my, d.x - mx);
      var x = d.x + Math.cos(ang) * push, y = d.y + Math.sin(ang) * push;
      ctx.fillStyle = 'rgba(218,171,45,' + (0.14 + d.s * 0.75).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(x, y, 0.9 + d.s * 1.8, 0, Math.PI * 2);
      ctx.fill();
    });
    return still;
  }

  function loop() {
    var still = draw();
    raf = (!still && visible) ? requestAnimationFrame(loop) : null;
  }
  function kick() { if (!raf && !RV.anim.reduce) raf = requestAnimationFrame(loop); }

  var host = canvas.parentElement;
  host.addEventListener('pointermove', function (e) {
    var r = canvas.getBoundingClientRect();
    mx = e.clientX - r.left; my = e.clientY - r.top; active = true; kick();
  });
  host.addEventListener('pointerleave', function () { active = false; kick(); });
  new IntersectionObserver(function (en) { visible = en[0].isIntersecting; }).observe(canvas);
  if ('ResizeObserver' in window) new ResizeObserver(build).observe(host);
  else window.addEventListener('resize', build);
  build();
};
