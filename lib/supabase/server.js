import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Membuat koneksi Supabase di sisi server menggunakan kunci rahasia (SUPABASE_SECRET_KEY).
 * Kunci ini melewati RLS untuk membaca data publik (seperti katalog dan detail produk).
 */
export function createClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL dan SUPABASE_SECRET_KEY harus diisi di environment variable."
    );
  }

  return createSupabaseClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export const createServerClient = createClient;

// Instance proxy untuk kemudahan akses langsung jika dibutuhkan
export const supabase = new Proxy(
  {},
  {
    get(target, prop) {
      const client = createClient();
      const val = client[prop];
      return typeof val === "function" ? val.bind(client) : val;
    },
  }
);

export default createClient;

