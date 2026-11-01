"use client";

import { useState } from "react";
import { tambahKeKeranjang } from "@/lib/keranjang";

export default function TombolKeranjang({ produk }) {
  const [ditambahkan, setDitambahkan] = useState(false);

  const handleTambah = () => {
    tambahKeKeranjang(produk, 1);
    setDitambahkan(true);
    setTimeout(() => {
      setDitambahkan(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      onClick={handleTambah}
      className="inline-flex w-full items-center justify-center rounded-lg border border-garis bg-latar px-5 py-3 font-semibold text-teks transition-colors hover:border-utama hover:text-utama sm:w-auto"
    >
      {ditambahkan ? "✓ Ditambahkan" : "Tambah ke keranjang"}
    </button>
  );
}

