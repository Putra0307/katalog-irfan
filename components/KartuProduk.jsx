import Link from "next/link";
import { formatRupiah } from "@/lib/format";

export default function KartuProduk({ produk }) {
  return (
    <Link
      href={`/produk/${produk.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-garis bg-latar shadow-2xs transition-all duration-200 hover:-translate-y-1 hover:border-utama/40 hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-permukaan">
        <img
          src={produk.foto_url}
          alt={produk.nama}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
        />
        {produk.kategori && (
          <span className="absolute top-2.5 left-2.5 rounded-full border border-garis/60 bg-latar/90 px-2.5 py-0.5 text-[11px] font-semibold text-utama shadow-2xs backdrop-blur-xs">
            {produk.kategori}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
        <p className="text-xs text-teks-lembut sm:hidden">{produk.kategori}</p>
        <h3 className="font-semibold leading-snug text-teks transition-colors group-hover:text-utama line-clamp-2">
          {produk.nama}
        </h3>
        <p className="mt-auto self-start rounded-md bg-harga-latar px-2 py-0.5 text-sm font-bold text-harga">
          {formatRupiah(produk.harga)}
        </p>
      </div>
    </Link>
  );
}
