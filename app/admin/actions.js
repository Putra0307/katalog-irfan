"use server";

import { redirect } from "next/navigation";
import { createSessionClient } from "@/lib/supabase/session";

/**
 * Server Action untuk login admin menggunakan Supabase Auth (email dan password).
 */
export async function login(prevStateOrFormData, maybeFormData) {
  const formData = maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;
  const email = formData?.get ? formData.get("email")?.toString().trim() : "";
  const password = formData?.get ? formData.get("password")?.toString() : "";

  if (!email || !password) {
    redirect("/admin/login?error=" + encodeURIComponent("Email dan password wajib diisi."));
  }

  const supabase = await createSessionClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const pesan =
      error.message === "Invalid login credentials"
        ? "Email atau password salah."
        : error.message || "Gagal masuk. Silakan periksa kembali data Anda.";
    redirect("/admin/login?error=" + encodeURIComponent(pesan));
  }

  redirect("/admin");
}

/**
 * Server Action untuk mengakhiri sesi admin (logout) lalu kembali ke halaman login.
 */
export async function logout() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

