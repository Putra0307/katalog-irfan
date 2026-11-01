"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Tombol from "@/components/Tombol";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";
import {
  ambilKeranjang,
  ubahJumlah,
  hapusItem,
  hitungTotalHarga,
} from "@/lib/keranjang";

export default function HalamanKeranjang() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const perbaruiKeranjang = () => {
      setItems(ambilKeranjang());
    };

    perbaruiKeranjang();
    window.addEventListener("keranjang-updated", perbaruiKeranjang);
    window.addEventListener("storage", perbaruiKeranjang);

    return () => {
      window.removeEventListener("keranjang-updated", perbaruiKeranjang);
      window.removeEventListener("storage", perbaruiKeranjang);
    };
  }, []);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Keranjang belanja</h1>
        <p className="text-teks-lembut">Keranjang masih kosong</p>
        <Tombol href="/">Lihat produk</Tombol>
      </div>
    );
  }

  const totalHarga = hitungTotalHarga(items);
  const nomorWa = toko.nomorWhatsApp
    ? String(toko.nomorWhatsApp).replace(/[^0-9]/g, "")
    : "";

  const rincianProduk = items
    .map(
      (item, index) =>
        `${index + 1}. ${item.nama} - ${item.jumlah} x ${formatRupiah(item.harga)} = ${formatRupiah(
          item.harga * item.jumlah
        )}`
    )
    .join("\n");

  const pesanWa = `Halo ${toko.nama}, saya ingin memesan produk berikut dari keranjang belanja:\n\n${rincianProduk}\n\nTotal: ${formatRupiah(
    totalHarga
  )}\n\nTerima kasih.`;

  const waHref = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesanWa)}`;

  return (
    <div className="flex flex-col gap-8 py-8 md:py-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold sm:text-3xl">Keranjang belanja</h1>
        <Link
          href="/"
          className="text-sm text-teks-lembut underline underline-offset-4 hover:text-utama"
        >
          Lanjut belanja
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-garis bg-latar">
        <div className="divide-y divide-garis">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <Link
                  href={`/produk/${item.id}`}
                  className="font-semibold text-teks hover:text-utama"
                >
                  {item.nama}
                </Link>
                <p className="mt-0.5 text-sm text-teks-lembut">
                  {formatRupiah(item.harga)}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 sm:justify-end sm:gap-6">
                <div className="flex items-center gap-1 rounded-lg border border-garis bg-permukaan p-1">
                  <button
                    type="button"
                    onClick={() => ubahJumlah(item.id, -1)}
                    aria-label={`Kurangi jumlah ${item.nama}`}
                    className="flex h-7 w-7 items-center justify-center rounded text-base font-bold text-teks hover:bg-latar"
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold">
                    {item.jumlah}
                  </span>
                  <button
                    type="button"
                    onClick={() => ubahJumlah(item.id, 1)}
                    aria-label={`Tambah jumlah ${item.nama}`}
                    className="flex h-7 w-7 items-center justify-center rounded text-base font-bold text-teks hover:bg-latar"
                  >
                    +
                  </button>
                </div>

                <div className="min-w-24 text-right font-bold text-harga">
                  {formatRupiah(item.harga * item.jumlah)}
                </div>

                <button
                  type="button"
                  onClick={() => hapusItem(item.id)}
                  className="text-sm font-medium text-bahaya hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-garis bg-permukaan p-6 sm:ml-auto sm:w-80">
        <div className="flex items-center justify-between text-base">
          <span className="text-teks-lembut">Total belanja:</span>
          <span className="text-xl font-extrabold text-harga">
            {formatRupiah(totalHarga)}
          </span>
        </div>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white transition-colors hover:bg-utama-gelap"
        >
          Pesan lewat WhatsApp
        </a>
      </div>
    </div>
  );
}

