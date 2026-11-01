import KartuProduk from "@/components/KartuProduk";
import { toko } from "@/lib/toko";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanKatalog() {
  let daftarProduk = [];
  let pesanError = null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      pesanError = error.message || "Gagal memuat daftar produk dari database.";
    } else {
      daftarProduk = data || [];
    }
  } catch (err) {
    pesanError = err?.message || "Terjadi kesalahan saat menghubungkan ke database.";
  }

  const nomorWa = toko.nomorWhatsApp
    ? String(toko.nomorWhatsApp).replace(/[^0-9]/g, "")
    : "";

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 sm:py-16">
        <div className="flex flex-col items-start gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-garis bg-permukaan px-3 py-1 text-xs font-semibold text-utama">
            <span className="h-2 w-2 rounded-full bg-utama"></span>
            <span>{toko.jamBuka}</span>
          </div>

          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-teks sm:text-5xl lg:text-6xl">
            {toko.nama}
          </h1>

          <p className="max-w-xl text-lg text-teks-lembut leading-relaxed">
            {toko.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#produk"
              className="inline-flex items-center justify-center rounded-xl bg-utama px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-utama-gelap hover:shadow-md"
            >
              Lihat Produk
            </a>
            {nomorWa && (
              <a
                href={`https://wa.me/${nomorWa}?text=${encodeURIComponent(
                  `Halo ${toko.nama}, saya ingin bertanya tentang produk.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-garis bg-latar px-5 py-3 text-sm font-semibold text-teks transition-colors hover:border-utama hover:text-utama"
              >
                Tanya Penjual
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Bagian Produk */}
      <section
        id="produk"
        aria-labelledby="judul-produk"
        className="scroll-mt-24 flex flex-col gap-6 pb-16"
      >
        <div className="flex flex-col gap-1 border-b border-garis/60 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="judul-produk" className="text-2xl font-bold tracking-tight text-teks sm:text-3xl">
              Produk kami
            </h2>
            <p className="text-sm text-teks-lembut">
              Pilihan durian dan olahan terbaik siap dipesan dan dinikmati.
            </p>
          </div>
          {daftarProduk.length > 0 && (
            <span className="text-xs font-medium text-teks-lembut">
              Menampilkan {daftarProduk.length} produk
            </span>
          )}
        </div>

        {pesanError ? (
          <div className="rounded-2xl border border-garis bg-permukaan p-5 text-bahaya shadow-2xs">
            <p className="font-semibold">Gagal memuat produk</p>
            <p className="mt-1 text-sm text-teks-lembut">{pesanError}</p>
          </div>
        ) : daftarProduk.length === 0 ? (
          <p className="py-8 text-center text-teks-lembut">Belum ada produk</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
