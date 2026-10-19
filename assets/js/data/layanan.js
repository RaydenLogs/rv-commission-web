/* =========================================
  DATA LAYANAN
  Setiap layanan di sini otomatis tampil di menu Kategori,
  halaman Home, dan halaman detail layanan.

  File data per layanan dipisah ke:
  assets/js/data/list-layanan/*.js
   ========================================= */

window.RV = window.RV || {};

RV.layanan = [].concat(
  RV.layananDesainGrafis || [],
  RV.layananPhotoEditing || [],
  RV.layananWebDesign || [],
  RV.layananAppDesign || [],
  RV.layananRoblox || [],
  RV.layananModel3d || [],
  RV.layananPolaroid || [],
  RV.layananStiker || []
);
