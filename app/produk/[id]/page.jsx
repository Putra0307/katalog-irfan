import Link from "next/link";
import { notFound } from "next/navigation";
import TombolWhatsApp from "@/components/TombolWhatsApp";
import TombolKeranjang from "@/components/TombolKeranjang";
import { formatRupiah } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanDetailProduk({ params }) {
  const { id } = await params;
  let produk = null;

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (!error && data) {
      produk = data;
    }
  } catch {
    // Biarkan produk bernilai null sehingga memicu notFound()
  }

  if (!produk) {
    notFound();
  }

  return (
    <article className="grid gap-8 py-8 md:grid-cols-2 md:gap-12 md:py-12">
      {/* Gambar Produk */}
      <div className="overflow-hidden rounded-3xl border border-garis bg-permukaan shadow-xs">
        <img
          src={produk.foto_url}
          alt={produk.nama}
          className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-102"
        />
      </div>

      {/* Info & Aksi Produk */}
      <div className="flex flex-col gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-teks-lembut hover:text-utama"
        >
          <span>←</span>
          <span className="underline underline-offset-4">Kembali ke katalog</span>
        </Link>

        {produk.kategori && (
          <span className="self-start rounded-full border border-garis bg-permukaan px-3 py-1 text-xs font-semibold text-utama">
            {produk.kategori}
          </span>
        )}

        <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-teks sm:text-4xl">
          {produk.nama}
        </h1>

        <p className="self-start rounded-xl bg-harga-latar px-3.5 py-1.5 text-2xl font-extrabold text-harga shadow-2xs">
          {formatRupiah(produk.harga)}
        </p>

        <div className="border-t border-garis/60 pt-4">
          <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-teks-lembut">
            Deskripsi Produk
          </h2>
          <p className="max-w-prose leading-relaxed text-teks-lembut">
            {produk.deskripsi}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-3 sm:flex-row">
          <TombolWhatsApp produk={produk} />
          <TombolKeranjang produk={produk} />
        </div>
      </div>
    </article>
  );
}
