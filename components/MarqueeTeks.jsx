export default function MarqueeTeks() {
  const teks = "Dipetik saat matang · Langsung dari kebun Tukka · Pesan lewat WhatsApp";

  return (
    <div
      aria-label="Informasi Toko"
      className="relative w-full overflow-hidden border-y border-garis bg-permukaan py-2.5 select-none"
    >
      <div className="animate-marquee flex items-center gap-8 text-xs font-semibold text-teks-lembut">
        <span>{teks}</span>
        <span aria-hidden="true">·</span>
        <span>{teks}</span>
        <span aria-hidden="true">·</span>
        <span>{teks}</span>
        <span aria-hidden="true">·</span>
        <span>{teks}</span>
      </div>
    </div>
  );
}

