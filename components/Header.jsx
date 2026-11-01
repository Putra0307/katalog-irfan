"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { toko } from "@/lib/toko";
import { ambilKeranjang, hitungTotalBarang } from "@/lib/keranjang";

export default function Header() {
  const [totalBarang, setTotalBarang] = useState(0);

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

  return (
    <header className="border-b border-garis bg-latar">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-utama">
          {toko.nama}
        </Link>
        <Link
          href="/keranjang"
          className="flex items-center gap-2 rounded-lg border border-garis px-3 py-1.5 text-sm font-semibold text-teks transition-colors hover:border-utama hover:text-utama"
        >
          <span>Keranjang</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-utama px-1.5 text-xs font-bold text-white">
            {totalBarang}
          </span>
        </Link>
      </div>
    </header>
  );
}
