"use client";

import { usePathname } from "next/navigation";
import { toko } from "@/lib/toko";

export default function TombolWhatsAppMelayang() {
  const pathname = usePathname();

  // Tidak tampil di halaman /admin
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const nomorWa = toko.nomorWhatsApp
    ? String(toko.nomorWhatsApp).replace(/[^0-9]/g, "")
    : "";
  const pesanAwal = "Halo, saya mau tanya soal durian.";
  const waUrl = `https://wa.me/${nomorWa}?text=${encodeURIComponent(pesanAwal)}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-4 right-4 z-40 flex h-12 w-12 min-h-[48px] min-w-[48px] items-center justify-center rounded-full bg-utama text-white shadow-lg transition-all duration-200 ease-in-out hover:scale-105 hover:bg-utama-gelap hover:shadow-xl active:scale-95 sm:h-12 sm:w-auto sm:px-4 sm:gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 shrink-0"
        aria-hidden="true"
      >
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.55 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.84a8.18 8.18 0 0 1-5.83 2.41c-1.49 0-2.95-.4-4.22-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.26-8.25zm4.8 11.66c-.26-.13-1.56-.77-1.8-.86-.24-.09-.42-.13-.6.13-.18.26-.69.86-.84 1.04-.16.18-.31.2-.57.07-.26-.13-1.1-.41-2.1-1.3-.78-.7-1.3-1.56-1.46-1.82-.15-.26-.02-.4.11-.53.12-.12.26-.31.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.6-1.44-.82-1.97-.22-.53-.44-.45-.6-.46-.16 0-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.97.95-.97 2.31s.99 2.68 1.13 2.86c.14.18 1.95 2.98 4.73 4.18.66.29 1.18.46 1.58.59.67.21 1.27.18 1.75.11.54-.08 1.56-.64 1.78-1.25.22-.61.22-1.14.16-1.25-.06-.11-.23-.18-.49-.31z" />
      </svg>
      <span className="hidden text-sm font-semibold tracking-wide sm:inline">
        Chat
      </span>
    </a>
  );
}

