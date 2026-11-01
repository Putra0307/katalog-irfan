import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Membuat koneksi Supabase sesi admin menggunakan @supabase/ssr dan cookies.
 * Memakai SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY.
 * Digunakan untuk autentikasi (login, logout, ganti password) dan aksi admin terlindungi.
 */
export async function createSessionClient() {
  const cookieStore = await cookies();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_PUBLISHABLE_KEY harus diisi di environment variable."
    );
  }

  return createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // setAll bisa dipanggil dari Server Component saat render,
          // di mana cookies tidak bisa dimodifikasi.
        }
      },
    },
  });
}

export const createClient = createSessionClient;
export const createAdminSessionClient = createSessionClient;
export default createSessionClient;

