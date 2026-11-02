"use client";

import { useState, useEffect } from "react";

const DAFTAR_KATA = ["manis legit", "daging tebal", "aroma khas"];

export default function TaglineBerganti() {
  const [indeks, setIndeks] = useState(0);
  const [animasiKeluar, setAnimasiKeluar] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Hormati preferensi prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      return;
    }

    const interval = setInterval(() => {
      setAnimasiKeluar(true);

      setTimeout(() => {
        setIndeks((prev) => (prev + 1) % DAFTAR_KATA.length);
        setAnimasiKeluar(false);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  if (reducedMotion) {
    return (
      <span className="font-bold text-utama">
        {DAFTAR_KATA[0]}
      </span>
    );
  }

  return (
    <span
      className={`inline-block font-bold text-utama transition-all duration-300 ease-in-out ${
        animasiKeluar ? "opacity-0 -translate-y-1" : "opacity-100 translate-y-0"
      }`}
    >
      {DAFTAR_KATA[indeks]}
    </span>
  );
}

