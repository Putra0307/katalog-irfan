import Link from "next/link";
import KartuProduk from "@/components/KartuProduk";
import TaglineBerganti from "@/components/TaglineBerganti";
import MarqueeTeks from "@/components/MarqueeTeks";
import AnimasiMuncul from "@/components/AnimasiMuncul";
import { toko } from "@/lib/toko";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function HalamanBeranda() {
  const nomorWa = toko.nomorWhatsApp
    ? String(toko.nomorWhatsApp).replace(/[^0-9]/g, "")
    : "";

  let produkUnggulan = [];
  try {
    const supabase = createClient();
    const { data } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true })
      .limit(3);
    produkUnggulan = data || [];
  } catch {
    // Tetap berjalan jika database offline/kosong
    produkUnggulan = [];
  }

  return (
    <div className="flex flex-col gap-14 py-8 sm:py-14">
      {/* 1. Bagian Utama (Hero) */}
      <section className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* Kolom Teks */}
        <div className="flex flex-col items-start gap-5 lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-garis bg-permukaan px-3.5 py-1 text-xs font-semibold text-utama">
            <span className="h-2 w-2 rounded-full bg-utama"></span>
            <span>{toko.jamBuka}</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-teks sm:text-5xl lg:text-6xl">
            {toko.nama}
          </h1>

          <p className="max-w-xl text-lg text-teks-lembut leading-relaxed">
            Pilihan durian terbaik dengan <TaglineBerganti />, dipetik saat
            matang dan siap dipesan lewat WhatsApp.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/produk"
              className="inline-flex items-center justify-center rounded-xl bg-utama px-5 py-3 text-sm font-semibold text-white shadow-xs transition-all hover:bg-utama-gelap hover:shadow-md"
            >
              Lihat Produk
            </Link>
            {nomorWa && (
              <a
                href={`https://wa.me/${nomorWa}?text=${encodeURIComponent(
                  `Halo ${toko.nama}, saya ingin bertanya tentang produk Anda.`
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

        {/* Kolom Foto Durian Besar */}
        <div className="w-full lg:col-span-5">
          <div className="overflow-hidden rounded-3xl border border-garis bg-permukaan shadow-md transition-transform duration-300 hover:scale-[1.01] motion-reduce:hover:scale-100">
            <img
              src="/produk/montong.jpg"
              alt={`Durian segar pilihan ${toko.nama}`}
              className="aspect-4/3 sm:aspect-16/10 lg:aspect-square w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Teks Berjalan (Marquee) */}
      <MarqueeTeks />

      {/* 3. Sejarah dan Cerita Kami (Animasi Muncul) */}
      <AnimasiMuncul>
        <section className="flex flex-col gap-4 rounded-3xl border border-garis bg-permukaan p-6 sm:p-10 shadow-2xs">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-utama">
              Tentang Kami
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-teks sm:text-3xl">
              Sejarah dan cerita kami
            </h2>
          </div>

          <div className="max-w-prose space-y-4 text-teks-lembut leading-relaxed">
            <p>
              Usaha durian kami berawal dari kebun keluarga di Desa Sait Kalangan II,
              Kecamatan Tukka, Kabupaten Tapanuli Tengah. Kawasan perbukitan Tukka
              dianugerahi tanah yang subur dan iklim alami yang sangat cocok untuk
              pertumbuhan pohon durian berkualitas tinggi.
            </p>
            <p>
              Kami merawat pohon-pohon durian ini secara telaten dan hanya memanen
              buah yang benar-benar masak jatuh di pohon. Tradisi dan kecintaan pada
              kualitas ini kami jaga agar setiap penikmat durian dapat merasakan
              keaslian rasa manis, legit, dan aroma khas buah durian langsung dari
              tanah Tukka.
            </p>
          </div>
        </section>
      </AnimasiMuncul>

      {/* 3. Tiga Keunggulan Singkat (Animasi Muncul & Hover Terangkat) */}
      <AnimasiMuncul delay={100}>
        <section className="flex flex-col gap-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-teks sm:text-3xl">
              Keunggulan kami
            </h2>
            <p className="text-sm text-teks-lembut">
              Komitmen kami untuk memberikan durian dan olahan terbaik bagi Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {/* Keunggulan 1 */}
            <div className="group flex flex-col gap-3 rounded-2xl border border-garis bg-latar p-5 sm:p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1.5 hover:border-utama/40 hover:shadow-md motion-reduce:hover:translate-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-utama/10 text-utama transition-colors group-hover:bg-utama group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21v-8m0 0a5 5 0 01-5-5c0-3.5 3-6 5-6s5 2.5 5 6a5 5 0 01-5 5zm-3 8h6"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-teks transition-colors group-hover:text-utama">
                Matang Pohon Alami
              </h3>
              <p className="text-sm text-teks-lembut leading-relaxed">
                Buah durian dipanen saat jatuh matang alami dari pohonnya, sehingga
                menghasilkan rasa manis legit dan aroma harum yang khas.
              </p>
            </div>

            {/* Keunggulan 2 */}
            <div className="group flex flex-col gap-3 rounded-2xl border border-garis bg-latar p-5 sm:p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1.5 hover:border-utama/40 hover:shadow-md motion-reduce:hover:translate-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-utama/10 text-utama transition-colors group-hover:bg-utama group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-teks transition-colors group-hover:text-utama">
                Pilihan Kualitas Terbaik
              </h3>
              <p className="text-sm text-teks-lembut leading-relaxed">
                Setiap durian disortir dengan cermat untuk memastikan ketebalan
                daging buah, rasa yang konsisten, dan kondisi prima saat Anda terima.
              </p>
            </div>

            {/* Keunggulan 3 */}
            <div className="group flex flex-col gap-3 rounded-2xl border border-garis bg-latar p-5 sm:p-6 shadow-2xs transition-all duration-200 hover:-translate-y-1.5 hover:border-utama/40 hover:shadow-md motion-reduce:hover:translate-y-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-utama/10 text-utama transition-colors group-hover:bg-utama group-hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-teks transition-colors group-hover:text-utama">
                Langsung dari Kebun Tukka
              </h3>
              <p className="text-sm text-teks-lembut leading-relaxed">
                Berasal langsung dari kebun di Desa Sait Kalangan II, tanpa perantara
                panjang, menjaga kesegaran buah tetap maksimal.
              </p>
            </div>
          </div>
        </section>
      </AnimasiMuncul>

      {/* 4. Cuplikan 3 Produk */}
      {produkUnggulan.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between border-b border-garis/60 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-utama">
                Pilihan Spesial
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-teks sm:text-3xl">
                Produk Pilihan
              </h2>
            </div>
            <Link
              href="/produk"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-utama hover:text-utama-gelap"
            >
              <span>Lihat semua produk</span>
              <span className="transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
                →
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
            {produkUnggulan.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Link
              href="/produk"
              className="inline-flex items-center justify-center rounded-xl border border-garis bg-latar px-6 py-3 text-sm font-semibold text-teks transition-colors hover:border-utama hover:text-utama"
            >
              Lihat semua produk →
            </Link>
          </div>
        </section>
      )}

      {/* Alamat dan Jam Buka */}
      <section className="flex flex-col gap-6 rounded-3xl border border-garis bg-latar p-6 sm:p-10 shadow-2xs">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight text-teks sm:text-3xl">
            Alamat dan jam buka
          </h2>
          <p className="text-sm text-teks-lembut">
            Kunjungi kebun dan kedai kami atau hubungi kami secara langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-1 rounded-2xl border border-garis/60 bg-permukaan p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-utama">
              Lokasi Toko & Kebun
            </span>
            <p className="mt-1 font-bold text-teks">{toko.nama}</p>
            <p className="text-sm text-teks-lembut">{toko.alamat}</p>
          </div>

          <div className="flex flex-col gap-1 rounded-2xl border border-garis/60 bg-permukaan p-5">
            <span className="text-xs font-bold uppercase tracking-wider text-utama">
              Waktu Operasional
            </span>
            <p className="mt-1 font-bold text-teks">Jam Buka</p>
            <p className="text-sm text-teks-lembut">{toko.jamBuka}</p>
            <p className="mt-2 text-xs text-teks-lembut">
              Pemesanan online via WhatsApp tetap kami layani sepanjang hari.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
