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

/**
 * Server Action untuk mengganti password admin yang sedang login.
 */
export async function gantiPassword(prevStateOrFormData, maybeFormData) {
  const formData = maybeFormData instanceof FormData ? maybeFormData : prevStateOrFormData;
  const passwordBaru = formData?.get ? formData.get("password_baru")?.toString() || "" : "";
  const konfirmasiPassword =
    formData?.get ? formData.get("konfirmasi_password")?.toString() || "" : "";

  const supabase = await createSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login?error=" + encodeURIComponent("Silakan masuk terlebih dahulu."));
  }

  if (!passwordBaru || !konfirmasiPassword) {
    redirect("/admin/password?error=" + encodeURIComponent("Semua kolom password wajib diisi."));
  }

  if (passwordBaru.length < 8) {
    redirect("/admin/password?error=" + encodeURIComponent("Password baru minimal 8 karakter."));
  }

  if (passwordBaru !== konfirmasiPassword) {
    redirect(
      "/admin/password?error=" +
        encodeURIComponent("Password baru dan konfirmasi password tidak sama.")
    );
  }

  const { error } = await supabase.auth.updateUser({ password: passwordBaru });

  if (error) {
    redirect(
      "/admin/password?error=" +
        encodeURIComponent(error.message || "Gagal mengganti password.")
    );
  }

  redirect("/admin/password?success=" + encodeURIComponent("Password berhasil diganti."));
}

