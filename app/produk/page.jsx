import Link from "next/link";
import KartuProduk from "@/components/KartuProduk";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanProduk({ searchParams }) {
  const sp = await searchParams;
  const q = typeof sp?.q === "string" ? sp.q.trim() : "";
  const kategoriDipilih = typeof sp?.kategori === "string" ? sp.kategori.trim() : "";
  const currentPage = Math.max(1, parseInt(sp?.page || "1", 10) || 1);
  const perPage = 12;

  let daftarProduk = [];
  let totalData = 0;
  let daftarKategori = [];
  let pesanError = null;

  try {
    const supabase = createClient();

    // Ambil daftar kategori unik untuk tombol filter
    const { data: semuaKategori, error: errKategori } = await supabase
      .from("produk")
      .select("kategori");

    if (!errKategori && semuaKategori) {
      daftarKategori = Array.from(
        new Set(semuaKategori.map((p) => p.kategori).filter(Boolean))
      );
    }

    // Bangun query produk dengan filter & paginasi
    let query = supabase.from("produk").select("*", { count: "exact" });

    if (q) {
      query = query.ilike("nama", `%${q}%`);
    }

    if (kategoriDipilih && kategoriDipilih !== "semua") {
      query = query.eq("kategori", kategoriDipilih);
    }

    const from = (currentPage - 1) * perPage;
    const to = from + perPage - 1;

    const { data, count, error } = await query
      .order("id", { ascending: true })
      .range(from, to);

    if (error) {
      pesanError = error.message || "Gagal memuat produk dari database.";
    } else {
      daftarProduk = data || [];
      totalData = count ?? 0;
    }
  } catch (err) {
    pesanError = err?.message || "Terjadi kesalahan saat menghubungkan ke database.";
  }

  const totalHalaman = Math.max(1, Math.ceil(totalData / perPage));

  function buatUrl({ q: newQ = q, kategori: newKat = kategoriDipilih, page: newPage = 1 }) {
    const params = new URLSearchParams();
    if (newQ) params.set("q", newQ);
    if (newKat && newKat !== "semua") params.set("kategori", newKat);
    if (newPage > 1) params.set("page", String(newPage));
    const qs = params.toString();
    return qs ? `/produk?${qs}` : "/produk";
  }

  return (
    <div className="flex flex-col gap-8 py-8 sm:py-12">
      {/* Header Halaman */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-teks sm:text-4xl">
          Semua Produk
        </h1>
        <p className="text-sm text-teks-lembut">
          Pilihan durian segar dan aneka produk olahan khas terbaik siap dipesan.
        </p>
      </div>

      {/* Kontrol Pencarian & Filter */}
      <div className="flex flex-col gap-4">
        {/* Kotak Pencarian */}
        <form action="/produk" method="GET" className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[240px] flex-1">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Cari nama produk..."
              className="w-full rounded-xl border border-garis bg-latar py-2.5 pl-10 pr-4 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-teks-lembut"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {kategoriDipilih && kategoriDipilih !== "semua" && (
            <input type="hidden" name="kategori" value={kategoriDipilih} />
          )}
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-utama px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-utama-gelap"
          >
            Cari
          </button>
          {(q || (kategoriDipilih && kategoriDipilih !== "semua")) && (
            <Link
              href="/produk"
              className="inline-flex items-center justify-center rounded-xl border border-garis bg-permukaan px-3 py-2.5 text-sm font-semibold text-teks-lembut transition-colors hover:border-utama hover:text-utama"
            >
              Reset
            </Link>
          )}
        </form>

        {/* Filter Kategori */}
        {daftarKategori.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <Link
              href={buatUrl({ kategori: "semua", page: 1 })}
              className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                !kategoriDipilih || kategoriDipilih === "semua"
                  ? "bg-utama text-white shadow-xs"
                  : "border border-garis bg-permukaan text-teks hover:border-utama hover:text-utama"
              }`}
            >
              Semua
            </Link>
            {daftarKategori.map((kat) => (
              <Link
                key={kat}
                href={buatUrl({ kategori: kat, page: 1 })}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  kategoriDipilih === kat
                    ? "bg-utama text-white shadow-xs"
                    : "border border-garis bg-permukaan text-teks hover:border-utama hover:text-utama"
                }`}
              >
                {kat}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Ringkasan Filter & Jumlah Produk */}
      {!pesanError && totalData > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-garis/60 pb-3 text-xs text-teks-lembut">
          <span>
            Menampilkan{" "}
            <strong className="text-teks">
              {daftarProduk.length > 0 ? (currentPage - 1) * perPage + 1 : 0}-
              {Math.min(currentPage * perPage, totalData)}
            </strong>{" "}
            dari <strong className="text-teks">{totalData}</strong> produk
            {kategoriDipilih && kategoriDipilih !== "semua" && (
              <> di kategori <span className="text-utama font-semibold">"{kategoriDipilih}"</span></>
            )}
            {q && (
              <> untuk pencarian <span className="text-utama font-semibold">"{q}"</span></>
            )}
          </span>
          {totalHalaman > 1 && (
            <span>Halaman {currentPage} dari {totalHalaman}</span>
          )}
        </div>
      )}

      {/* Tampilan Konten Produk */}
      {pesanError ? (
        <div className="rounded-2xl border border-garis bg-permukaan p-5 text-bahaya shadow-2xs">
          <p className="font-semibold">Gagal memuat produk</p>
          <p className="mt-1 text-sm text-teks-lembut">{pesanError}</p>
        </div>
      ) : daftarProduk.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-garis bg-latar py-16 text-center">
          <p className="text-lg font-semibold text-teks">Belum ada produk</p>
          {(q || (kategoriDipilih && kategoriDipilih !== "semua")) && (
            <p className="mt-1 text-sm text-teks-lembut">
              Tidak ada produk yang cocok dengan pencarian atau filter yang dipilih.
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
          {daftarProduk.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      )}

      {/* Paginasi */}
      {totalHalaman > 1 && !pesanError && (
        <nav
          aria-label="Navigasi Halaman"
          className="flex flex-wrap items-center justify-center gap-2 pt-6"
        >
          {currentPage > 1 ? (
            <Link
              href={buatUrl({ page: currentPage - 1 })}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-garis bg-latar px-3 text-xs sm:text-sm font-semibold text-teks transition-colors hover:border-utama hover:text-utama"
            >
              ← Sebelumnya
            </Link>
          ) : (
            <span className="inline-flex h-9 items-center justify-center rounded-xl border border-garis/50 bg-permukaan/50 px-3 text-xs sm:text-sm font-semibold text-teks-lembut/50 cursor-not-allowed">
              ← Sebelumnya
            </span>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((nomor) => {
              const isCurrent = nomor === currentPage;
              return (
                <Link
                  key={nomor}
                  href={buatUrl({ page: nomor })}
                  className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isCurrent
                      ? "bg-utama text-white shadow-xs"
                      : "border border-garis bg-latar text-teks hover:border-utama hover:text-utama"
                  }`}
                >
                  {nomor}
                </Link>
              );
            })}
          </div>

          {currentPage < totalHalaman ? (
            <Link
              href={buatUrl({ page: currentPage + 1 })}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-garis bg-latar px-3 text-xs sm:text-sm font-semibold text-teks transition-colors hover:border-utama hover:text-utama"
            >
              Selanjutnya →
            </Link>
          ) : (
            <span className="inline-flex h-9 items-center justify-center rounded-xl border border-garis/50 bg-permukaan/50 px-3 text-xs sm:text-sm font-semibold text-teks-lembut/50 cursor-not-allowed">
              Selanjutnya →
            </span>
          )}
        </nav>
      )}
    </div>
  );
}

