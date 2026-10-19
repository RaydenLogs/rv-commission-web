/* =========================================
  DATA PESANAN
  Gabungan semua data pesanan per status.
  ========================================= */

window.RV = window.RV || {};

RV.pesananDiperbarui = "17 Oktober 2026";

RV.pesanan = [].concat(
  RV.pesananProses || [],
  RV.pesananRevisi || [],
  RV.pesananDitunda || [],
  RV.pesananAntre || [],
  RV.pesananSelesai || []
);