const STORAGE_KEY = "katalog_keranjang";

/**
 * Mengambil daftar produk di keranjang dari localStorage.
 * Mengembalikan array kosong jika terjadi error atau localStorage tidak tersedia.
 */
export function ambilKeranjang() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Menyimpan daftar produk ke localStorage dan memancarkan event agar komponen lain tersinkronisasi.
 */
export function simpanKeranjang(items) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("keranjang-updated"));
  } catch {
    // Abaikan jika localStorage tidak tersedia atau kuota penuh
  }
}

/**
 * Menambahkan produk ke keranjang belanja.
 * Hanya menyimpan id, nama, harga, dan jumlah.
 */
export function tambahKeKeranjang(produk, jumlah = 1) {
  if (!produk || !produk.id) return;
  try {
    const items = ambilKeranjang();
    const index = items.findIndex((item) => String(item.id) === String(produk.id));

    if (index >= 0) {
      items[index].jumlah = (Number(items[index].jumlah) || 1) + jumlah;
    } else {
      items.push({
        id: produk.id,
        nama: produk.nama,
        harga: Number(produk.harga) || 0,
        jumlah: jumlah,
      });
    }

    simpanKeranjang(items);
  } catch {
    // Tangani error dengan aman
  }
}

/**
 * Mengubah jumlah produk di keranjang (+1 atau -1).
 * Jika jumlah mencapai 0 atau kurang, item akan dihapus dari keranjang.
 */
export function ubahJumlah(id, delta) {
  try {
    const items = ambilKeranjang();
    const index = items.findIndex((item) => String(item.id) === String(id));

    if (index >= 0) {
      const jumlahBaru = (Number(items[index].jumlah) || 1) + delta;
      if (jumlahBaru <= 0) {
        items.splice(index, 1);
      } else {
        items[index].jumlah = jumlahBaru;
      }
      simpanKeranjang(items);
    }
  } catch {
    // Tangani error dengan aman
  }
}

/**
 * Menghapus produk dari keranjang berdasarkan ID.
 */
export function hapusItem(id) {
  try {
    const items = ambilKeranjang().filter((item) => String(item.id) !== String(id));
    simpanKeranjang(items);
  } catch {
    // Tangani error dengan aman
  }
}

/**
 * Menghitung total seluruh jumlah barang di keranjang.
 */
export function hitungTotalBarang(items = []) {
  return items.reduce((total, item) => total + (Number(item.jumlah) || 0), 0);
}

/**
 * Menghitung total harga belanja di keranjang.
 */
export function hitungTotalHarga(items = []) {
  return items.reduce(
    (total, item) => total + (Number(item.harga) || 0) * (Number(item.jumlah) || 0),
    0
  );
}

