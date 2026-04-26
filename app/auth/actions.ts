"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

function sanitizeNextPath(rawNext: FormDataEntryValue | null): string {
  const nextPath = typeof rawNext === "string" && rawNext.startsWith("/") ? rawNext : "/dashboard";

  if (nextPath.startsWith("//")) {
    return "/dashboard";
  }

  return nextPath;
}

function buildSignInRedirect(params: { next?: string; error?: string; success?: string }) {
  const search = new URLSearchParams();

  if (params.next) {
    search.set("next", params.next);
  }

  if (params.error) {
    search.set("error", params.error);
  }

  if (params.success) {
    search.set("success", params.success);
  }

  return `/auth?${search.toString()}`;
}

function buildSignUpRedirect(params: { next?: string; error?: string; success?: string }) {
  const search = new URLSearchParams();

  if (params.next) {
    search.set("next", params.next);
  }

  if (params.error) {
    search.set("error", params.error);
  }

  if (params.success) {
    search.set("success", params.success);
  }

  return `/auth/signup?${search.toString()}`;
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const nextPath = sanitizeNextPath(formData.get("next"));

  if (!email || !password) {
    redirect(
      buildSignInRedirect({
        next: nextPath,
        error: "Email and password are required.",
      }),
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(
      buildSignInRedirect({
        next: nextPath,
        error: error.message,
      }),
    );
  }

  redirect(nextPath);
}

export async function signUpAction(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const nextPath = sanitizeNextPath(formData.get("next"));

  if (!fullName || !email || !password) {
    redirect(
      buildSignUpRedirect({
        next: nextPath,
        error: "Full name, email, and password are required.",
      }),
    );
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) {
    redirect(
      buildSignUpRedirect({
        next: nextPath,
        error: error.message,
      }),
    );
  }

  if (data.user) {
    const { error: profileError } = await supabase.from("user_profiles").upsert({
      id: data.user.id,
      email,
      full_name: fullName,
      role: "issuer",
      approval_status: "pending",
    });

    if (profileError) {
      redirect(
        buildSignUpRedirect({
          next: nextPath,
          error: "Account created, but profile setup failed. Ensure user_profiles table exists in Supabase.",
        }),
      );
    }

    // Ensure new users can sign in immediately even if email confirmation is enabled.
    try {
      const adminClient = createAdminClient();
      await adminClient.auth.admin.updateUserById(data.user.id, {
        email_confirm: true,
      });
    } catch {
      // Fall through. If admin confirm fails, regular sign-in handling below will surface any issue.
    }
  }

  const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

  if (signInError) {
    redirect(
      buildSignUpRedirect({
        next: nextPath,
        error: signInError.message,
      }),
    );
  }

  redirect(`${nextPath}?success=${encodeURIComponent("Account created. Your KYC is pending review.")}`);
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(buildSignInRedirect({ success: "Signed out successfully." }));
}
