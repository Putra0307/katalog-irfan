"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toko } from "@/lib/toko";
import { ambilKeranjang, hitungTotalBarang } from "@/lib/keranjang";

export default function Header() {
  const [totalBarang, setTotalBarang] = useState(0);
  const [menuTerbuka, setMenuTerbuka] = useState(false);

  useEffect(() => {
    const muatKeranjang = () => {
      const items = ambilKeranjang();
      setTotalBarang(hitungTotalBarang(items));
    };

    muatKeranjang();
    window.addEventListener("keranjang-updated", muatKeranjang);
    window.addEventListener("storage", muatKeranjang);

    return () => {
      window.removeEventListener("keranjang-updated", muatKeranjang);
      window.removeEventListener("storage", muatKeranjang);
    };
  }, []);

  const nomorWa = toko.nomorWhatsApp
    ? String(toko.nomorWhatsApp).replace(/[^0-9]/g, "")
    : "";
  const waKontakUrl = `https://wa.me/${nomorWa}?text=${encodeURIComponent(
    `Halo ${toko.nama}, saya ingin bertanya tentang produk Anda.`
  )}`;

  return (
    <header className="sticky top-0 z-50 border-b border-garis bg-latar/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:py-4">
        {/* Logo / Nama Toko */}
        <Link href="/" className="group flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-utama/10 text-lg transition-transform group-hover:scale-105">
            🍈
          </span>
          <span className="truncate text-base font-extrabold tracking-tight text-utama transition-colors group-hover:text-utama-gelap sm:text-xl">
            {toko.nama}
          </span>
        </Link>

        {/* Menu Navigasi Desktop */}
        <nav className="hidden items-center gap-6 text-sm font-semibold sm:flex">
          <Link
            href="/"
            className="text-teks transition-colors hover:text-utama"
          >
            Beranda
          </Link>
          <Link
            href="/#produk"
            className="text-teks transition-colors hover:text-utama"
          >
            Produk
          </Link>
          <a
            href={waKontakUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teks transition-colors hover:text-utama"
          >
            Kontak
          </a>
          <Link
            href="/keranjang"
            className="flex items-center gap-2 rounded-xl border border-garis bg-permukaan px-3 py-1.5 text-sm font-semibold text-teks transition-all hover:border-utama hover:text-utama"
          >
            <span>Keranjang</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-utama px-1.5 text-xs font-bold text-white">
              {totalBarang}
            </span>
          </Link>
        </nav>

        {/* Tombol Hamburger & Keranjang Cepat di Mobile */}
        <div className="flex shrink-0 items-center gap-2 sm:hidden">
          <Link
            href="/keranjang"
            aria-label={`Keranjang belanja, ${totalBarang} barang`}
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-garis bg-permukaan text-teks transition-colors hover:border-utama hover:text-utama"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {totalBarang > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-utama px-1 text-[10px] font-bold text-white shadow-2xs">
                {totalBarang}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMenuTerbuka(!menuTerbuka)}
            aria-label={menuTerbuka ? "Tutup menu" : "Buka menu"}
            aria-expanded={menuTerbuka}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-garis text-teks transition-colors hover:border-utama hover:text-utama"
          >
            {menuTerbuka ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu Navigasi Mobile (Dropdown) */}
      {menuTerbuka && (
        <div className="border-t border-garis bg-latar px-4 py-3 sm:hidden">
          <nav className="flex flex-col gap-2">
            <Link
              href="/"
              onClick={() => setMenuTerbuka(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-teks transition-colors hover:bg-permukaan hover:text-utama"
            >
              Beranda
            </Link>
            <Link
              href="/#produk"
              onClick={() => setMenuTerbuka(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-teks transition-colors hover:bg-permukaan hover:text-utama"
            >
              Produk
            </Link>
            <a
              href={waKontakUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuTerbuka(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-teks transition-colors hover:bg-permukaan hover:text-utama"
            >
              Kontak
            </a>
            <Link
              href="/keranjang"
              onClick={() => setMenuTerbuka(false)}
              className="flex items-center justify-between rounded-lg border border-garis bg-permukaan px-3 py-2 text-sm font-semibold text-teks hover:border-utama hover:text-utama"
            >
              <span>Keranjang Belanja</span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-utama px-1.5 text-xs font-bold text-white">
                {totalBarang}
              </span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
