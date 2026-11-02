import Link from "next/link";
import { toko } from "@/lib/toko";

export default function HalamanBeranda() {
  const nomorWa = toko.nomorWhatsApp
    ? String(toko.nomorWhatsApp).replace(/[^0-9]/g, "")
    : "";

  return (
    <div className="flex flex-col gap-16 py-10 sm:py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-start gap-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-garis bg-permukaan px-3.5 py-1 text-xs font-semibold text-utama">
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
      </section>

      {/* Sejarah dan Cerita Kami */}
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

      {/* Tiga Keunggulan */}
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
          <div className="flex flex-col gap-2 rounded-2xl border border-garis bg-latar p-5 sm:p-6 shadow-2xs">
            <span className="text-2xl">🌳</span>
            <h3 className="text-lg font-bold text-teks">Matang Pohon Alami</h3>
            <p className="text-sm text-teks-lembut leading-relaxed">
              Buah durian dipanen saat jatuh matang alami dari pohonnya, sehingga
              menghasilkan rasa manis legit dan aroma harum yang khas.
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-garis bg-latar p-5 sm:p-6 shadow-2xs">
            <span className="text-2xl">✨</span>
            <h3 className="text-lg font-bold text-teks">Pilihan Kualitas Terbaik</h3>
            <p className="text-sm text-teks-lembut leading-relaxed">
              Setiap durian disortir dengan cermat untuk memastikan ketebalan
              daging buah, rasa yang konsisten, dan kondisi prima saat Anda terima.
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-2xl border border-garis bg-latar p-5 sm:p-6 shadow-2xs">
            <span className="text-2xl">🏡</span>
            <h3 className="text-lg font-bold text-teks">Langsung dari Kebun Tukka</h3>
            <p className="text-sm text-teks-lembut leading-relaxed">
              Berasal langsung dari kebun di Desa Sait Kalangan II, tanpa perantara
              panjang, menjaga kesegaran buah tetap maksimal.
            </p>
          </div>
        </div>
      </section>

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
