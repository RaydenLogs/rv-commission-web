/* =========================================
   BOOT
   Dijalankan paling akhir di setiap halaman.
   Urutan: header dan footer, isi halaman, lalu animasi.
   ========================================= */

(function () {
  RV.layout.render();
  if (typeof RV.pageInit === 'function') RV.pageInit();
  RV.anim.init();
  document.querySelectorAll('canvas.dot-field').forEach(RV.dotField);
  RV.layout.hideLoader();
})();
