import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

interface AdminEmailRow {
  email: string;
}

export async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/admin");
  }

  const { data: profileEmailRow } = await supabase
    .from("user_profiles")
    .select("email")
    .eq("id", user.id)
    .maybeSingle<AdminEmailRow>();

  const effectiveEmail = user.email ?? profileEmailRow?.email ?? null;

  if (!isAdminEmail(effectiveEmail)) {
    redirect("/");
  }

  return {
    supabase,
    user,
    effectiveEmail,
  };
}
